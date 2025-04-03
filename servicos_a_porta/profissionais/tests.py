from django.test import TestCase
from rest_framework import status
from profissionais.models import Profissional, Profissao
# from profissionais.api.serializers import ProfissionalSerializer
import datetime

# Create your tests here.
class ProfissionalTesteCase(TestCase):
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
            cpf="10625523424",
            descricao="Profissional experiente",
            dataInicio=datetime.date(2020, 1, 1),
            idProfissao=self.profissao,
            numero="83998397275",
            email="gustavomeira@ads.fiponline.edu.br"
        )
        
    def test_listar_profissional(self):
        self.client.login(username="gustavo", password="guga2004#")
        url = f"/api/profissionais/{self.profissional.id}/"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], "gustavo")
        
    def test_cpf_invalido_profissional(self):
        self.client.login(username="gustavo", password="guga2004#")
        url = f"/api/profissionais/"
        data = {
            "username": "gusta",
            "password": "guga2004#",
            "cep": "58695000",
            "nome": "Gustavo",
            "cpf": "12345678900",
            "descricao": "Pedreiro",
            "dataInicio": datetime.date(2020, 1, 1),
            "idProfissao": self.profissao.id,
            "numero": "83998397274",
            "email": "gustavo16pedro@gmail.com"
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['cpf'], "CPF Inválido.")
        
    def test_cep_errado_profissional(self):
        self.client.login(username="gustavo", password="guga2004#")
        url = f"/api/profissionais/"
        data = {
            "username": "gustainho",
            "password": "guga2004#",
            "cep": "58695001",
            "nome": "Gustavo",
            "cpf": "10625523423",
            "descricao": "Pedreiro",
            "dataInicio": datetime.date(2020, 1, 1),
            "idProfissao": self.profissao.id,
            "numero": "83998397274",
            "email": "gustavo16pe7894152@gmail.com"
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['cep'], "CEP não encontrado.")
    
    def test_email_invalido_profissional(self):
        self.client.login(username="gustavo", password="guga2004#")
        url = f"/api/profissionais/"
        data = {
            "username": "gustavinho",
            "password": "guga2004#",
            "cep": "58695000",
            "nome": "Gustavo",
            "cpf": "10625523423",
            "descricao": "Pedreiro",
            "dataInicio": datetime.date(2020, 1, 1),
            "idProfissao": self.profissao.id,
            "numero": "83998397274",
            "email": "gustavo16pedro787878@gmail.com"
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['email'], "Email Inválido.")
        
