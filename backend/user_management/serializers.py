from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "user_id",
            "email",
            "username",
            "first_name",
            "last_name",
            "phone_number",
            "organization_affiliation",
            "organization_name",
            "designation",
            "is_active",
        ]
        extra_kwargs = {
            "email": {"required": True},
            "first_name": {"required": True},
            "last_name": {"required": True},
            "password_hash": {"write_only": True},
        }


class RegisterSerializer(serializers.ModelSerializer):
    password_hash = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            "email",
            "username",
            "first_name",
            "last_name",
            "phone_number",
            "organization_affiliation",
            "organization_name",
            "designation",
            "password_hash",
        ]
        extra_kwargs = {
            "email": {"required": True},
            "first_name": {"required": True},
            "last_name": {"required": True},
            "password_hash": {"write_only": True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data["email"],
            username=validated_data["username"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            phone_number=validated_data.get("phone_number", ""),
            organization_affiliation=validated_data.get("organization_affiliation", ""),
            organization_name=validated_data.get("organization_name", ""),
            designation=validated_data.get("designation", ""),
            password=validated_data["password_hash"],
        )
        return user
