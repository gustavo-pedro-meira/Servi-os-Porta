from rest_framework import serializers
from clientes import models

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Cliente
        fields = ["biografia", "password", "username", "email"]
        
class EnderecoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Endereco
        fields = "__all__"

