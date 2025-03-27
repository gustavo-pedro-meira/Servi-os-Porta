from rest_framework import serializers
from clientes.models import Cliente, Endereco

class ClienteSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True, style = {'input_type': 'password'})
    class Meta:
        model = Cliente
        fields = ["cpf", "nome", "dataNascimento", "biografia", "password", "username", "email"]
        write_only_fields = ('password')
        read_only_fields = ('is_staff', 'is_superuser', 'is_active')
        
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
