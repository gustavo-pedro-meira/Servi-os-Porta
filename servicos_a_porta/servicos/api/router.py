from rest_framework import routers
from api.viewsets import ServicosViewSet

servicos_router = routers.DefaultRouter()
servicos_router.register('cliente', ServicosViewSet)