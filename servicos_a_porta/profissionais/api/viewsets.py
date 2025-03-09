from rest_framework import viewsets
from profissionais import models
from profissionais.api import serializers

class ProfissionalViewSet(viewsets.ModelViewSet):
    queryset = models.Profissional.objects.all()
    serializer_class = serializers.ProfissionalSerializer
    
class ProfissaoViewSet(viewsets.ModelViewSet):
    queryset = models.Profissao.objects.all()
    serializer_class = serializers.ProfissaoSerializer