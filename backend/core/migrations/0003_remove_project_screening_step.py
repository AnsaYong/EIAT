# Generated by Django 5.0.8 on 2024-09-05 13:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0002_project_screening_step"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="project",
            name="screening_step",
        ),
    ]
