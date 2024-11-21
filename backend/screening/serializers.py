from rest_framework import serializers

from .models import Screening


class ScreeningSerializer(serializers.ModelSerializer):
    """Serializer for the Screening model."""

    class Meta:
        model = Screening
        # The fields that will be serialized - data required for the screening process
        fields = [
            "project",
            "protected_areas",
            "biodiversity_impacts",
            "water_resources_impacts",
            "area_covered",
            "expected_output",
            "infrastructure",
            "construction_duration",
            "operational_duration",
            "community_support",
            "public_opposition",
            "air_quality_impact",
            "noise_impact",
            "flora_fauna_impact",
            "water_pollution_impact",
            # "screening_result",  # Do not include this field in the serializer
        ]


class ScreeningFieldSerializer(serializers.Serializer):
    """Captures the field names and their corresponding help texts"""

    field_name = serializers.CharField()
    field_type = serializers.CharField()
    help_text = serializers.CharField(allow_blank=True, allow_null=True)
