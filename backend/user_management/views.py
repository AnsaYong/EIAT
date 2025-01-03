import logging
from django.utils import timezone
from django.contrib.auth import authenticate, login, logout
from rest_framework import permissions, viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from .models import Company, User, RoleChangeRequest
from project.models import ProjectUserRole
from .serializers import (
    CompanySerializer,
    UserSerializer,
    RegisterSerializer,
    RoleChangeRequestSerializer,
)
from permissions import IsAdmin, user_has_permission


# Set up audit logging
auditor = logging.getLogger("audit")
auditor.setLevel(logging.INFO)
handler = logging.FileHandler("audit.log")
formatter = logging.Formatter("%(asctime)s - %(message)s")
if not any(isinstance(h, logging.FileHandler) for h in auditor.handlers):
    handler.setFormatter(formatter)
    auditor.addHandler(handler)


def log_action(user, action, target):
    """
    Utility function for consistent audit logging.
    """
    user_email = getattr(user, "email", "Unknown")
    auditor.info(f"User {user_email} {action} {target}.")


def error_response(message, status_code):
    """
    Utility function for consistent error responses.
    """
    return Response({"detail": message}, status=status_code)


@api_view(["POST"])
@permission_classes([AllowAny])
def login_user(request):
    """
    Handle user login. Returns token on success.
    Also overrrides the default permission for all views specified by the TokenAuthentication class in settings.py.
    """
    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response(
            {"detail": "Username and password are required."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
        token, created = Token.objects.get_or_create(user=user)
        return Response({"token": token.key}, status=status.HTTP_200_OK)

    return Response(
        {"detail": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED
    )


@api_view(["POST"])
def logout_user(request):
    """
    Handle user logout. Logs out the user and invalidates the session token.
    """
    if not request.user.is_authenticated:
        return Response(
            {"detail": "User is not logged in."}, status=status.HTTP_400_BAD_REQUEST
        )

    logout(request)
    return Response({"detail": "Logged out successfully."}, status=status.HTTP_200_OK)


class CompanyViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for managing companies with audit trails.
    """

    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]

    def create(self, request, *args, **kwargs):
        """
        Add audit logging for company creation.
        """
        response = super().create(request, *args, **kwargs)
        log_action(request.user, "created", f"company {response.data.get('name')}")
        return response

    def update(self, request, *args, **kwargs):
        """
        Add audit logging for company updates.
        """
        company = self.get_object()
        response = super().update(request, *args, **kwargs)
        log_action(request.user, "updated", f"company {company.name}")
        return response

    def partial_update(self, request, *args, **kwargs):
        """
        Add audit logging for partial updates.
        """
        company = self.get_object()
        response = super().partial_update(request, *args, **kwargs)
        log_action(request.user, "partially updated", f"company {company.name}")
        return response

    def destroy(self, request, *args, **kwargs):
        """
        Add audit logging for company deletions.
        """
        company = self.get_object()
        if not company.can_be_deleted():
            return error_response(
                "Company cannot be deleted.", status.HTTP_400_BAD_REQUEST
            )

        response = super().destroy(request, *args, **kwargs)
        log_action(request.user, "deleted", f"company {company.name}")
        return response


class UserViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for viewing and editing user instances.
    Combines listing, creating, retrieving, updating, and deleting into one class.
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        """
        Customize permissions based on actions - dynamically adjusts permissions
        based on the action.
        """
        action_permissions = {
            "list": [permissions.IsAuthenticated, IsAdmin],
            "create": [permissions.IsAuthenticated, IsAdmin],
            "update": [permissions.IsAuthenticated, IsAdmin],
            "partial_update": [permissions.IsAuthenticated, IsAdmin],
            "destroy": [permissions.IsAuthenticated, IsAdmin],
        }
        self.permission_classes = action_permissions.get(
            self.action, self.permission_classes
        )
        return super().get_permissions()

    def update(self, request, *args, **kwargs):
        """
        Restrict updates to admins only or allow users to update their own data.
        """
        user = self.get_object()
        if request.user != user and not request.user.is_superuser:
            return error_response(
                "You are not authorized to update this user.", status.HTTP_403_FORBIDDEN
            )

        response = super().update(request, *args, **kwargs)
        log_action(request.user, "updated", f"user {user.email}")
        return response

    def partial_update(self, request, *args, **kwargs):
        """
        Restrict partial updates to admins only or allow users to update their own data.
        """
        user = self.get_object()
        if request.user != user and not request.user.is_superuser:
            return error_response(
                "You are not authorized to update this user.", status.HTTP_403_FORBIDDEN
            )

        response = super().partial_update(request, *args, **kwargs)
        log_action(request.user, "partially updated", f"user {user.email}")
        return response

    def destroy(self, request, *args, **kwargs):
        """
        Restrict deletions to admins only.
        """
        user = self.get_object()
        if not request.user.is_superuser:
            return error_response(
                "You are not authorized to delete this user.", status.HTTP_403_FORBIDDEN
            )

        response = super().destroy(request, *args, **kwargs)
        log_action(request.user, "deleted", f"user {user.email}")
        return response

    @action(
        detail=False, methods=["get"], permission_classes=[permissions.IsAuthenticated]
    )
    def me(self, request):
        """
        Endpoint to retrieve the authenticated user's own details.
        """
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        """
        Add audit logging for user creation.
        """
        response = super().create(request, *args, **kwargs)
        log_action(request.user, "created", f"user {response.data.get('email')}")
        return response


class RegisterViewSet(viewsets.ViewSet):
    """
    A ViewSet for handling user registration.
    Handles user registration with custom logic in the create method.
    """

    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        """
        Handles user registration.
        """
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        log_action(user, "registered", "new account")
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class RoleChangeRequestViewSet(viewsets.ModelViewSet):
    """
    Handles viewing, creating, and managing RoleChangeRequests.
    """

    queryset = RoleChangeRequest.objects.all()
    serializer_class = RoleChangeRequestSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]

    def get_queryset(self):
        """
        Limits the queryset to requests made by the logged-in user or manageable by admin.
        """
        user = self.request.user

        # If the user is an admin, they can see all requests
        if IsAdmin().has_permission(self.request, self):
            return RoleChangeRequest.objects.all()

        # Otherwise, return requests made by the user
        return RoleChangeRequest.objects.filter(user=user)

    def perform_create(self, serializer):
        """
        Saves the role change request for the logged-in user.
        """
        serializer.save(user=self.request.user)

    @action(detail=True, methods=["post"], permission_classes=[IsAdmin])
    def approve(self, request, pk=None):
        """
        Approve a role change request and updates the user's role.
        """
        role_change_request = self.get_object()
        if role_change_request.status != "pending":
            return error_response(
                "Only pending requests can be approved.",
                status.HTTP_400_BAD_REQUEST,
            )

        # Update ProjectUserRole
        ProjectUserRole.objects.updated_or_create(
            user=role_change_request.user,
            project=role_change_request.project,
            defaults={"role": role_change_request.requested_role},
        )

        role_change_request.status = "approved"
        role_change_request.approved_at = timezone.now()
        role_change_request.save()

        log_action(
            request.user, "approved", f"role change request {role_change_request.user}"
        )
        return Response(
            {"detail": "Role change request approved."}, status=status.HTTP_200_OK
        )

    @action(detail=True, methods=["post"], permission_classes=[IsAdmin])
    def reject(self, request, pk=None):
        """
        Reject a role change request.
        """
        role_change_request = self.get_object()
        if role_change_request.status != "pending":
            return error_response(
                "Only pending requests can be rejected.",
                status.HTTP_400_BAD_REQUEST,
            )

        role_change_request.status = "rejected"
        role_change_request.rejected_at = timezone.now()
        role_change_request.save()

        log_action(
            request.user, "rejected", f"role change request {role_change_request.user}"
        )
        return Response(
            {"detail": "Role change request rejected."}, status=status.HTTP_200_OK
        )
