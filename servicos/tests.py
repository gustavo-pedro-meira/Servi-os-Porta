from django.test import TestCase
from rest_framework import status
from profissionais.models import Profissional, Profissao
from clientes.models import Cliente
from servicos.models import Servico
from posts.models import PostServico, ComentarioPost
import datetime

# Create your tests here.
class ServicoTesteCase(TestCase):
    def setUp(self):
        #Objeto profissão
        self.profissao = Profissao.objects.create(
            nome="Pedreiro",
            descricao="Obra por amor"
        )
        #Objeto profissional
        self.profissional = Profissional.objects.create_user(
            username="gustavo",
            password="Guga2004#",
            cep="58695000",
            nome="João Teste",
            cpf="10625523423",
            descricao="Profissional experiente",
            dataInicio=datetime.date(2020, 1, 1),
            idProfissao=self.profissao,
            numero="83998397275",
            email="gustavomeira@ads.fiponline.edu.br"
        )
        #Objeto Cliente
        self.cliente = Cliente.objects.create_user(
            username= "gabriel14",
            password= "guga2004#",
            email= "gustavo518pedroca@gmail.com",
            nome= "Gabriel",
            dataNascimento= datetime.date(2020, 1, 1),
            cpf= "10625523423",
            numero= "83998397275"
        )
        #Objeto Serviço
        self.servico = Servico.objects.create(
            nome= "Serviço na casa de Gabriel",
            descricao= "Teste",
            preco= 100,
        )
        #objeto Post
        self.post = PostServico.objects.create(
            titulo= "Serviço hoje pela manhã na casa de Gabriel, reboquei a parede e...",
            dataCriacao=datetime.date(2020, 1, 1)
        )
        
    def test_adicionar_servico(self):
        self.client.login(username="gusta", password="guga2004")
        url = "/api/servicos/"
        self.data_servico = {
            "nome": "Serviço de reboco",
            "descricao": "Teste",
            "preco": 100
        }
        self.response = self.client.post(url, self.data_servico, format="json")
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)
        
    def test_get_servico(self):
        self.client.login(username="gusta", password="guga2004")
        url = f"/api/servicos/{self.servico.id}/"
        self.response = self.client.get(url, format="json")
        self.assertEqual(self.response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.response.data["nome"], "Serviço na casa de Gabriel")
        
    def test_atualizar_servico(self):
        self.client.login(username="gusta", password="guga2004")
        url = f"/api/servicos/{self.servico.id}/"
        self.data_att = {
            "nome": "Serviço atualizado",
            "descricao": "Teste",
            "preco": 100
        }
        self.response = self.client.patch(url, self.data_att, content_type="application/json")
        self.assertEqual(self.response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.response.data["nome"], "Serviço atualizado")
        
    def test_deletar_servico(self):
        self.client.login(username="gusta", password="guga2004")
        url = f"/api/servicos/{self.servico.id}/"
        self.response = self.client.delete(url, content_type="application/json")
        self.assertEqual(self.response.status_code, status.HTTP_204_NO_CONTENT)