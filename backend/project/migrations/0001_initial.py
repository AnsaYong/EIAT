# Generated by Django 5.0.8 on 2024-12-28 19:23

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Project",
            fields=[
                (
                    "project_id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("name", models.CharField(max_length=255)),
                ("description", models.TextField(blank=True, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name="ProjectUserRole",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "role",
                    models.CharField(
                        choices=[
                            ("pending", "Pending"),
                            ("project_admin", "Admin"),
                            ("project_developer", "Project Developer"),
                            ("consultant", "Consultant"),
                            ("regulator", "Regulator"),
                            ("public_stakeholder", "Public Stakeholder"),
                            ("independent_expert", "Independent Expert"),
                        ],
                        default="pending",
                        max_length=50,
                    ),
                ),
            ],
        ),
    ]