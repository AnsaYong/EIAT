from django.apps import AppConfig


class ScreeningConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "screening"

    def ready(self):
        # Import the signals module to register the signal
        import screening.signals
