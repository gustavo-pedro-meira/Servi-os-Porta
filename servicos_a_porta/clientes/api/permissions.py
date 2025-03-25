from rest_framework import permissions

class PermissaoCliente(permissions.BasePermission):
    def has_permission(self, request, view):
        # Permite POST sem autenticação
        if request.method == 'POST' and not request.user.is_authenticated:
            return True
        # Exige autenticação para métodos seguros (GET, HEAD, OPTIONS)
        elif request.method in permissions.SAFE_METHODS:
            return request.user and request.user.is_authenticated
        # Bloqueia outros métodos
        else:
            return False