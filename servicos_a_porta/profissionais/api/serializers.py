from rest_framework import serializers
from profissionais.models import Profissao, Profissional
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
import datetime
import re

class ProfissionalSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True, style = {'input_type': 'password'})
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
    profissao = serializers.CharField(source='idProfissao.nome', read_only=True)
    class Meta:
        model = Profissional
        fields = ["nome", "dataNascimento", "descricao", "nivel_profissional", "foto_perfil" , "idProfissao", "cpf", "cep", "estado", "cidade", "dataInicio", "profissao", "username", "numero", "email", "password"]
        write_only_fields = ('password')
        read_only_fields = ('is_staff', 'is_superuser', 'is_active')
        
    def Senha8Digitos(self, data):
        if len(data["password"]) < 8:
            raise serializers.ValidationError("A senha deve ter pelo menos 8 caracteres.")
        return data
    
    def SenhaLetraMaiuscula(self, data):
        if not re.search(r'[A-Z]', data["password"]):
            raise serializers.ValidationError("A senha deve conter pelo menos uma letra maiúscula.")
        return data
    
    def SenhaContemNumero(self, data):
        if not re.search(r'[0-9]', data["password"]):
            raise serializers.ValidationError("A senha deve conter pelo menos um número.")
        return data
        
    def SenhaCaracteresEspeciais(self, data):
        caracteres = ["!","@","#","$","%","^","&","*"]
        if not any(c in data["password"] for c in caracteres):
            raise serializers.ValidationError("A senha deve conter caracteres especiais.")
        return data
    
    def SenhaSemEspacos(self, data):
        if " " in data["password"]:
            raise serializers.ValidationError("A senha não pode conter espaços.")
        return data
    
    def IdadeMaior18(self, data):
        data = data["dataNascimento"]
        hoje = datetime.date.today()
        idade = hoje.year - data.year - ((hoje.month, hoje.day) < (data.month, data.day))
        if idade < 18:
            raise serializers.ValidationError("A pessoa deve ter pelo menos 18 anos.")

    def validate(self, data):
        self.Senha8Digitos(data)
        self.SenhaCaracteresEspeciais(data)
        self.SenhaLetraMaiuscula(data)
        self.SenhaContemNumero(data)
        self.SenhaSemEspacos(data)
        self.IdadeMaior18(data)
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