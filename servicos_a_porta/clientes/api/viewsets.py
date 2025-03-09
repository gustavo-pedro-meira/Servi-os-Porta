from rest_framework import viewsets
from clientes import models
from clientes.api import serializers

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = models.Cliente.objects.all()
    serializer_class = serializers.ClienteSerializer
    
class EnderecoViewSet(viewsets.ModelViewSet):
    queryset = models.Endereco.objects.all()
    serializer_class = serializers.EnderecoSerializer