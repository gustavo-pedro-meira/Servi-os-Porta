from rest_framework import viewsets
from clientes import models
from clientes.api import serializers
from django.contrib.postgres.search import TrigramSimilarity
from rest_framework.filters import SearchFilter
from .permissions import PermissaoCliente

class ClienteViewSet(viewsets.ModelViewSet):
    # permission_classes = [PermissaoCliente]
    queryset = models.Cliente.objects.all()
    serializer_class = serializers.ClienteSerializer
    
    def get_queryset(self):
        queryset = ClienteViewSet.queryset
        query = self.request.query_params.get('search', None)
        if query:
            queryset = queryset.annotate(
                similarity=TrigramSimilarity('nome', query) 
            ).filter(similarity__gt=0.2).order_by('-similarity')
        return queryset
    
class EnderecoViewSet(viewsets.ModelViewSet):
    queryset = models.Endereco.objects.all()
    serializer_class = serializers.EnderecoSerializer
