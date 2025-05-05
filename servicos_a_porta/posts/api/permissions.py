from rest_framework import permissions
from profissionais.models import Profissional

class IsProfissional(permissions.BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        return Profissional.objects.filter(id=request.user.id).exists()