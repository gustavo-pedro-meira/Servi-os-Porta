from django.db import models
from core.models import Pessoa

# Create your models here.
class Profissao(models.Model):
    nome = models.CharField(max_length=100)
    descricao = models.TextField()
    
class Profissional(Pessoa):
    descricao = models.TextField()
    dataInicio = models.DateField()
    idProfissao = models.ForeignKey('Profissao', on_delete=models.CASCADE, related_name='profissionais')
    