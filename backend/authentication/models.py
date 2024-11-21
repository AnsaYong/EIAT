"""This model manages user authentication, roles, and permissions.
Implements role-based access controls (RBAC) for different user types."""

from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models


class CustomUserManager(BaseUserManager):
    """Custom manager for CustomUser.
    This helps to manage user creation and other operations."""

    def create_user(self, username, email, password=None, **extra_fields):
        """Create and return a regular user"""
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        """Create and return a superuser"""
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        return self.create_user(username, email, password, **extra_fields)


class CustomUser(AbstractUser):
    """Custom user model with additional fields

    Attributes:
        company: the company associated with the user
        phone_number: the user's phone number
    """

    company = models.ForeignKey(
        "core.Company", on_delete=models.SET_NULL, null=True, blank=True
    )
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    # Other user-related fields

    objects = CustomUserManager()

    class Meta:
        ordering = ["username"]
