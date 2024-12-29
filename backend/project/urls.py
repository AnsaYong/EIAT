from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, ProjectUserRoleViewSet

router = DefaultRouter()
router.register(r"projects", ProjectViewSet, basename="project")
router.register(r"project-roles", ProjectUserRoleViewSet, basename="project-role")

urlpatterns = [
    path("", include(router.urls)),
]
