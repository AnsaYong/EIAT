# Generated by Django 5.0.8 on 2024-09-07 15:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0005_project_screening_results"),
    ]

    operations = [
        migrations.AddField(
            model_name="project",
            name="baseline_study_result",
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="project",
            name="gis_data",
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="project",
            name="impact_assessment_result",
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="project",
            name="legal_compliance",
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="project",
            name="link_to_external_data",
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="project",
            name="mitigation_plan",
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="project",
            name="monitoring_plan",
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="project",
            name="post_project_analysis",
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="project",
            name="public_participation",
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="project",
            name="report",
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="project",
            name="review_and_approval",
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="project",
            name="scoping_result",
            field=models.JSONField(blank=True, null=True),
        ),
    ]
