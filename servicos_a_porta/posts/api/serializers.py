from rest_framework import serializers
from posts import models
from profissionais.models import Profissional

class ProfissionalSerializer(serializers.ModelSerializer):
    profissao = serializers.CharField(source='idProfissao.nome', read_only=True)
    class Meta:
        model = Profissional
        fields = ["id", "nome", "idProfissao", "foto_perfil", "profissao"]
        ref_name = "PostProfissionalSerializer"


class PostSerializer(serializers.ModelSerializer):
    usuario = ProfissionalSerializer(source="profissional", read_only=True)
    class Meta:
        model = models.PostServico
        fields = ["id", "titulo", "conteudo", "dataCriacao", "curtidas", "usuario", "created_at", "updated_at", "is_active"]

        
class ComentarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ComentarioPost
        fields = "__all__"
        