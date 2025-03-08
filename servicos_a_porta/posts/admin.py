from django.contrib import admin
from .models import PostServico, ComentarioPost

# Register your models here.
admin.site.register(PostServico)
admin.site.register(ComentarioPost)