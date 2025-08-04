from behave import given, when, then
from rest_framework.test import APIClient
from profissionais.models import Profissional, Profissao

client = APIClient()
profissional = Profissional
    
@given("sou um Profissional, e preciso atualizar o meu CEP da minha conta")
def step_given_alterar_cep(context):
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
    
@when("eu faço o login como profissional")
def step_when_fazer_login(context):
    url = "http://127.0.0.1:8000/api/token/"
    data = {"username": context.username, "password": context.password, "cep": context.cep}
    response_login = client.post(url, data, format="json")
    context.response_login = response_login
    
@when("e modifico apenas o CEP para definir o estado e a cidade")
def step_altero_cep(context):
    url = f"http://127.0.0.1:8000/api/profissionais/{context.profissional_id}/"
    context.cep_novo = "01001000"
    data = {"cep": context.cep_novo, "password": context.password}
    response_alterar_cep = client.patch(url, data, format="json")
    context.response_alterar_cep = response_alterar_cep
    
@then("e a minha localização é modificada, alterando o estado e a cidade que mudei")
def step_then_altera_cep(context):
    url = f"http://127.0.0.1:8000/api/profissionais/?ordering=nome/"
    response_get = client.get(url, format="json")
    assert response_get.status_code == 200, f"CEP atualizado encontrado: {response_get.data['cep']}"