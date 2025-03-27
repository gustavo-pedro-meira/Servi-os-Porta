# from rest_framework import permissions

# class PermissaoCliente(permissions.BasePermission):
#     def has_permission(self, request, view):
#         if request.method == 'POST' and not request.user.is_authenticated:
#             return True
#         elif request.method in permissions.SAFE_METHODS:
#             return request.user and request.user.is_authenticated
#         else:
#             return False