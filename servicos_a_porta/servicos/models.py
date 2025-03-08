from django.db import models
from profissionais.models import Profissional
from clientes.models import Cliente

# Create your models here.
class Servico(models.Model):
    nome = models.CharField(max_length=100)
    descricao = models.TextField()
    preco = models.DecimalField(max_digits=5, decimal_places=2)
    idCliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, related_name='cliente_servicos')
    idProfissional = models.ForeignKey(Profissional, on_delete=models.CASCADE, related_name='profissional_servicos')