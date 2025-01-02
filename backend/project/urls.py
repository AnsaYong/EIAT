from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProjectViewSet,
    ProjectUserRoleApprovalViewSet,
    ProjectUserRoleRequestViewSet,
)

router = DefaultRouter()
router.register(r"projects", ProjectViewSet, basename="project")
router.register(
    r"project-role-requests",
    ProjectUserRoleRequestViewSet,
    basename="project-role-request",
)
router.register(
    r"project-role_approval", ProjectUserRoleApprovalViewSet, basename="project-role"
)

urlpatterns = [
    path("", include(router.urls)),
]
