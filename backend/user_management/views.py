import logging
from rest_framework import permissions, viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Company, User, SyncQueue, RoleChangeRequest
from .serializers import (
    CompanySerializer,
    UserSerializer,
    RegisterSerializer,
    SyncQueueSerializer,
    RoleChangeRequestSerializer,
)
from .permissions import IsAdmin, IsProjectDeveloper, IsConsultant, IsRegulator


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
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class SyncQueueViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for viewing and editing SyncQueue instances.
    """

    queryset = SyncQueue.objects.all()
    serializer_class = SyncQueueSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        """
        Customize permissions based on actions - dynamically adjusts permissions
        based on the action.
        """
        action_permissions = {
            "list": [permissions.IsAuthenticated, IsAdmin],
            "create": [permissions.IsAuthenticated],
            "update": [permissions.IsAuthenticated],
            "partial_update": [permissions.IsAuthenticated],
            "destroy": [permissions.IsAuthenticated, IsAdmin],
        }
        self.permission_classes = action_permissions.get(
            self.action, self.permission_classes
        )
        return super().get_permissions()

    def create(self, request, *args, **kwargs):
        """
        Add audit logging for sync queue creation.
        """
        response = super().create(request, *args, **kwargs)
        log_action(request.user, "created", "sync queue item")
        return response


class RoleChangeRequestViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for viewing and editing RoleChangeRequest instances.
    """

    queryset = RoleChangeRequest.objects.all()
    serializer_class = RoleChangeRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        """
        Customize permissions based on actions - dynamically adjusts permissions
        based on the action.
        """
        action_permissions = {
            "list": [permissions.IsAuthenticated, IsAdmin],
            "create": [permissions.IsAuthenticated],
            "update": [permissions.IsAuthenticated, IsAdmin],
            "partial_update": [permissions.IsAuthenticated, IsAdmin],
            "destroy": [permissions.IsAuthenticated, IsAdmin],
        }
        self.permission_classes = action_permissions.get(
            self.action, self.permission_classes
        )
        return super().get_permissions()
