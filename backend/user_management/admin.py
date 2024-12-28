"""Registers models for the Django admin interface."""

from django.contrib import admin
from .models import User, SyncQueue, RoleChangeRequest


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = (
        "get_full_name",
        "email",
        "role",
        "role_approved",
        "created_at",
        "last_updated",
    )
    search_fields = ("email", "first_name", "last_name")
    list_filter = ("role", "role_approved")


@admin.register(SyncQueue)
class SyncQueueAdmin(admin.ModelAdmin):
    list_display = ("user", "action_type", "status", "created_at")
    list_filter = ("status",)


@admin.register(RoleChangeRequest)
class RoleChangeRequestAdmin(admin.ModelAdmin):
    list_display = ("user", "requested_role", "status", "requested_at", "approved_at")
    list_filter = ("status", "requested_role")
