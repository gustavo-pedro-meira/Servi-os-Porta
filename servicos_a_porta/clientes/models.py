from django.db import models
from core.models import Pessoa

# Create your models here.
class Endereco(models.Model):
    rua = models.CharField(max_length=50)
    numero = models.CharField(max_length=30)
    cidade = models.CharField(max_length=50)
    estado = models.CharField(max_length=20)
    cep = models.CharField(max_length=8)
    cliente = models.ForeignKey('Cliente', on_delete=models.CASCADE, related_name='enderecos')
     
class Cliente(Pessoa):
    biografia = models.TextField()
