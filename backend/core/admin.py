from django.contrib import admin

from .models import Project, Country, UserRole


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("name", "location", "company", "manager", "start_date", "end_date")
    list_filter = ("country", "company", "manager")
    search_fields = ("name", "location")


@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ("name", "regulations")


@admin.register(UserRole)
class UserRoleAdmin(admin.ModelAdmin):
    list_display = ("user", "project", "role")
    list_filter = ("role", "project")
    search_fields = ("user__username", "project__name")
