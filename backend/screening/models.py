from django.db import models


class Screening(models.Model):
    """This model stores the required input data for the screening process in EIA."""

    project = models.OneToOneField(
        "core.Project", on_delete=models.CASCADE, related_name="screening_detail"
    )  # OneToOneField ensures that each project has one screening process
    date_screened = models.DateTimeField(auto_now_add=True)

    # Screening criteria
    protected_areas = models.BooleanField(
        default=False, help_text="Indicate if the project affects any protected areas."
    )
    biodiversity_impacts = models.BooleanField(
        default=False,
        help_text="Specify if the project has potential biodiversity impacts.",
    )
    water_resources_impacts = models.BooleanField(
        default=False, help_text="Specify if the project impacts water resources."
    )

    area_covered = models.FloatField(
        help_text="The total area covered by the project in hectares."
    )
    expected_output = models.FloatField(
        help_text="Expected output of the project (e.g., in MW for energy projects)."
    )
    infrastructure = models.JSONField(
        help_text="List of infrastructure involved, such as turbines, access roads, etc."
    )

    construction_duration = models.IntegerField(
        help_text="Duration of the construction phase in months."
    )
    operational_duration = models.IntegerField(
        help_text="Duration of the operational phase in years."
    )

    community_support = models.BooleanField(
        default=False,
        help_text="Indicate if there is community support for the project.",
    )
    public_opposition = models.BooleanField(
        default=False,
        help_text="Indicate if there is public opposition to the project.",
    )

    air_quality_impact = models.CharField(
        max_length=255,
        help_text="Describe the impact on air quality (e.g., minimal, significant).",
    )
    noise_impact = models.CharField(
        max_length=255,
        help_text="Describe the noise impact during construction and operation.",
    )
    flora_fauna_impact = models.CharField(
        max_length=255, help_text="Describe the impact on flora and fauna."
    )
    water_pollution_impact = models.CharField(
        max_length=255, help_text="Describe the impact on water pollution."
    )

    # These fields are filled in automatically after the screening process
    screening_result = models.JSONField(blank=True, null=True)

    def __str__(self):
        return f"Screening for {self.project.name}"

    class Meta:
        verbose_name = "Screening"
        verbose_name_plural = "Screenings"
        ordering = ["-date_screened"]
