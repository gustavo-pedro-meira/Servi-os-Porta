from django.db import models
from servicos.models import Servico

# Create your models here.
class PostServico(models.Model):
    titulo = models.TextField()
    conteudo = models.ImageField()
    dataCriacao = models.DateTimeField(auto_now_add=True)
    idServico = models.OneToOneField(Servico, on_delete=models.CASCADE)

class ComentarioPost(models.Model):
    conteudo = models.TextField()
    dataCriacao = models.DateTimeField(auto_now_add=True)
    Post = models.OneToOneField(PostServico, on_delete=models.CASCADE)