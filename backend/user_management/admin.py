from django.contrib import admin
from .models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = [
        "user_id",
        "email",
        "username",
        "first_name",
        "last_name",
        "phone_number",
        "organization_affiliation",
        "organization_name",
        "designation",
        "is_active",
    ]
    search_fields = ["email", "username", "first_name", "last_name"]
