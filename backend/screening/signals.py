"""This module provides signals for the screening app."""

from django.db.models.signals import post_delete
from django.dispatch import receiver


from core.models import Project
from .models import Screening


@receiver(post_delete, sender=Screening)
def clear_screening_results(sender, instance, **kwargs):
    """Set screening_results to null in the associated Project
    when Screening is deleted."""
    project = instance.project
    project.screening_results = None
    project.save()
