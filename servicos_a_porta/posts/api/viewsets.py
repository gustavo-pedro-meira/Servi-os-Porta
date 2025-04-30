from rest_framework import viewsets
from posts import models
from posts.api import serializers
from rest_framework.permissions import IsAuthenticated
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.contrib.postgres.search import TrigramSimilarity

class PostViewSet(viewsets.ModelViewSet):
    queryset = models.PostServico.objects.all()
    serializer_class = serializers.PostSerializer
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = PostViewSet.queryset
        query = self.request.query_params.get("search", None)
        if query:
            queryset = queryset.annotate(
                similarity=TrigramSimilarity("titulo", query)
            ).filter(similarity__gt=0.1).order_by("-similarity")
        return queryset
    
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