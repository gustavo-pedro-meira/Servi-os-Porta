from django.test import TestCase
from rest_framework import status
from clientes.models import Cliente
import datetime

# Create your tests here.
class ClienteTesteCase(TestCase):
    def setUp(self):
        #Objeto cliente
        self.cliente = Cliente.objects.create_user(
            username="gustavo",
            password="guga2004#",
            nome="João Teste",
            cpf="10625523423",
            dataNascimento=datetime.date(2020, 1, 1),
            numero="83998397275",
            email="gustavomeira@ads.fiponline.edu.br"
        )
        
    def test_listar_cliente(self):
        self.client.login(username="gustavo", password="guga2004#")
        url = f"/api/clientes/{self.cliente.id}/"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], "gustavo")
        
    def test_cpf_invalido_cliente(self):
        self.client.login(username="gustavo", password="guga2004#")
        url = f"/api/clientes/"
        data = {
            "username": "gustavinhao",
            "password": "Guga2004#",
            "nome": "Gustavo",
            "cpf": "10625523425",
            "dataNascimento": datetime.date(2000, 1, 1),
            "numero": "83998397274",
            "email": "cursor341@gmail.com"
        }
        self.response = self.client.post(url, data, format="json")
        self.assertEqual(self.response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(self.response.data["cpf"], "CPF Inválido.")
    
    def test_email_invalido_cliente(self):
        self.client.login(username="gustavo", password="guga2004#")
        url = f"/api/clientes/"
        data = {
            "username": "gustavinhao",
            "password": "Guga2004#",
            "nome": "Gustavo",
            "cpf": "10625523423",
            "dataNascimento": datetime.date(2000, 1, 1),
            "numero": "83998397274",
            "email": "curso9383ebsb@gmail.com"
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['email'], "Email Inválido.")
        
