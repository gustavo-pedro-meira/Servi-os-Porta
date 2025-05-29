from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import requests
from rest_framework import serializers
from brazilnum.cpf import validate_cpf

class Cliente(User):
    nome = models.CharField(max_length=100)
    dataNascimento = models.DateField(default="2023-03-03")
    cpf = models.CharField(max_length=11)
    numero = models.CharField(max_length=13, unique=True)
    
    def ValidaEmail(self):
        url = f"https://emailvalidation.abstractapi.com/v1/?api_key=4be442b1335348d28cf198787f7a49f5&email={self.email}"
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            is_smtp_valid = data["is_smtp_valid"]["value"]
            if is_smtp_valid:
                return True
            else:
                raise serializers.ValidationError({"email": "Email Inválido."})
        else:
            raise serializers.ValidationError({"email": "Erro na API."})
        
    def ValidaCpf(self):
        if not validate_cpf(self.cpf):
            raise serializers.ValidationError({"cpf": "CPF Inválido."})
        return self.cpf
    
    def clean(self):
        self.ValidaEmail()
        self.ValidaCpf()

    class Meta:
        verbose_name = "Cliente"
        verbose_name_plural = "Clientes"
        
    def __str__(self):
        return f"{self.nome}"


