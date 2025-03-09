from rest_framework import serializers
from servicos import models

class ServicosSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Servico
        fields = "__all__"