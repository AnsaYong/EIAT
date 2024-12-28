from django.contrib import admin
from .models import Project, Company, ProjectUserRole

admin.site.register(Project)
admin.site.register(Company)
admin.site.register(ProjectUserRole)
