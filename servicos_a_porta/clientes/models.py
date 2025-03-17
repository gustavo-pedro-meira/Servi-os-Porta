from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

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
    cidade = models.CharField(max_length=50)
    estado = models.CharField(max_length=20)
    cep = models.CharField(max_length=8)
    cliente = models.ForeignKey('Cliente', on_delete=models.CASCADE, related_name='enderecos')
    
    def __str__(self):
        return f"{self.rua} - {self.cliente.nome}"
     
class Cliente(User, BaseModel):
    biografia = models.TextField()
    nome = models.CharField(max_length=100)
    dataNascimento = models.DateField(default="2023-03-03")
    cpf = models.CharField(max_length=11)

    class Meta:
        verbose_name = "Cliente"
        verbose_name_plural = "Clientes"
        
    def __str__(self):
        return f"{self.nome}"


