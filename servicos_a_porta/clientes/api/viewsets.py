from rest_framework import viewsets
from clientes import models
from clientes.api import serializers
from django.contrib.postgres.search import TrigramSimilarity
from rest_framework.filters import SearchFilter
from rest_framework.permissions import DjangoModelPermissions

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = models.Cliente.objects.all()
    serializer_class = serializers.ClienteSerializer
    permission_classes = [DjangoModelPermissions]
    
    
    def get_queryset(self):
        queryset = ClienteViewSet.queryset
        query = self.request.query_params.get('search', None)
        if query:
            # Busca fuzzy com TrigramSimilarity
            queryset = queryset.annotate(
                similarity=TrigramSimilarity('nome', query) 
            ).filter(similarity__gt=0.2).order_by('-similarity')
        return queryset
    
class EnderecoViewSet(viewsets.ModelViewSet):
    queryset = models.Endereco.objects.all()
    serializer_class = serializers.EnderecoSerializer
    permission_classes = [DjangoModelPermissions]