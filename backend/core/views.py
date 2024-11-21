from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from .models import Project, UserRole, Country, Company
from .serializers import (
    ProjectSerializer,
    UserRoleSerializer,
    CountrySerializer,
    CompanySerializer,
)


class CustomPagination(PageNumberPagination):
    """Custom pagination class"""

    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 100


class ProjectViewSet(viewsets.ModelViewSet):
    """ViewSet for Project model. Exposes project data to the API.

    ModelViewSet authomatically handles the following methods:
    - GET core/projects/
        - list: Handles retrieving all projects (GET request to the list view).
        - retrieve: Handles retrieving a single project by its ID (GET request to the detail view).
    - POST core/projects
        - create: Handles creating a new project (POST request).
    - PUT core/projects/:id
        - update: Handles updating a project by its ID (PUT request).
    - DELETE core/projects/:id
        - destroy: Handles deleting a project by its ID (DELETE request).
    """

    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    pagination_class = CustomPagination

    """
    def get_queryset(self):
        # Filter the queryset based on user access or project name.
        user = self.request.user
        return Project.objects.filter(manager=user)

    def retrieve(self, request, pk=None):
        project = self.get_object()
        serializer = self.get_serializer(project)
        return Response(serializer.data)
    """

    def update(self, request, *args, **kwargs):
        """Override the update method to allow partial updates"""
        partial = kwargs.pop("partial", False)
        return super().update(request, *args, partial=partial, **kwargs)


class UserRoleViewSet(viewsets.ModelViewSet):
    """ViewSet for UserRole model"""

    queryset = UserRole.objects.all()
    serializer_class = UserRoleSerializer
    pagination_class = CustomPagination


class CountryViewSet(viewsets.ModelViewSet):
    """ViewSet for Country model"""

    queryset = Country.objects.all()
    serializer_class = CountrySerializer
    pagination_class = CustomPagination


class CompanyViewSet(viewsets.ModelViewSet):
    """ViewSet for Company model. Uses `permission` to restrict
    access based on user roles"""

    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    pagination_class = CustomPagination
