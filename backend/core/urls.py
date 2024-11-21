from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import ProjectViewSet, UserRoleViewSet, CountryViewSet, CompanyViewSet

router = DefaultRouter()
router.register(r"projects", ProjectViewSet, basename="project")
router.register(r"user-roles", UserRoleViewSet, basename="user-role")
router.register(r"countries", CountryViewSet, basename="country")
router.register(r"companies", CompanyViewSet, basename="company")

urlpatterns = [
    path("", include(router.urls)),
]
