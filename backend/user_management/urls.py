from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    login_user,
    logout_user,
    CompanyViewSet,
    UserViewSet,
    RegisterViewSet,
    RoleChangeRequestViewSet,
)

router = DefaultRouter()
router.register(r"companies", CompanyViewSet, basename="company")
router.register(r"users", UserViewSet, basename="user")
router.register(r"register", RegisterViewSet, basename="register")
router.register(
    r"role-change-requests", RoleChangeRequestViewSet, basename="role-change-request"
)

urlpatterns = [
    path("", include(router.urls)),
    path("login/", login_user, name="login"),
    path("logout/", logout_user, name="logout"),
]
