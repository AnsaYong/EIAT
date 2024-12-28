from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, ProjectUserRoleViewSet

router = DefaultRouter()
router.register(r"projects", ProjectViewSet)
router.register(r"project-roles", ProjectUserRoleViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
