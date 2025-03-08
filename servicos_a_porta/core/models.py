from django.db import models

# Create your models here.
class Pessoa(models.Model):
    nome = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    dataNascimento = models.DateField()
    cpf = models.CharField(max_length=11, primary_key=True)
    
    class Meta:
        abstract = True