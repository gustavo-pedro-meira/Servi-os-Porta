from rest_framework import serializers
from posts import models
from profissionais.models import Profissional


class ProfissionalSerializer(serializers.ModelSerializer):
    profissao = serializers.CharField(source='idProfissao.nome', read_only=True)
    class Meta:
        model = Profissional
        fields = ["id", "nome", "idProfissao", "foto_perfil", "profissao"]
        ref_name = "PostProfissionalSerializer"

class ComentarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ComentarioPost
        fields = "__all__"

class PostSerializer(serializers.ModelSerializer):
    usuario = ProfissionalSerializer(source="profissional", read_only=True)
    profissional = serializers.PrimaryKeyRelatedField(queryset=Profissional.objects.all(), required=False)
    curtidas_count = serializers.SerializerMethodField()
    is_curtido = serializers.SerializerMethodField()
    comentarios = ComentarioSerializer(many=True, read_only=True)
    comentarios_count = serializers.SerializerMethodField()

    def get_curtidas_count(self, obj):
        return obj.curtidas.count()
    
    def get_comentarios_count(self, obj):
        return obj.comentarios.count()
    
    def get_is_curtido(self, obj):
        user = self.context.get("request").user
        if user.is_authenticated:
            return obj.curtidas.filter(usuario=user).exists()
        return False
    
    def validate_conteudo(self, value):
        if value:
            if not value.name.lower().endswith(('.png', '.jpg', '.jpeg')):
                raise serializers.ValidationError("Apenas imagens PNG ou JPEG são permitidas.")
            if value.size > 5 * 1024 * 1024:
                raise serializers.ValidationError("A imagem deve ter no máximo 5MB.")
        return value

    class Meta:
        model = models.PostServico
        fields = ["id", "titulo", "conteudo", "dataCriacao", "profissional", "curtidas_count", "is_curtido", "usuario", "created_at", "updated_at", "is_active", "comentarios", "comentarios_count"]
        read_only_fields = ["dataCriacao", "curtidas_count", "is_curtido", "usuario", "created_at", "updated_at", "is_active", "comentarios_count"]
        
