from django.db import models
from rest_framework import status, viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Project, ProjectUserRole, ProjectUserRoleRequest
from .serializers import (
    ProjectSerializer,
    ProjectUserRoleSerializer,
    ProjectUserRoleRequestSerializer,
)
import logging
from permissions import IsAdmin

# Set up audit logging
auditor = logging.getLogger("audit")
auditor.setLevel(logging.INFO)
handler = logging.FileHandler("audit.log")
formatter = logging.Formatter("%(asctime)s - %(message)s")
handler.setFormatter(formatter)
auditor.addHandler(handler)


class ProjectViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing projects.
    """

    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Restrict the queryset to projects in which the user is project admin.
        """
        user = self.request.user
        if user.is_superuser:
            return Project.objects.all()
        return Project.objects.filter(
            models.Q(project_admin=user) | models.Q(created_by=user)
        )

    def perform_create(self, serializer):
        """
        Save the project with the creator and log the action.
        """
        project = serializer.save()
        auditor.info(f"User {self.request.user.email} created project {project.name}.")

    def destroy(self, request, *args, **kwargs):
        """
        Deletes a project and adds audit logging for project deletions.
        """
        project = self.get_object()
        response = super().destroy(request, *args, **kwargs)
        auditor.info(f"User {request.user.email} deleted project {project.name}.")
        return response


class ProjectUserRoleRequestViewSet(viewsets.ModelViewSet):
    """
    Handles user requests to join projects with specific roles.
    """

    serializer_class = ProjectUserRoleRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Only show requests made by the logged-in user.
        """
        return ProjectUserRoleRequest.objects.filter(user=self.request.user)


class ProjectUserRoleApprovalViewSet(viewsets.ModelViewSet):
    """
    Handles admin approval of project role requests.
    """

    serializer_class = ProjectUserRoleRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Return role requests for projects managed by the current user.
        """
        return ProjectUserRoleRequest.objects.filter(
            project__project_admin=self.request.user
        )

    def list(self, request):
        """
        List pending role requests for projects managed by the current admin.
        """
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["post"])
    def approve(self, request, pk=None):
        """
        Approve a role request and create a ProjectUserRole record.
        """
        try:
            role_request = ProjectUserRoleRequest.objects.get(
                id=pk, project__project_admin=request.user
            )
        except ProjectUserRoleRequest.DoesNotExist:
            return Response(
                {"detail": "Role request not found or not authorized."},
                status=status.HTTP_404_NOT_FOUND,
            )

        ProjectUserRole.objects.create(
            user=role_request.user,
            project=role_request.project,
            role=role_request.project_role,
        )
        role_request.delete()
        return Response(
            {"detail": "Role approved successfully."}, status=status.HTTP_200_OK
        )

    @action(detail=True, methods=["post"])
    def reject(self, request, pk=None):
        """
        Reject a role request by deleting it.
        """
        try:
            role_request = ProjectUserRoleRequest.objects.get(
                id=pk, project__project_admin=request.user
            )
        except ProjectUserRoleRequest.DoesNotExist:
            return Response(
                {"detail": "Role request not found or not authorized."},
                status=status.HTTP_404_NOT_FOUND,
            )

        role_request.delete()
        return Response({"detail": "Role request rejected."}, status=status.HTTP_200_OK)
