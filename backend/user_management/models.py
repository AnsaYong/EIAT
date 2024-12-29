"""
Contains all model definitions (User, SyncQueue, RoleChangeRequest).
"""

from django.contrib.auth.models import AbstractUser
from django.db import models
import uuid
from django.utils import timezone


class Company(models.Model):
    """
    Represents a company. Users must belong to a company to participate in projects.
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
        get_full_name: Returns the full name of the user.
        get_organization_display: Returns the organization affiliation of the user.
        get_role_display: Returns the role of the user.
        has_permission: Checks if the user has a specific action permission.
        approve_role: Approves the role of the user.
        sync_data: Syncs the data of the user.
    """

    ORGANIZATION_CHOICES = [
        ("gov", "Government"),
        ("ngo", "Non-Governmental Organization"),
        ("consult", "Consulting Firm"),
        ("public", "Public Stakeholder"),
        ("independent", "Independent Expert"),
    ]

    PROJECT_ROLE_CHOICES = [
        ("pending", "Pending"),
        ("project_admin", "Admin"),
        ("project_developer", "Project Developer"),
        ("consultant", "Consultant"),
        ("regulator", "Regulator"),
        ("public_stakeholder", "Public Stakeholder"),
        ("independent_expert", "Independent Expert"),
    ]

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
    designation = models.CharField(max_length=100, blank=True, null=True)
    project_role = models.CharField(
        max_length=50, choices=PROJECT_ROLE_CHOICES, null=False, default="pending"
    )
    is_offline = models.BooleanField(default=False)
    last_synced_at = models.DateTimeField(null=True, blank=True)
    role_approved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        role_status = "Approved" if self.role_approved else "Pending Approval"
        return f"{self.get_full_name()} ({self.get_role_display()} - {role_status})"

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
        indexes = [
            models.Index(fields=["email"]),
            models.Index(fields=["created_at"]),
            models.Index(fields=["user_id"]),
            models.Index(fields=["project_role"]),
        ]

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"

    def get_organization_display(self):
        return dict(self.ORGANIZATION_CHOICES).get(
            self.organization_affiliation, "Unknown"
        )

    def get_role_display(self):
        return dict(self.PROJECT_ROLE_CHOICES).get(self.project_role, "Unknown")

    def has_permission(self, action: str, permission_type: str = "view") -> bool:
        from .utils import get_permissions_for_role

        """
        Checks if the user has a specific action permission, with an optional permission type.
        :param action: The action the user is trying to perform.
        :param permission_type: The type of permission (e.g., 'view', 'edit', 'delete').
        :return: True if the user has the permission; otherwise, False.
        """
        if not self.role_approved:
            return False

        role_permissions = get_permissions_for_role(self.project_role)
        return action in role_permissions.get(permission_type, [])

    def approve_role(self):
        self.role_approved = True
        self.save()

    def sync_data(self):
        if self.is_offline:
            self.last_synced_at = timezone.now()
            self.is_offline = False
            self.save()


class SyncQueue(models.Model):
    """
    The SyncQueue model represents the queue of sync requests made by users.
    """

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    action_type = models.CharField(max_length=50)
    data_type = models.CharField(max_length=50)
    data = models.JSONField()
    status = models.CharField(max_length=20, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.get_full_name()} - {self.action_type} - {self.data_type}"


class RoleChangeRequest(models.Model):
    """
    Tracks the role change requests made by users, as well as their status.
    """

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    requested_role = models.CharField(max_length=50, choices=User.PROJECT_ROLE_CHOICES)
    current_role = models.CharField(max_length=50, choices=User.PROJECT_ROLE_CHOICES)
    status = models.CharField(
        max_length=20,
        choices=[
            ("pending", "Pending"),
            ("approved", "Approved"),
            ("rejected", "Rejected"),
        ],
        default="pending",
    )
    requested_at = models.DateTimeField(auto_now_add=True)
    approved_at = models.DateTimeField(null=True, blank=True)
    rejected_at = models.DateTimeField(null=True, blank=True)
    comments = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Role Change Request for {self.user.get_full_name()} - {self.status}"
