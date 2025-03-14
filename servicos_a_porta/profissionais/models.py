from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Profissao(models.Model):
    nome = models.CharField(max_length=100)
    descricao = models.TextField()
    
class Profissional(User):
    descricao = models.TextField()
    dataInicio = models.DateField()
    idProfissao = models.ForeignKey('Profissao', on_delete=models.CASCADE, related_name='profissionais')

    class Meta:
        verbose_name = "Profissional"
        verbose_name_plural = "Profissionais"
        

