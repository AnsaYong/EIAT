from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from core.models import Company
from .models import CustomUser


# Register the Company and CustomUser models with the Django admin interface.
@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ("name", "address")


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ("username", "email", "company", "phone_number", "is_staff")
    list_filter = ("is_staff", "is_superuser", "is_active", "company")
    fieldsets = (
        (None, {"fields": ("username", "email", "password")}),
        (
            "Personal info",
            {"fields": ("first_name", "last_name", "phone_number", "company")},
        ),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("username", "email", "password1", "password2", "company"),
            },
        ),
    )
    search_fields = ("username", "email")
    ordering = ("username",)
