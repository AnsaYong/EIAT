from rest_framework import permissions, viewsets, status
from rest_framework.response import Response
from .models import Company, User, SyncQueue, RoleChangeRequest
from .serializers import (
    CompanySerializer,
    UserSerializer,
    RegisterSerializer,
    SyncQueueSerializer,
    RoleChangeRequestSerializer,
)
from .permissions import IsAdmin, IsProjectDeveloper, IsConsultant, IsRegulator


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin]


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
        if self.action == "list":
            self.permission_classes = [permissions.IsAuthenticated, IsAdmin]
        elif self.action in ["create", "update", "partial_update", "destroy"]:
            self.permission_classes = [permissions.IsAuthenticated]
        return super().get_permissions()


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
        if self.action == "list":
            self.permission_classes = [permissions.IsAuthenticated, IsAdmin]
        elif self.action in ["create", "update", "partial_update", "destroy"]:
            self.permission_classes = [permissions.IsAuthenticated]
        return super().get_permissions()


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
        if self.action == "list":
            self.permission_classes = [permissions.IsAuthenticated, IsAdmin]
        elif self.action in ["create", "update", "partial_update", "destroy"]:
            self.permission_classes = [permissions.IsAuthenticated]
        return super().get_permissions()
