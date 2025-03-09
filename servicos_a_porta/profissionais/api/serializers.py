from rest_framework import serializers
from profissionais import models

class ProfissionalSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Profissional
        fields = "__all__"
        
class ProfissaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Profissao
        fields = "__all__"