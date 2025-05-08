from django.db import models
from servicos.models import Servico
from django.utils import timezone
from django.contrib.auth.models import User
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
    titulo = models.TextField(null=True, blank=True)
    conteudo = models.ImageField(upload_to='imagem/', null=True, blank=True)
    dataCriacao = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    profissional = models.ForeignKey(Profissional, on_delete=models.CASCADE, blank=True, null=True)
    curtida = models.BigIntegerField(default=0, blank=True, null=True)
    
    def __str__(self):
        return self.titulo or "Publicação sem título"
    

class ComentarioPost(BaseModel):
    conteudo = models.TextField()
    dataCriacao = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    post = models.OneToOneField(PostServico, on_delete=models.CASCADE, blank=True, null=True)
    profissional = models.ForeignKey(Profissional, on_delete=models.CASCADE, blank=True, null=True)
    
    def __str__(self):
        return self.conteudo
    

class Curtida(models.Model):
    post = models.ForeignKey(PostServico, on_delete=models.CASCADE, related_name='curtidas')
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='curtidas')
    data_curtida = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('post', 'usuario')

    def __str__(self):
        return f"{self.usuario.username} curtiu {self.post.titulo}"