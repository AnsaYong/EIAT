from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.utils.crypto import get_random_string


class Command(BaseCommand):
    help = "Seed the database with initial users"

    def handle(self, *args, **kwargs):
        User = get_user_model()

        # Create sample users
        users = [
            {
                "email": "admin@example.com",
                "first_name": "Admin",
                "last_name": "User",
                "password": "password123",
                "password_confirmation": "password123",
                "role": "admin",
            },
            {
                "email": "developer@example.com",
                "first_name": "Project",
                "last_name": "Developer",
                "password": "password123",
                "password_confirmation": "password123",
                "role": "project_developer",
            },
            {
                "email": "consultant@example.com",
                "first_name": "Consultant",
                "last_name": "User",
                "password": "password123",
                "password_confirmation": "password123",
                "role": "consultant",
            },
            {
                "email": "regulator@example.com",
                "first_name": "Regulator",
                "last_name": "User",
                "password": "regulator123",
                "password_confirmation": "regulator123",
                "organization_affiliation": "Regulatory Agency",
                "designation": "Regulator",
                "role": "regulator",
            },
            {
                "email": "stakeholder@example.com",
                "first_name": "Stakeholder",
                "last_name": "User",
                "password": "stakeholder123",
                "password_confirmation": "stakeholder123",
                "organization_affiliation": "Public Group",
                "designation": "Public Stakeholder",
                "role": "Public Stakeholder",
            },
            {
                "email": "expert@example.com",
                "first_name": "Independent Expert",
                "last_name": "User",
                "password": "expert123",
                "password_confirmation": "expert123",
                "organization_affiliation": "Independent Org",
                "designation": "Independent Expert",
                "role": "Independent Expert",
            },
        ]

        for user_data in users:
            user = User.objects.create_user(**user_data)
            user.set_password(user_data["password"])  # Ensure password is hashed
            user.save()

        self.stdout.write(self.style.SUCCESS("Successfully seeded users"))
