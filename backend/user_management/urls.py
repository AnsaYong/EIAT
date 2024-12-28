from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet,
    RegisterViewSet,
    SyncQueueViewSet,
    RoleChangeRequestViewSet,
)

router = DefaultRouter()
router.register(r"users", UserViewSet, basename="user")
router.register(r"register", RegisterViewSet, basename="register")
router.register(r"sync-queue", SyncQueueViewSet, basename="sync-queue")
router.register(
    r"role-change-requests", RoleChangeRequestViewSet, basename="role-change-request"
)

urlpatterns = [
    path("", include(router.urls)),
]
