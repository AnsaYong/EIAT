from rest_framework.permissions import BasePermission


class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_staff


class IsProjectDeveloper(BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name="Project Developer").exists()


class IsConsultant(BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name="Consultant").exists()


class IsRegulator(BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name="Regulator").exists()
