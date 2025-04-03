from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import requests
from rest_framework import serializers

# Create your models here.
class BaseModelQuerySet(models.QuerySet):
    def delete(self):
        self.update(deleted_at=timezone.now() , is_active=False)

class BaseManager(models.Manager):
    def get_queryset (self):
        return BaseModelQuerySet( self.model, using=self._db).filter( deleted_at__isnull =True, is_active=True)

class BaseModel(models.Model):
    created_at = models.DateTimeField( auto_now_add =True)
    updated_at = models.DateTimeField( auto_now=True)
    deleted_at = models.DateTimeField( editable=False, blank=True, null=True)
    is_active = models.BooleanField( editable=False, default=True)
    
    objects = BaseManager()
    
    class Meta:
        abstract = True
    
    def delete(self, **kwargs):
        self.is_active = False
        self.deleted_at = timezone.now()
        self.save()
        
    def hard_delete (self, **kwargs):
        super(BaseModel, self).delete(**kwargs)

class Endereco(BaseModel):
    rua = models.CharField(max_length=50)
    numero = models.CharField(max_length=30)
    cep = models.CharField(max_length=8)
    cidade = models.CharField(max_length=100, blank=True, null=True)
    estado = models.CharField(max_length=100, blank=True, null=True)
    cliente = models.ForeignKey('Cliente', on_delete=models.CASCADE, related_name='enderecos')
    
    def CepAutomatico(self):
        url = f"https://viacep.com.br/ws/{self.cep}/json/"
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            if 'erro' not in data:
                self.estado = data.get('uf')
                self.cidade = data.get('localidade')
            else:
                raise ValidationError({'cep': 'CEP não encontrado.'})
        else:
            raise ValidationError({'cep': 'Erro ao consultar o CEP.'})
    
    def clean(self):
        self.CepAutomatico()
        
    
    def __str__(self):
        return f"{self.rua} - {self.cliente.nome}"
     
class Cliente(User):
    biografia = models.TextField()
    nome = models.CharField(max_length=100)
    dataNascimento = models.DateField(default="2023-03-03")
    cpf = models.CharField(max_length=11)
    numero = models.CharField(max_length=11, unique=True)
    
    def ValidaEmail(self):
        url = f"https://emailvalidation.abstractapi.com/v1/?api_key=c52cafa9304f4d418f4f3651ae02e4c8&email={self.email}"
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


