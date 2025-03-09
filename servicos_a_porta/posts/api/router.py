from rest_framework import routers
from api.viewsets import PostViewSet, ComentarioViewSet

post_router = routers.DefaultRouter()
post_router.register('post_servico', PostViewSet)

comentario_router = routers.DefaultRouter()
comentario_router.register('comentario', ComentarioViewSet)