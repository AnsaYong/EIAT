from rest_framework import serializers
from .models import Project, ProjectUserRoleRequest, ProjectUserRole
from user_management.models import Company


class ProjectSerializer(serializers.ModelSerializer):
    """
    Provides serialized fields required for project creation and management.
    """

    company_name = serializers.CharField(
        write_only=True,
        required=False,
        help_text="The name of the company to associate with the project.",
    )

    class Meta:
        model = Project
        fields = [
            "project_id",
            "name",
            "description",
            "company",
            "company_name",
            "created_by",
            "project_admin",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "company",
            "created_by",
            "project_admin",
            "created_at",
            "updated_at",
        ]

    def validate(self, data):
        """
        Ensure that either a company or company name is provided.
        """
        if not data.get("company") and not data.get("company_name"):
            raise serializers.ValidationError(
                "A company or company name must be provided."
            )
        return data

    def create(self, validated_data):
        """
        Handles project creation, including the creation of a company
        is a name is provided, as well as automatically setting the
        current user as the project creator and project admin.
        """
        user = self.context["request"].user

        # If a company name is provided, create a new company
        company_name = validated_data.pop("company_name", None)
        if company_name:
            company, created = Company.objects.get_or_create(name=company_name)
            validated_data["company"] = company

        if "company" not in validated_data or validated_data["company"] is None:
            raise serializers.ValidationError(
                "You must provide an existing company or a new company name."
            )

        # Set the project creator and project admin to the current user
        validated_data["created_by"] = user
        validated_data["project_admin"] = user

        return super().create(validated_data)


class ProjectUserRoleRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectUserRoleRequest
        fields = ["id", "user", "project", "project_role", "requested_at"]
        read_only_fields = ["user", "requested_at"]

    def create(self, validated_data):
        """
        Automatically set the user to the authenticated user.
        """
        validated_data["user"] = self.context["request"].user

        # Ensure the user is not already assigned the role in the project
        if ProjectUserRole.objects.filter(
            user=validated_data["user"],
            project=validated_data["project"],
            role=validated_data["project_role"],
        ).exists():
            raise serializers.ValidationError(
                "You are already assigned a role in this project."
            )

        return super().create(validated_data)


class ProjectUserRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectUserRole
        fields = [
            "id",
            "project",
            "user",
            "role",
            "approved_at",
        ]
        read_only_fields = ["approved_at"]
