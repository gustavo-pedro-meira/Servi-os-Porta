from rest_framework import serializers
from clientes.models import Cliente, Endereco
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
import re

class ClienteSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True, style = {'input_type': 'password'})
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
    class Meta:
        model = Cliente
        fields = ["cpf", "nome", "dataNascimento", "biografia", "password", "username", "numero", "email"]
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

    def validate(self, data):
        self.Senha8Digitos(data)
        self.SenhaCaracteresEspeciais(data)
        self.SenhaLetraMaiuscula(data)
        self.SenhaContemNumero(data)
        self.SenhaSemEspacos(data)
        return data
        
    def create(self, validated_data):
        password = validated_data.pop("password")
        user = Cliente(**validated_data) 
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
        
        
class EnderecoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Endereco
        fields = "__all__"

    def create(self, validated_data):
        instance = Endereco(**validated_data)
        instance.clean()
        instance.save()   
        return instance
    
    def update(self, instance, validated_data):
        instance.rua = validated_data.get("rua", instance.rua)
        instance.numero = validated_data.get("numero", instance.numero)
        instance.cep = validated_data.get("cep", instance.cep)
        instance.clean()  
        instance.save()   
        return instance
