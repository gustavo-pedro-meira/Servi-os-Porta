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
from profissionais.models import Profissional
from rest_framework.decorators import action
from rest_framework.response import Response


class PostViewSet(viewsets.ModelViewSet):
    queryset = models.PostServico.objects.all().order_by('-created_at')  #
    serializer_class = serializers.PostSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    ordering_fields = ['created_at', 'titulo', 'id'] 
    ordering = ['-created_at']  
    permission_classes = [IsAuthenticated, IsProfissional]

    def get_permissions(self):
        if self.action == "curtir":
            return [IsAuthenticated()]
        return super().get_permissions()

    def perform_create(self, serializer):
        try:
            profissional = Profissional.objects.get(id=self.request.user.id)
            serializer.save(profissional=profissional)
        except Profissional.DoesNotExist:
            raise serializers.ValidationError("Profissional não encontrado")
        
    def get_queryset(self):
        queryset = super().get_queryset() 
        query = self.request.query_params.get("search", None)
        if query:
            queryset = queryset.annotate(
                similarity=TrigramSimilarity("titulo", query)
            ).filter(similarity__gt=0.1).order_by("-similarity", "-created_at") 
        return queryset
    
    @action(detail=True, methods=["Post"])
    def curtir(self, request, pk=None):
        post = self.get_object()
        usuario = request.user
        curtida = models.Curtida.objects.filter(post=post, usuario=usuario)
        if curtida.exists():
            curtida.delete()
            return Response({'status': 'descurtido', 'curtidas_count': post.curtidas.count()})
        else:
            models.Curtida.objects.create(post=post, usuario=usuario)
            return Response({'status': 'curtido', 'curtidas_count': post.curtidas.count()})
        
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