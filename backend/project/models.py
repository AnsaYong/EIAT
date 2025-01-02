from django.db import models
from django.utils import timezone
import uuid
from constants import PROJECT_ROLE_CHOICES


class Project(models.Model):
    """
    Represents a project, managed by a project admin and associated with a company.
    """

    project_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    project_admin = models.ForeignKey(
        "user_management.User",
        on_delete=models.SET_NULL,
        null=True,
        related_name="project_administrations",
        help_text="The project admin responsible for managing this project.",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    company = models.ForeignKey(
        "user_management.Company", on_delete=models.CASCADE, related_name="projects"
    )
    created_by = models.ForeignKey(
        "user_management.User",
        on_delete=models.SET_NULL,
        null=True,
        related_name="created_projects",
    )

    def project_updated(self):
        """
        Updates the project's updated_at field.
        """
        self.updated_at = timezone.now()
        self.save()

    def __str__(self):
        return f"{self.name} ({self.company.name})"


class ProjectUserRoleRequest(models.Model):
    """
    Tracks user requests to join a project with a specified role.
    """

    user = models.ForeignKey(
        "user_management.User",
        on_delete=models.CASCADE,
        related_name="project_roles",
        help_text="The user requesting to join the project.",
    )
    project = models.ForeignKey(
        "project.Project",
        on_delete=models.CASCADE,
        related_name="role_requests",
        help_text="The project the user wants to join.",
    )
    project_role = models.CharField(
        max_length=50,
        choices=PROJECT_ROLE_CHOICES,
        help_text="The role the user is requesting.",
    )
    requested_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "project", "project_role")

    def __str__(self):
        return f"{self.user} requests (self.project_role) in {self.project}"


class ProjectUserRole(models.Model):
    """
    Tracks approved roles for users in projects.
    """

    user = models.ForeignKey(
        "user_management.User",
        on_delete=models.CASCADE,
        related_name="approved_roles",
        help_text="The user assigned to this role.",
    )
    project = models.ForeignKey(
        "project.Project",
        on_delete=models.CASCADE,
        related_name="approved_roles",
        help_text="The project associated with this role.",
    )
    role = models.CharField(
        max_length=50,
        choices=PROJECT_ROLE_CHOICES,
        help_text="The role assigned to the user.",
    )
    approved_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "project")

    def __str__(self):
        return f"{self.user} - {self.role} in {self.project} (Approved)"
