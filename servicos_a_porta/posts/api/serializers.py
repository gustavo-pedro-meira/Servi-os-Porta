from rest_framework import serializers
from posts import models

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PostServico
        fields = "__all__"

        
class ComentarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ComentarioPost
        fields = "__all__"
        