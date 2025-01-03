"""
This file contains all the constants used in the project. This includes the

- Organization choices
- Project roles
- etc
"""

ORGANIZATION_CHOICES = [
    ("gov", "Government"),
    ("ngo", "Non-Governmental Organization"),
    ("consult", "Consulting Firm"),
    ("public", "Public Stakeholder"),
    ("independent", "Independent Expert"),
]

PROJECT_ROLE_CHOICES = [
    ("project_developer", "Project Developer"),
    ("consultant", "Consultant"),
    ("regulator", "Regulator"),
    ("public_stakeholder", "Public Stakeholder"),
    ("independent_expert", "Independent Expert"),
]

STATUS_CHOICES = [
    ("pending", "Pending"),
    ("approved", "Approved"),
    ("rejected", "Rejected"),
]
