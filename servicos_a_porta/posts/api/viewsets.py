from rest_framework import viewsets
from posts import models
from posts.api import serializers

class PostViewSet(viewsets.ModelViewSet):
    queryset = models.PostServico.objects.all()
    serializer_class = serializers.PostSerializer
    
class ComentarioViewSet(viewsets.ModelViewSet):
    queryset = models.ComentarioPost.objects.all()
    serializer_class = serializers.ComentarioSerializer