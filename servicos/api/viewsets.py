from rest_framework import viewsets
from rest_framework.permissions import DjangoModelPermissions, IsAuthenticated
from servicos import models
from servicos.api import serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page


class ServicoViewSet(viewsets.ModelViewSet):
    queryset = models.Servico.objects.all()
    serializer_class = serializers.ServicosSerializer

    @method_decorator(cache_page(900))
    def dispatch(self, *args, **kwargs):
        return super(ServicoViewSet, self).dispatch(*args, **kwargs)