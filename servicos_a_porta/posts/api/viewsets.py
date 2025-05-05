from rest_framework import viewsets
from posts import models
from posts.api import serializers
from rest_framework.permissions import IsAuthenticated
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from django.contrib.postgres.search import TrigramSimilarity
from posts.api.permissions import IsProfissional

class PostViewSet(viewsets.ModelViewSet):
    queryset = models.PostServico.objects.all().order_by('-created_at')  # Ordenação padrão
    serializer_class = serializers.PostSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    ordering_fields = ['created_at', 'titulo', 'id']  # Campos permitidos para ordenação
    ordering = ['-created_at']  # Ordenação padrão
    permission_classes = [IsAuthenticated, IsProfissional]

    def get_queryset(self):
        queryset = super().get_queryset()  # Usa o queryset base com ordenação padrão
        query = self.request.query_params.get("search", None)
        if query:
            queryset = queryset.annotate(
                similarity=TrigramSimilarity("titulo", query)
            ).filter(similarity__gt=0.1).order_by("-similarity", "-created_at")  # Combina similaridade e data
        return queryset
    
    def perform_create(self, serializer):
        profissional = Profissional.objects.get(id=self.request.user.id)
        serializer.save(profissional=profissional)

    @method_decorator(cache_page(900))
    def dispatch(self, *args, **kwargs):
        return super(PostViewSet, self).dispatch(*args, **kwargs)
    
class ComentarioViewSet(viewsets.ModelViewSet):
    queryset = models.ComentarioPost.objects.all()
    serializer_class = serializers.ComentarioSerializer
    # permission_classes = [IsAuthenticated]

    @method_decorator(cache_page(900))
    def dispatch(self, *args, **kwargs):
        return super(ComentarioViewSet, self).dispatch(*args, **kwargs)