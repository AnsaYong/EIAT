# Generated by Django 5.0.8 on 2024-09-06 14:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0004_alter_company_options_alter_country_options"),
    ]

    operations = [
        migrations.AddField(
            model_name="project",
            name="screening_results",
            field=models.JSONField(blank=True, null=True),
        ),
    ]
