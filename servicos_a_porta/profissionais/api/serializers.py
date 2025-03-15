from rest_framework import serializers
from profissionais import models

class ProfissionalSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Profissional
        fields = ["cpf", "nome", "descricao", "dataInicio", "idProfissao", "password", "username", "email"]
        
class ProfissaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Profissao
        fields = "__all__"