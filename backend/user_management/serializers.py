from rest_framework import serializers
from .models import Company, User, RoleChangeRequest
from constants import PROJECT_ROLE_CHOICES


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ["id", "name", "created_at", "last_updated"]


class UserSerializer(serializers.ModelSerializer):
    """
    Serializes the User model.
    Includes all fields in the User model, except for the password field.

    Methods:
        - validate_role: Ensures the role is valid and corresponds to a defined role.
    """

    class Meta:
        model = User
        fields = [
            "user_id",
            "email",
            "first_name",
            "last_name",
            "organization_affiliation",
            "company",
            "is_offline",
            "last_synced_at",
            "role_approved",
            "created_at",
            "last_updated",
        ]

    def validate_role(self, value):
        """
        Ensures the role is valid and corresponds to a defined role.
        """
        if value not in dict(PROJECT_ROLE_CHOICES):
            raise serializers.ValidationError("Invalid role.")
        return value


class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializes the registration form for new users.
    Includes all required fields for user registration.

    Methods:
        - validate: Ensures passwords match and validates the role.
        - create: Creates a new user, hashes the password, and sets other fields.
    """

    password = serializers.CharField(write_only=True, required=True)
    password_confirmation = serializers.CharField(write_only=True, required=True)

    class Meta:
        """Specify the model and fields to include in the serializer."""

        model = User
        fields = [
            "email",
            "first_name",
            "last_name",
            "phone_number",
            "organization_affiliation",
            "company",
            "password",
            "password_confirmation",
        ]
        extra_kwargs = {
            "email": {"required": True},
            "first_name": {"required": True},
            "last_name": {"required": True},
        }

    def validate(self, data):
        """
        Ensures passwords match and validates the role.
        """
        if data["password"] != data["password_confirmation"]:
            raise serializers.ValidationError("Passwords do not match.")

        return data

    def create(self, validated_data):
        """
        Create a new user, hash the password, and set other fields.
        """
        password = validated_data.pop("password")
        password_confirmation = validated_data.pop(
            "password_confirmation", None
        )  # Not used, as it's validated

        # Create user instance
        user = User(**validated_data)
        user.set_password(password)  # Hash password before saving
        user.save()

        return user


class RoleChangeRequestSerializer(serializers.ModelSerializer):
    """
    Serializes RoleChangeRequest model with auto-populated fields.
    """

    def get_project_queryset():
        from project.models import Project

        return Project.objects.all()

    project = serializers.PrimaryKeyRelatedField(queryset=get_project_queryset())
    requested_role = serializers.ChoiceField(choices=PROJECT_ROLE_CHOICES)

    class Meta:
        model = RoleChangeRequest
        fields = [
            "user",
            "project",
            "requested_role",
            "current_role",
            "comments",
        ]
        read_only_fields = ["user", "current_role"]

    def validate_requested_role(self, project):
        """
        Ensure the user is associated with the selected project.
        """
        user = self.context["request"].user
        if not user.is_associated_with_project(project):
            raise serializers.ValidationError("You are not part of this project.")
        return project

    def create(self, validated_data):
        """
        Populates the user field and validates the current role.
        """
        user = self.context["request"].user
        validated_data["user"] = user

        # Dynamically populate the current role
        validated_data["current_role"] = user.get_current_role(
            validated_data["project"]
        )
        return super().create(validated_data)
