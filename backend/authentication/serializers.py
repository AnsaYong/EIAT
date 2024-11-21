"""This module contains the serializers for the authentication app.
Serializers are used to convert complex data types, such as querysets
and model instances, into native Python data types that can then be easily
rendered into JSON, XML, or other content types."""

from rest_framework import serializers

from .models import CustomUser
from core.serializers import CompanySerializer


class CustomUserSerializer(serializers.ModelSerializer):
    """Serializer for the CustomUser model."""

    company = CompanySerializer(read_only=True)  # To show company details.

    class Meta:
        model = CustomUser
        fields = ["id", "username", "email", "phone_number", "company"]
