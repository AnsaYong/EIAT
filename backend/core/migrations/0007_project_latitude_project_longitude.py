# Generated by Django 5.0.8 on 2024-09-24 08:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0006_project_baseline_study_result_project_gis_data_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="project",
            name="latitude",
            field=models.DecimalField(
                blank=True, decimal_places=6, max_digits=9, null=True
            ),
        ),
        migrations.AddField(
            model_name="project",
            name="longitude",
            field=models.DecimalField(
                blank=True, decimal_places=6, max_digits=9, null=True
            ),
        ),
    ]