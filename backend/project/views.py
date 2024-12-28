from rest_framework import viewsets, permissions
from .models import Project, ProjectUserRole
from .serializers import ProjectSerializer, ProjectUserRoleSerializer
from user_management.permissions import RoleBasedPermission


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated, RoleBasedPermission]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class ProjectUserRoleViewSet(viewsets.ModelViewSet):
    queryset = ProjectUserRole.objects.all()
    serializer_class = ProjectUserRoleSerializer
    permission_classes = [permissions.IsAuthenticated, RoleBasedPermission]
