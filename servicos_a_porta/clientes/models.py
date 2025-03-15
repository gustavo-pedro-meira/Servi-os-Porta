from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Endereco(models.Model):
    rua = models.CharField(max_length=50)
    numero = models.CharField(max_length=30)
    cidade = models.CharField(max_length=50)
    estado = models.CharField(max_length=20)
    cep = models.CharField(max_length=8)
    cliente = models.ForeignKey('Cliente', on_delete=models.CASCADE, related_name='enderecos')
     
class Cliente(User):
    biografia = models.TextField()
    nome = models.CharField(max_length=100)
    dataNascimento = models.DateField(default="2023-03-03")
    cpf = models.CharField(max_length=11)
    
    class Meta:
        verbose_name = "Cliente"
        verbose_name_plural = "Clientes"
