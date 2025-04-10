from django.db import models
from servicos.models import Servico
from django.utils import timezone
from profissionais.models import Profissional


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

class PostServico(BaseModel):
    titulo = models.TextField()
    conteudo = models.ImageField(upload_to='imagem/', null=True, blank=True)
    dataCriacao = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    profissional = models.ForeignKey(Profissional, on_delete=models.CASCADE, blank=True, null=True)
    idServico = models.ForeignKey(Servico, on_delete=models.CASCADE, blank=True, null=True)
    curtidas = models.BigIntegerField(default=0, blank=True, null=True)
    
    def __str__(self):
        return self.profissional
    

class ComentarioPost(BaseModel):
    conteudo = models.TextField()
    dataCriacao = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    post = models.OneToOneField(PostServico, on_delete=models.CASCADE, blank=True, null=True)
    curtidas = models.BigIntegerField(default=0, blank=True, null=True)
    profissional = models.ForeignKey(Profissional, on_delete=models.CASCADE, blank=True, null=True)
    
    def __str__(self):
        return self.conteudo
    