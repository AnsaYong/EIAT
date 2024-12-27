"""This module provides models used to store the core functionalities
which are common to all apps. It handles project creation, management,
and role assignments."""

from django.db import models


class Country(models.Model):
    """Stores details relating to EIA for various countries.

    Attributes:
        name: the country name
        regulations: the country regulation
    """

    name = models.CharField(max_length=100)
    regulations = models.JSONField()  # Store regulations as JSON for flexibility

    def __str__(self) -> str:
        """String representation of the country"""
        return self.name

    class Meta:
        verbose_name = "Country"
        verbose_name_plural = "Countries"
        ordering = ["name"]


class Company(models.Model):
    """Stores company details

    Attributes:
        name: the company name
        address: the company address
    """

    name = models.CharField(max_length=255, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    # Add more fields as needed

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Company"
        verbose_name_plural = "Companies"
        ordering = ["name"]


class Project(models.Model):
    """Stores the project settings,
    including detailed information for eaach project.

    Attributes:
        name: the project name
        location: the project location
        description: the project description
        country: the country in which the project is located
        manager: the user managing the project
        company: the company managing the project
    """

    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    description = models.TextField()
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    manager = models.ForeignKey(
        "user_management.User",
        on_delete=models.CASCADE,
        related_name="managed_projects",
    )  # Assigns the user as the project manager
    last_modified = models.DateTimeField(auto_now=True)  # For sync purposes

    latitude = models.DecimalField(
        max_digits=9, decimal_places=6, null=True, blank=True
    )
    longitude = models.DecimalField(
        max_digits=9, decimal_places=6, null=True, blank=True
    )

    # EIA steps filled in after each step is completed
    screening_results = models.JSONField(blank=True, null=True)
    scoping_result = models.JSONField(null=True, blank=True)
    baseline_study_result = models.JSONField(null=True, blank=True)
    impact_assessment_result = models.JSONField(null=True, blank=True)
    gis_data = models.JSONField(null=True, blank=True)
    mitigation_plan = models.JSONField(null=True, blank=True)
    monitoring_plan = models.JSONField(null=True, blank=True)
    public_participation = models.JSONField(null=True, blank=True)
    report = models.JSONField(null=True, blank=True)
    legal_compliance = models.JSONField(null=True, blank=True)
    link_to_external_data = models.URLField(null=True, blank=True)
    review_and_approval = models.JSONField(null=True, blank=True)
    post_project_analysis = models.JSONField(null=True, blank=True)

    # Financial information
    budget_estimate = models.DecimalField(
        max_digits=20, decimal_places=2, null=True, blank=True
    )
    funding_source = models.CharField(max_length=255, null=True, blank=True)
    spent_budget = models.DecimalField(
        max_digits=20, decimal_places=2, null=True, blank=True
    )
    # Environmental impact information
    primary_environmental_concern = models.CharField(
        max_length=255, null=True, blank=True
    )
    ecosystem_type = models.CharField(max_length=255, null=True, blank=True)
    # Team and stakeholders
    team_members = models.ManyToManyField(
        "user_management.User", related_name="team_projects", blank=True
    )
    stakeholders = models.JSONField(null=True, blank=True)

    # Status and Compliance
    project_status = models.CharField(
        max_length=50,
        choices=[
            ("planned", "Planned"),
            ("in_progress", "In Progress"),
            ("completed", "Completed"),
            ("suspended", "Suspended"),
        ],
        default="planned",
    )
    compliance_level = models.CharField(max_length=255, null=True, blank=True)

    # Contact information
    contact_email = models.EmailField(null=True, blank=True)
    contact_phone = models.CharField(max_length=20, null=True, blank=True)
    emergency_contact = models.CharField(max_length=255, null=True, blank=True)

    # Additional information
    project_documents = models.JSONField(null=True, blank=True)
    additional_links = models.JSONField(null=True, blank=True)

    def __str__(self) -> str:
        """String representation of the project"""
        return self.name

    class Meta:
        ordering = ["name"]


class UserRole(models.Model):
    """Stores user roles for specific projects

    Attributes:
        user: the user assigned to the project
        project: the project for which the role is assigned
        role: the role of the user in the project
    """

    ROLE_CHOICES = [
        ("admin", "Admin"),
        ("consultant", "Consultant"),
        ("reviewer", "Reviewer"),
        ("client", "Client"),
    ]
    user = models.ForeignKey("user_management.User", on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)

    class Meta:
        """Meta class for the UserRole model.
        Ensures that a user can only have one role in a project.
        """

        unique_together = ("user", "project")
        ordering = ["project", "user"]

    def __str__(self) -> str:
        """String representation of the UserRole"""
        return f"{self.user.username} - {self.role} in {self.project.name}"
