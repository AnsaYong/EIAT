from rest_framework import permissions
from utils import get_current_role, get_permissions_for_role
import logging

logger = logging.getLogger(__name__)


def user_has_permission(user, action, permission_type="view", project=None):
    """
    A reusable function to check if a user has a specific permission for an action.
    This logic is used in both the User model and permission classes.

    :param user: The user object
    :param action: The action the user is trying to perform
    :param permission_type: The type of permission (e.g., 'view', 'edit', 'delete')
    :param project: The project for which the permission is being checked
    :return: True if the user has permission; otherwise, False
    """
    # Restrict "pending" role
    if not user.role_approved:
        logger.warning(f"User {user} attempted action {action} with unapproved role.")
        return False  # User's role must be approved.

    if not project:
        logger.error(f"Project context missing for user {user} and action {action}")
        return False  # Project context is required

    try:
        user_role = get_current_role(user, project)
        if not user_role:
            return False

        role_permissions = get_permissions_for_role(user_role)
        return action in role_permissions.get(permission_type, [])
    except Exception as e:
        logger.error(f"Error checking permission for user {user}: {e}")
        return False


class RoleBasedPermission(permissions.BasePermission):
    """
    A custom permission to check if the user has permission for the action type.
    """

    def has_permission(self, request, view):
        user = request.user
        project = getattr(
            view, "project", None
        )  # Get project from the view if available
        action_type = view.action  # The action type (e.g., 'list', 'create', etc.)
        permission_type = request.method.lower()  # 'get', 'post', etc.

        # Use the reusable function for permission checking
        return user_has_permission(user, action_type, permission_type, project)


# Specific role-based permissions
class IsAdmin(RoleBasedPermission):
    def has_permission(self, request, view):
        # Allow superusers to bypass the role-based permission
        if request.user.is_superuser:
            return True
        return super().has_permission(request, view)


class IsRoleRequester(permissions.BasePermission):
    """
    Custom permission to grant access to the user who created the role request.
    """

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user


class IsProjectDeveloper(RoleBasedPermission):
    def has_permission(self, request, view):
        user_role = get_current_role(request.user, getattr(view, "project", None))
        return user_role == "project_developer" and super().has_permission(
            request, view
        )


class IsConsultant(RoleBasedPermission):
    def has_permission(self, request, view):
        user_role = get_current_role(request.user, getattr(view, "project", None))
        return user_role == "consultant" and super().has_permission(request, view)


class IsRegulator(RoleBasedPermission):
    def has_permission(self, request, view):
        user_role = get_current_role(request.user, getattr(view, "project", None))
        return user_role == "regulator" and super().has_permission(request, view)
