"""
This module contains utility functions for user management.
"""

from typing import Dict, List
from django.core.cache import cache
from project.models import ProjectUserRole


def get_current_role(user, project):
    """
    Utility to fetch the current role of a user in a specific project with caching.

    :param user: User object
    :param project: Project object
    :return: The user's role in the project or None if no role exists
    """
    cache_key = f"user_{user.user_id}_project_{project.project_id}_role"
    role = cache.get(cache_key)

    if not role:
        try:
            user_project_role = ProjectUserRole.objects.get(user=user, project=project)
            role = user_project_role.project_role
            cache.set(cache_key, role, timeout=3600)  # Cache for 1 hour
        except ProjectUserRole.DoesNotExist:
            role = None
    return role


def get_permissions_for_role(role: str) -> Dict[str, List[str]]:
    """
    Retrieves the permissions for a given role.
    :param role: The role for which permissions are needed.
    :return: A dictionary of permissions for the specified role.
    """
    role_permissions = {
        "project_admin": {
            "view": ["manage_users", "manage_projects", "view_all"],
            "edit": ["edit_all"],
            "delete": ["delete_all"],
        },
        "project_developer": {
            "view": ["manage_projects"],
            "edit": ["edit_project_data"],
        },
        "consultant": {
            "view": ["view_projects"],
            "edit": ["analyze_data"],
        },
        "regulator": {
            "view": ["review_compliance"],
            "edit": ["approve_projects"],
        },
        "public_stakeholder": {
            "view": ["view_public_info"],
            "edit": ["submit_feedback"],
        },
        "independent_expert": {
            "view": ["view_projects"],
            "edit": ["perform_reviews"],
        },
    }
    return role_permissions.get(role, {})
