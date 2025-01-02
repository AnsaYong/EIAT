from rest_framework import serializers
from .models import Project, ProjectUserRoleRequest, ProjectUserRole


class ProjectSerializer(serializers.ModelSerializer):
    """
    Provides serialized fields required for project creation and management.
    """

    class Meta:
        model = Project
        fields = [
            "project_id",
            "name",
            "description",
            "company",
            "created_by",
            "project_admin",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["created_by", "project_admin", "created_at", "updated_at"]

    def create(self, validated_data):
        """
        Automatically set the current user as the project creator and admin.
        """
        user = self.context["request"].user
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
