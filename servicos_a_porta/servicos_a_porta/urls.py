"""
URL configuration for servicos_a_porta project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from rest_framework import routers, permissions
from clientes.api.viewsets import ClienteViewSet, EnderecoViewSet
from posts.api.viewsets import PostViewSet, ComentarioViewSet
from profissionais.api.viewsets import ProfissaoViewSet, ProfissionalViewSet
from servicos.api.viewsets import ServicoViewSet
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

router = routers.DefaultRouter()
router.register('clientes', ClienteViewSet)
router.register('enderecos', EnderecoViewSet)
router.register('posts', PostViewSet)
router.register('comentarios', ComentarioViewSet)
router.register('profissoes', ProfissaoViewSet)
router.register('profissionais', ProfissionalViewSet)
router.register('servicos', ServicoViewSet)

schema_view = get_schema_view(
    openapi.Info(
        title="API do Sistema Serviços à Porta",
        default_version='v1',
        description="Implementando o Swagger no sistema, para documentar as APIs.",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,)
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/', include('clientes.urls')),
    path('api/token/', TokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('api/token/refresh/', TokenObtainPairView.as_view(), name='token_refresh'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
