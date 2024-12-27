from django.contrib.auth.models import AbstractUser
from django.db import models
import uuid


class User(AbstractUser):
    ORGANIZATION_CHOICES = [
        ("gov", "Government"),
        ("ngo", "Non-Governmental Organization"),
        ("consult", "Consulting Firm"),
        ("public", "Public Stakeholder"),
    ]
    user_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30, null=False)
    last_name = models.CharField(max_length=30, null=False)
    password_hash = models.CharField(max_length=128, null=False)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    organization_affiliation = models.CharField(
        max_length=50, choices=ORGANIZATION_CHOICES, blank=True
    )
    organization_name = models.CharField(max_length=100, blank=True)
    designation = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return (
            self.organization_affiliation
            + " - "
            + self.first_name
            + " "
            + self.last_name
        )

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
        indexes = [models.Index(fields=["email"])]
