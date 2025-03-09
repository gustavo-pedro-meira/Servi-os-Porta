from rest_framework import viewsets
from servicos import models
from servicos.api import serializers

class ServicosViewSet(viewsets.ModelViewSet):
    queryset = models.Servico.objects.all()
    serializer_class = serializers.ServicosSerializer