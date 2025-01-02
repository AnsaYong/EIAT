"""Registers models for the Django admin interface."""

from django.contrib import admin
from .models import Company, User, RoleChangeRequest


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ("name", "created_at", "last_updated")
    search_fields = ("name",)


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = (
        "username",
        "get_full_name",
        "email",
        "role_approved",
        "created_at",
        "last_updated",
    )
    search_fields = ("email", "first_name", "last_name")
    # list_filter = ("role_approved")


@admin.register(RoleChangeRequest)
class RoleChangeRequestAdmin(admin.ModelAdmin):
    list_display = ("user", "requested_role", "status", "requested_at", "approved_at")
    list_filter = ("status", "requested_role")
