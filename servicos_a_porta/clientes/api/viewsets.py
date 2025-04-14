from rest_framework import viewsets
from clientes.models import Endereco, Cliente
from clientes.api import serializers
from django.contrib.postgres.search import TrigramSimilarity
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework.filters import SearchFilter
# from .permissions import PermissaoCliente

class ClienteViewSet(viewsets.ModelViewSet):
    # permission_classes = [PermissaoCliente]
    queryset = Cliente.objects.all()
    serializer_class = serializers.ClienteSerializer
    
    @method_decorator(cache_page(900))
    def dispatch(self, *args, **kwargs):
        return super(ClienteViewSet, self).dispatch(*args, **kwargs)
    
    def get_queryset(self):
        queryset = ClienteViewSet.queryset
        query = self.request.query_params.get('search', None)
        if query:
            queryset = queryset.annotate(
                similarity=TrigramSimilarity('nome', query) 
            ).filter(similarity__gt=0.2).order_by('-similarity')
        return queryset
    
class EnderecoViewSet(viewsets.ModelViewSet):
    queryset = Endereco.objects.all()
    serializer_class = serializers.EnderecoSerializer
    
    @method_decorator(cache_page(900))
    def dispatch(self, *args, **kwargs):
        return super(EnderecoViewSet, self).dispatch(*args, **kwargs)
