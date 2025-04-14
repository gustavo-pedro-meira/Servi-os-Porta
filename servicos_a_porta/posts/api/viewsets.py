from rest_framework import viewsets
from posts import models
from posts.api import serializers
from rest_framework.permissions import IsAuthenticated
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

class PostViewSet(viewsets.ModelViewSet):
    queryset = models.PostServico.objects.all()
    serializer_class = serializers.PostSerializer
    # permission_classes = [IsAuthenticated]
    
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