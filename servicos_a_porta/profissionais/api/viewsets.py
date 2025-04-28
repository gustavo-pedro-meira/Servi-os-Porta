from rest_framework import viewsets, generics
from profissionais import models
from profissionais.api import serializers
from django.contrib.postgres.search import TrigramSimilarity
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

class ProfissionalViewSet(viewsets.ModelViewSet):
    queryset = models.Profissional.objects.all()
    serializer_class = serializers.ProfissionalSerializer
    filter_backends = [OrderingFilter, DjangoFilterBackend]
    filterset_fields = ['cep', 'nivel_profissional', 'idProfissao']
    ordering = ['nome']

    @method_decorator(cache_page(900))
    def dispatch(self, *args, **kwargs):
        return super(ProfissionalViewSet, self).dispatch(*args, **kwargs)

    def get_queryset(self):
        queryset = ProfissionalViewSet.queryset
        query = self.request.query_params.get('search', None)
        if query:
            queryset = queryset.annotate(
                similarity=TrigramSimilarity('nome', query) 
            ).filter(similarity__gt=0.1).order_by('-similarity')
        return queryset
    
class ProfissaoViewSet(viewsets.ModelViewSet):
    queryset = models.Profissao.objects.all()
    serializer_class = serializers.ProfissaoSerializer
    filter_backends = [OrderingFilter]
    ordering = ['nome']
    
    @method_decorator(cache_page(900))
    def dispatch(self, *args, **kwargs):
        return super(ProfissaoViewSet, self).dispatch(*args, **kwargs)
    
    def get_queryset(self):
        queryset = ProfissaoViewSet.queryset
        query = self.request.query_params.get('search', None)
        if query:
            queryset = queryset.annotate(
                similarity=TrigramSimilarity('nome', query) 
            ).filter(similarity__gt=0.2).order_by('-similarity')
        return queryset
    
