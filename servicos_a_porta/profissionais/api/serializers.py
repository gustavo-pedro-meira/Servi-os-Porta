from rest_framework import serializers
from profissionais.models import Profissao, Profissional
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator

class ProfissionalSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True, style = {'input_type': 'password'})
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
    class Meta:
        model = Profissional
        fields = ["nome", "dataNascimento", "descricao", "nivel_profissional", "cpf", "cep", "estado", "cidade", "dataInicio", "idProfissao", "username", "email", "password"]
        write_only_fields = ('password')
        read_only_fields = ('is_staff', 'is_superuser', 'is_active')
        
    def Senha8Digitos(self, data):
        if len(data["password"]) < 8:
            raise serializers.ValidationError("A senha deve ter pelo menos 8 caracteres.")
        return data
        
    def SenhaCaracteresEspeciais(self, data):
        caracteres = ["!","@","#","$","%","^","&","*"]
        if not any(c in data["password"] for c in caracteres):
            raise serializers.ValidationError("A senha deve conter caracteres especiais.")
        return data

    def validate(self, data):
        self.Senha8Digitos(data)
        self.SenhaCaracteresEspeciais(data)
        return data
        
    def create(self, validated_data):
        password = validated_data.pop("password")
        user = Profissional(**validated_data) 
        user.set_password(password)  
        user.clean()
        user.save()
        return user
    
    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password is not None:
            instance.set_password(password)
        instance.clean()
        instance.save()
        return instance
    
        
class ProfissaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profissao
        fields = "__all__"