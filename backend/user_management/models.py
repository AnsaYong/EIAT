"""
Provides all model definitions related to user managament.
"""

from django.contrib.auth.models import AbstractUser
from django.db import models
import uuid
from django.utils import timezone
from permissions import user_has_permission
from utils import get_current_role
from constants import PROJECT_ROLE_CHOICES, ORGANIZATION_CHOICES


class Company(models.Model):
    """
    Represents a company. Users must belong to a company to participate
    in projects - mainly for collaboration between different roles.
    """

    name = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Company"
        verbose_name_plural = "Companies"
        ordering = ["name"]

    def __str__(self):
        return self.name


class User(AbstractUser):
    """
    The User model represents all users in the system.

    Methods:
        - get_full_name: Returns the full name of the user.
        - get_organization_display: Returns the display value of the organization affiliation.
        - has_permission: Checks if the user has a specific action permission.
        - approve_role: Approves the user's role in a project (triggered externally).
        - sync_data: Syncs the user's data with the server.
        - notify: Sends a notification to the user.
    """

    user_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30, null=False)
    last_name = models.CharField(max_length=30, null=False)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    organization_affiliation = models.CharField(
        max_length=50, choices=ORGANIZATION_CHOICES, blank=True, null=True
    )
    company = models.ForeignKey(
        Company,
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="employees",
    )
    is_offline = models.BooleanField(default=False)
    last_synced_at = models.DateTimeField(null=True, blank=True)
    role_approved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        role_status = "Approved" if self.role_approved else "Pending Approval"
        return f"{self.get_full_name()} (Project Role Status - {role_status})"

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
        indexes = [
            models.Index(fields=["email"]),
            models.Index(fields=["created_at"]),
            models.Index(fields=["user_id"]),
        ]

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"

    def get_organization_display(self):
        return dict(ORGANIZATION_CHOICES).get(self.organization_affiliation, "Unknown")

    def has_permission(
        self, action: str, permission_type: str = "view", project=None
    ) -> bool:
        """
        Checks if the user has a specific permission using the centralized logic.
        """
        return user_has_permission(self, action, permission_type, project)

    def approve_role(self):
        """
        Updates the user's role status to approved when called during role approval.
        """
        self.role_approved = True
        self.save()

    def sync_data(self):
        """
        Syncs the user's data with the server.
        """
        if self.is_offline:
            self.last_synced_at = timezone.now()
            self.is_offline = False
            self.save()

    def notify(self, message):
        """
        Send a notification to the user.
        """
        # Example implementation for email notification
        # send_email(self.email, "Project Notification", message)
        pass


class RoleChangeRequest(models.Model):
    """
    Tracks the role change requests made by users, as well as their status.
    """

    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="role_change_requests"
    )
    project = models.ForeignKey(
        "project.Project",
        on_delete=models.CASCADE,
        related_name="role_change_requests_project",
    )
    requested_role = models.CharField(max_length=50, choices=PROJECT_ROLE_CHOICES)
    current_role = models.CharField(
        max_length=50, choices=PROJECT_ROLE_CHOICES, blank=False, null=False
    )
    status = models.CharField(
        max_length=20,
        default="pending",
    )
    requested_at = models.DateTimeField(auto_now_add=True)
    approved_at = models.DateTimeField(null=True, blank=True)
    rejected_at = models.DateTimeField(null=True, blank=True)
    comments = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Role Change Request for {self.user.get_full_name()} in {self.project.name} - {self.status}"

    def save(self, *args, **kwargs):
        """
        Validates current role before saving.
        """
        if not self.pk:  # Only validate for new records
            current_role = get_current_role(self.user, self.project)
            if current_role == self.requested_role:
                raise ValueError("Requested role is already assigned.")
            self.current_role = current_role or "unknown"
        super().save(*args, **kwargs)
