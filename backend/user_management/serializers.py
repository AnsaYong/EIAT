from rest_framework import serializers
from .models import Company, User, RoleChangeRequest, SyncQueue


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
            "project_role",
            "organization_affiliation",
            "company",
            "designation",
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
        if value not in dict(User.PROJECT_ROLE_CHOICES):
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
            "designation",
            "project_role",
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

        if not data.get("project_role"):
            data["project_role"] = (
                "public_stakeholder"  # Default role if none is provided
            )

        # Check if the role is valid
        if data["project_role"] not in dict(User.PROJECT_ROLE_CHOICES):
            raise serializers.ValidationError("Invalid role selected.")

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

        # Create a role change request (if role needs approval or changes)
        if (
            user.project_role != "public_stakeholder"
        ):  # Example logic: role change requests for non-public users
            RoleChangeRequest.objects.create(
                user=user,
                requested_role=user.project_role,
                current_role="public_stakeholder",
            )

        return user


class RoleChangeRequestSerializer(serializers.ModelSerializer):
    """
    Serializes the RoleChangeRequest model.
    Includes all fields in the RoleChangeRequest model.

    Methods:
        - validate_requested_role: Ensures the requested role is valid.
    """

    class Meta:
        model = RoleChangeRequest
        fields = [
            "user",
            "requested_role",
            "current_role",
            "status",
            "requested_at",
            "approved_at",
            "rejected_at",
            "comments",
        ]

    def validate_requested_role(self, value):
        """
        Ensures the requested role is valid.
        """
        if value not in dict(User.PROJECT_ROLE_CHOICES):
            raise serializers.ValidationError("Invalid requested role.")
        return value


class SyncQueueSerializer(serializers.ModelSerializer):
    """
    Serializes the SyncQueue model.
    Includes all fields in the SyncQueue model.

    Methods:
        - validate_action_type: Ensures the action type is valid.
        - validate_data: Ensures data is in the correct format.
    """

    class Meta:
        model = SyncQueue
        fields = ["user", "action_type", "data_type", "data", "status", "created_at"]

    def validate_action_type(self, value):
        """
        Ensures the action type is valid.
        """
        valid_actions = ["create", "update", "delete"]  # Example action types
        if value not in valid_actions:
            raise serializers.ValidationError("Invalid action type.")
        return value

    def validate_data(self, value):
        """
        Ensure data is in the correct format (optional validation).
        """
        if not isinstance(value, dict):
            raise serializers.ValidationError("Data must be a dictionary.")
        return value
