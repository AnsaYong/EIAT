"""This module provides the API endpoint for the screening an EIA project, and is
based on criteria from several categories like environmental sensitivity,
project size, duration, public interest, and potential impacts."""

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action

from .models import Screening
from core.models import Project
from .serializers import ScreeningSerializer


class ScreeningView(APIView):
    """API endpoint that allows screening results to be viewed or edited.
    Manages the creation of screening entries and automatically links a
    screening to a project via the project_id passed in the request.

    APIview gives us the most control over the logic, and we can define
    custom actions like the form_metadata action to retrieve metadata
    for the Screening form fields.

    Attributes:
        queryset (QuerySet): All screening results.
        serializer_class (Serializer): The ScreeningSerializer

    Methods:
        post: Passes the request data to the serializer and invokes the screening logic.
        perform_screening_logic: Handles the screening logic.
        form_metadata: Retrieves metadata for Screening form fields.
    """

    def post(self, request, *args, **kwargs):
        """Passes the request data to the serializer and invokes the screening logic."""
        serializer = ScreeningSerializer(data=request.data)

        if serializer.is_valid():
            screening = serializer.save()
            self.perform_screening_logic(screening)  # Perform the screening logic here
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def perform_screening_logic(self, screening):
        """This function handles the screening logic."""
        data = {
            "protected_areas": screening.protected_areas,
            "biodiversity_impacts": screening.biodiversity_impacts,
            "water_resources_impacts": screening.water_resources_impacts,
            "area_covered": screening.area_covered,
            "expected_output": screening.expected_output,
            "infrastructure": screening.infrastructure,
            "construction_duration": screening.construction_duration,
            "operational_duration": screening.operational_duration,
            "community_support": screening.community_support,
            "public_opposition": screening.public_opposition,
            "air_quality_impact": screening.air_quality_impact,
            "noise_impact": screening.noise_impact,
            "flora_fauna_impact": screening.flora_fauna_impact,
            "water_pollution_impact": screening.water_pollution_impact,
        }

        # Decision logic
        decision = "EIA not required"
        reason = []

        if screening.area_covered > 10 or screening.expected_output > 50:
            decision = "EIA required"
            reason.append("Project size exceeds thresholds.")

        if (
            screening.protected_areas
            or screening.biodiversity_impacts
            or screening.water_resources_impacts
        ):
            decision = "EIA required"
            reason.append("Potential significant environmental sensitivity.")

        if (
            screening.noise_impact == "moderate"
            or screening.flora_fauna_impact == "high"
        ):
            decision = "Further Assessment needed"
            reason.append("Moderate or high impacts detected.")

        mitigation_required = (
            screening.noise_impact == "moderate"
            or screening.flora_fauna_impact == "low"
        )
        if mitigation_required:
            decision = "Mitigation measures required"
            reason.append("Mitigation measures needed for moderate impacts.")

        if screening.public_opposition:
            decision = "EIA required"
            reason.append("Public opposition detected.")

        # Create screening result
        screening_result = {
            "project_name": screening.project.name,
            "date_screened": (
                screening.date_screened.isoformat() if screening.date_screened else None
            ),
            "screening_criteria": {
                "environmental_sensitivity": {
                    "protected_areas": screening.protected_areas,
                    "biodiversity_impacts": screening.biodiversity_impacts,
                    "water_resources": screening.water_resources_impacts,
                },
                "project_size": {
                    "area_covered": screening.area_covered,
                    "expected_output": screening.expected_output,
                    "infrastructure": screening.infrastructure,
                },
                "duration": {
                    "construction_phase": screening.construction_duration,
                    "operational_phase": screening.operational_duration,
                },
                "public_interest": {
                    "community_support": screening.community_support,
                    "opposition": screening.public_opposition,
                },
            },
            "potential_impacts": {
                "air_quality": screening.air_quality_impact,
                "noise": screening.noise_impact,
                "flora_fauna": screening.flora_fauna_impact,
                "water_pollution": screening.water_pollution_impact,
            },
            "mitigation_measures_required": mitigation_required,
            "screening_decision": decision,
            "reason_for_decision": " ".join(reason),
            "screening_officer": "Ansahmbom Yong Nke",
            "next_steps": (
                "Proceed to Scoping"
                if decision != "EIA not required"
                else "No further steps"
            ),
        }

        # Update the value of screening result in the Screening model
        screening.screening_result = screening_result
        screening.save()

        # Update the related project's screening_result field
        project = screening.project
        if hasattr(project, "screening_results"):
            project.screening_results = screening_result
            project.save()

    @action(detail=False, methods=["get"])
    def form_metadata(self, request):
        """
        Endpoint to retrieve metadata for Screening form fields - the aim
        is to expose the help_text in the model.
        """
        metadata = []
        for field in Screening._meta.fields:
            metadata.append(
                {
                    "field_name": field.name,
                    "field_type": field.get_internal_type(),
                    "help_text": field.help_text,
                }
            )
        return Response(metadata, status=status.HTTP_200_OK)
