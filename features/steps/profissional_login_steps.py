from behave import given, when, then
from rest_framework.test import APIClient
from profissionais.models import Profissional, Profissao

client = APIClient()

@given("eu sou um profissional registrado, com  username 'gustavo' e password 'guga200#4'")
def step_given_profissional_registrado(context):
    context.nome_profissao = "Pedreiro"
    context.descricao_profissao = "Obra por amor"
    profissao = Profissao.objects.create(nome=context.nome_profissao, descricao=context.descricao_profissao)
    context.username = "gustavo"
    context.password = "guga2#077"
    context.cep = "58695000"
    context.nome = "Gustavo"
    context.cpf = "10625523423"
    context.descricao = "Teste"
    context.dataInicio = "2023-01-10"
    context.idProfissao = profissao
    context.numero = "83998397275"
    context.email = "gustavomeira@ads.fiponline.edu.br"
    response_profissional = Profissional.objects.create_user(
        username=context.username,
        password=context.password,
        cep=context.cep,
        nome=context.nome,
        cpf=context.cpf,
        descricao=context.descricao,
        dataInicio=context.dataInicio,
        idProfissao=context.idProfissao,
        numero=context.numero,
        email=context.email
    )
    context.profissional_id = response_profissional.id
    
@when("eu faço uma requisição POST para o endpoint de login com o meu username e o password")
def step_when_faz_login(context):
    url = "http://127.0.0.1:8000/api/token/"
    data = {"username": context.username, "password": context.password}
    response = client.post(url, data, format='json')
    context.response = response
    
@then("eu recebo um token de autenticação")
def step_then_receber_token_autenticacao(context):
    assert context.response.status_code == 200, f"Erro: Status {context.response.status_code}"
