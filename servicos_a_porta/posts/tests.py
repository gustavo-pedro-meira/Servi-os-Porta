from django.test import TestCase
from rest_framework import status
from profissionais.models import Profissional, Profissao
from clientes.models import Cliente
from servicos.models import Servico
from posts.models import PostServico, ComentarioPost
import datetime

# Create your tests here.
class PostTesteCase(TestCase):
    def setUp(self):
        #Objeto profissão
        self.profissao = Profissao.objects.create(
            nome="Pedreiro",
            descricao="Obra por amor"
        )
        #Objeto profissional
        self.profissional = Profissional.objects.create_user(
            username="gustavo",
            password="guga2004#",
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
            biografia= "teste",
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

    def test_postar_publicacao_postServico(self):
        self.client.login(username="gustavo", password="guga2004#")
        url = "/api/posts/"
        self.post_data = {
            "titulo": "Serviço hoje pela manhã na casa de Gabriel, reboquei a parede e...",
            "dataCriacao": "2020-01-01",
            "profissional": self.profissional.id,
            "servico": self.servico.id
        }
        self.response = self.client.post(url, self.post_data, format="json")
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)
        
    def test_get_publicacao_postServico(self):
        self.client.login(username="gustavo", password="guga2004#")
        url = f"/api/posts/{self.servico.id}/"
        self.response = self.client.get(url, format="json")
        self.assertEqual(self.response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.response.data['titulo'], "Serviço hoje pela manhã na casa de Gabriel, reboquei a parede e...")
        
    def test_atualizar_publicacao_postServico(self):
        self.client.login(username="gustavo", password="guga2004#")
        url = f"/api/posts/{self.servico.id}/"
        self.post_put = {
            "titulo": "Serviço hoje pela manhã na casa de Gabriel...",
            "dataCriacao": "2020-01-01",
            "profissional": self.profissional.id,
            "servico": self.servico.id
        }
        self.response = self.client.put(url, self.post_put, content_type="application/json")
        self.assertEqual(self.response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.response.data['titulo'], "Serviço hoje pela manhã na casa de Gabriel...")
    
    def test_deletar_publicacao_postServico(self):
        self.client.login(username="gustavo", password="guga2004#")
        url = f"/api/posts/{self.servico.id}/"
        self.response = self.client.delete(url, content_type="application/json")
        self.assertEqual(self.response.status_code, status.HTTP_204_NO_CONTENT)
        
    def test_get_post_deletado_postServico(self):
        self.test_deletar_publicacao_postServico()
        self.client.login(username="gustavo", password="guga2004#")
        url = f'/api/posts/{self.servico.id}/'
        self.response = self.client.get(url, format="json")
        self.assertEqual(self.response.status_code, status.HTTP_404_NOT_FOUND)

