from rest_framework import serializers
from profissionais.models import Profissao, Profissional
from django.contrib.auth.models import User

class ProfissionalSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True, style = {'input_type': 'password'})
    class Meta:
        model = Profissional
        fields = ["nome", "dataNascimento", "descricao", "nivel_profissional", "cpf", "cep", "estado", "cidade", "dataInicio", "idProfissao", "username", "email", "password"]
        write_only_fields = ('password')
        read_only_fields = ('is_staff', 'is_superuser', 'is_active')

        
    def create(self, validated_data):
        password = validated_data.pop("password")
        user = Profissional(**validated_data) 
        user.set_password(password)  
        user.clean()
        user.save()
        return user
    
    def update(self, instance, validated_data):
        instance.cep = validated_data.get("cep", instance.cep)
        instance.password = validated_data.get("password", instance.password)
        instance.clean()  
        instance.save()   
        return instance
    
        
class ProfissaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profissao
        fields = "__all__"