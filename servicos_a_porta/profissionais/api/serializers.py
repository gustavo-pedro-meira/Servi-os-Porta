from rest_framework import serializers
from profissionais import models


class ProfissionalSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Profissional
        fields = ["cpf", "nome", "dataNascimento", "descricao","nivel_profissional", "cep", "estado", "cidade", "dataInicio", "idProfissao", "password", "username", "email"]
        read_only_fields = ['profissional']
        
class ProfissaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Profissao
        fields = "__all__"