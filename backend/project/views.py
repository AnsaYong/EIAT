from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Project, ProjectUserRole
from .serializers import ProjectSerializer, ProjectUserRoleSerializer
from user_management.permissions import RoleBasedPermission
import logging

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
    permission_classes = [permissions.IsAuthenticated, RoleBasedPermission]

    def get_queryset(self):
        """
        Restrict the queryset to projects the user is associated with.
        """
        user = self.request.user
        if user.is_superuser:
            return Project.objects.all()
        # Filter projects by user association
        return Project.objects.filter(projectuserrole__user=user)

    def perform_create(self, serializer):
        """
        Save the project with the creator and log the action.
        """
        project = serializer.save(created_by=self.request.user)
        auditor.info(f"User {self.request.user.email} created project {project.name}.")

    def destroy(self, request, *args, **kwargs):
        """
        Add audit logging for project deletions.
        """
        project = self.get_object()
        response = super().destroy(request, *args, **kwargs)
        auditor.info(f"User {request.user.email} deleted project {project.name}.")
        return response

    @action(detail=True, methods=["get"])
    def users(self, request, pk=None):
        """
        Custom action to list users associated with a project.
        """
        project = self.get_object()
        roles = ProjectUserRole.objects.filter(project=project)
        serializer = ProjectUserRoleSerializer(roles, many=True)
        return Response(serializer.data)


class ProjectUserRoleViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing project user roles.
    """

    serializer_class = ProjectUserRoleSerializer
    permission_classes = [permissions.IsAuthenticated, RoleBasedPermission]

    def get_queryset(self):
        """
        Restrict the queryset to roles related to the user's projects.
        """
        user = self.request.user
        if user.is_superuser:
            return ProjectUserRole.objects.all()
        # Filter roles by user's associated projects
        return ProjectUserRole.objects.filter(project__projectuserrole__user=user)

    def perform_create(self, serializer):
        """
        Add audit logging for role creation.
        """
        role = serializer.save()
        auditor.info(
            f"User {self.request.user.email} assigned role {role.role} "
            f"to user {role.user.email} in project {role.project.name}."
        )

    def destroy(self, request, *args, **kwargs):
        """
        Add audit logging for role deletions.
        """
        role = self.get_object()
        response = super().destroy(request, *args, **kwargs)
        auditor.info(
            f"User {self.request.user.email} removed role {role.role} "
            f"from user {role.user.email} in project {role.project.name}."
        )
        return response


# TODO:
# Test the views thoroughly to ensure the filtering, permissions, and audit logging work as expected.
# Consider adding pagination and rate limiting for better scalability and security.
