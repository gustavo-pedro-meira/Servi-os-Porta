from rest_framework import routers
from api.viewsets import ClienteViewSet, EnderecoViewSet

cliente_router = routers.DefaultRouter()
cliente_router.register('cliente', ClienteViewSet)

endereco_router = routers.DefaultRouter()
endereco_router.register('endereco', EnderecoViewSet)