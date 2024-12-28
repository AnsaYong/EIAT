from rest_framework import permissions


class IsProjectAdmin(permissions.BasePermission):
    """
    Custom permission for project admin.
    """

    def has_permission(self, request, view):
        return request.user.project_role == "project_admin"
