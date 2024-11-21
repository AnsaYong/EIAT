from django.urls import path
from .views import ScreeningView

urlpatterns = [
    # Route for the ScreeningView
    path(
        "screenings/", ScreeningView.as_view(), name="screening-list-create"
    ),  # For listing and creating
    path(
        "screenings/<int:pk>/", ScreeningView.as_view(), name="screening-detail"
    ),  # For retrieving, updating, or deleting a specific screening
]
