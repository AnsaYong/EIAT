"""
Handles user-related authentication tasks,
like approving roles, requesting role changes, and syncing data.
"""

from .models import User, RoleChangeRequest, SyncQueue
from django.core.exceptions import PermissionDenied


def approve_role(user: User):
    """
    Admin function to approve a user's role.
    :param user: User whose role is to be approved.
    """
    if not user.is_staff:  # Ensure only admins can approve roles
        raise PermissionDenied("Only admins can approve roles.")
    user.approve_role()
    # Optionally, create a log or notify the user


def request_role_change(user: User, new_role: str):
    """
    Function for users to request a role change.
    :param user: User requesting a role change.
    :param new_role: The new role the user is requesting.
    """
    request = RoleChangeRequest.objects.create(
        user=user, requested_role=new_role, current_role=user.role
    )
    return request


def queue_sync(user: User, action_type: str, data_type: str, data: dict):
    """
    Adds a sync task for offline users to the sync queue.
    :param user: The user performing the action.
    :param action_type: Type of action to be synced.
    :param data_type: The type of data being synced.
    :param data: The actual data being synced.
    """
    if user.is_offline:
        SyncQueue.objects.create(
            user=user, action_type=action_type, data_type=data_type, data=data
        )
