"""
This module contains utility functions for user management.
"""

from typing import Dict, List


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
