from rest_framework import viewsets
from posts import models
from posts.api import serializers
from rest_framework.permissions import IsAuthenticated

class PostViewSet(viewsets.ModelViewSet):
    queryset = models.PostServico.objects.all()
    serializer_class = serializers.PostSerializer
    permission_classes = [IsAuthenticated]
    
class ComentarioViewSet(viewsets.ModelViewSet):
    queryset = models.ComentarioPost.objects.all()
    serializer_class = serializers.ComentarioSerializer
    permission_classes = [IsAuthenticated]

