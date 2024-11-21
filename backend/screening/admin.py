from django.contrib import admin
from .models import Screening


# Register your models here.
@admin.register(Screening)
class ScreeningAdmin(admin.ModelAdmin):
    list_display = (
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
    )
