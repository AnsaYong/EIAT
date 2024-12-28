from django.db import models
from django.utils import timezone
import uuid
from user_management.models import User, Company


class Project(models.Model):
    """
    Represents a project, managed by a project admin and associated with a company.
    """

    project_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    company = models.ForeignKey(
        Company, on_delete=models.CASCADE, related_name="projects"
    )
    created_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name="created_projects"
    )

    def assign_project_admin(self, user):
        """
        Assigns a user as the project admin.
        """
        if not user.company == self.company:
            raise ValueError("User must belong to the same company as the project.")
        user.project_role = "project_admin"
        user.save()

    def __str__(self):
        return f"{self.name} ({self.company.name})"


class ProjectUserRole(models.Model):
    """
    Maps users to their roles within a specific project.
    """

    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    role = models.CharField(
        max_length=50, choices=User.PROJECT_ROLE_CHOICES, default="pending"
    )

    class Meta:
        unique_together = ("project", "user")

    def __str__(self):
        return f"{self.user.get_full_name()} - {self.role} in {self.project.name}"
