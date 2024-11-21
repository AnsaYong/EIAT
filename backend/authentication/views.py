"""This module exposes the authentication models via a RESTful API,
using DRF’s `ViewSet` and `Router`."""

from rest_framework import viewsets, permissions
from rest_framework.pagination import PageNumberPagination

from .models import CustomUser
from .serializers import CustomUserSerializer


class CustomPagination(PageNumberPagination):
    """Custom pagination class for handling large datasets."""

    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 100


class CustomUserViewSet(viewsets.ModelViewSet):
    """ViewSet for CustomUser model. Uses `permission` to restrict
    access based on user roles"""

    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    pagination_class = CustomPagination
    permission_classes = [permissions.IsAuthenticated]
