"""This module contains the serializers for the core app.
Serializers are used to convert complex data types, such as querysets
and model instances, into native Python data types that can then be easily
rendered into JSON, XML, or other content types."""

from rest_framework import serializers

from .models import Project, UserRole, Country, Company
from authentication.models import CustomUser
from screening.serializers import ScreeningSerializer, ScreeningFieldSerializer
from screening.models import Screening


class CountrySerializer(serializers.ModelSerializer):
    """Serializer for the Country model."""

    class Meta:
        model = Country
        fields = ["id", "name", "regulations"]


class CompanySerializer(serializers.ModelSerializer):
    """Serializer for the Company model."""

    class Meta:
        model = Company
        fields = ["id", "name", "address"]


class UserRoleSerializer(serializers.ModelSerializer):
    """Serializer for the UserRole model."""

    user = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())
    project = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all())

    class Meta:
        model = UserRole
        fields = ["id", "user", "project", "role"]


class ProjectSerializer(serializers.ModelSerializer):
    """Serializer for the Project model."""

    # These fields are now writable, allowing them to be set through the API.
    manager = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all())
    country = serializers.PrimaryKeyRelatedField(queryset=Country.objects.all())

    class Meta:
        """Meta class for the ProjectSerializer."""

        model = Project
        fields = "__all__"
