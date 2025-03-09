from rest_framework import routers
from api.viewsets import ProfissionalViewSet, ProfissaoViewSet

profissional_router = routers.DefaultRouter()
profissional_router.register('profissional', ProfissionalViewSet)

profissao_router = routers.DefaultRouter()
profissao_router.register('profissao', ProfissaoViewSet)