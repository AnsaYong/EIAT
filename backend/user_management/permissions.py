from rest_framework import permissions
from .utils import get_permissions_for_role


class RoleBasedPermission(permissions.BasePermission):
    """
    A custom permission to check if the user has permission for the action type.
    """

    def has_permission(self, request, view):
        user = request.user
        if not user.role_approved:
            return False  # User's role must be approved.

        # Get the user's permissions for the specified role
        role_permissions = get_permissions_for_role(user.role)
        action_type = view.action  # The action type (e.g., 'list', 'create', etc.)
        permission_type = request.method.lower()  # 'get', 'post', etc.

        # Check if the action exists in the role's permissions for this action type
        return action_type in role_permissions.get(permission_type, [])


# Specific role-based permissions


class IsAdmin(RoleBasedPermission):
    def has_permission(self, request, view):
        return request.user.role == "admin" and super().has_permission(request, view)


class IsProjectDeveloper(RoleBasedPermission):
    def has_permission(self, request, view):
        return request.user.role == "project_developer" and super().has_permission(
            request, view
        )


class IsConsultant(RoleBasedPermission):
    def has_permission(self, request, view):
        return request.user.role == "consultant" and super().has_permission(
            request, view
        )


class IsRegulator(RoleBasedPermission):
    def has_permission(self, request, view):
        return request.user.role == "regulator" and super().has_permission(
            request, view
        )
