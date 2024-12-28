from rest_framework import serializers
from .models import Project, ProjectUserRole
from user_management.models import User


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            "id",
            "name",
            "description",
            "company",
            "created_by",
            "created_at",
            "updated_at",
        ]

    def validate_company(self, value):
        """
        Ensure the project creator belongs to the company.
        """
        user = self.context["request"].user
        if not user.company or user.company != value:
            raise serializers.ValidationError("You must belong to this company.")
        return value


class ProjectUserRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectUserRole
        fields = ["id", "project", "user", "role"]
