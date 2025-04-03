from behave import given, when, then
from rest_framework.test import APIClient
from posts.models import PostServico, ComentarioPost
from servicos.models import Servico
from profissionais.models import Profissional, Profissao

client = APIClient()
    
@given("eu realizei um serviço e vou realizar um post desse serviço")
def step_given_realizar_postagem(context):
    #Objeto serviço
    context.titulo = "Serviço na casa de Gustavo"
    context.preco = 100
    servico = Servico.objects.create(nome=context.titulo, preco=context.preco)
    #Objeto profissão
    context.nome_profissao = "Pedreiro"
    context.descricao_profissao = "Obra por amor"
    profissao = Profissao.objects.create(nome=context.nome_profissao, descricao=context.descricao_profissao)
    #Objeto profissional
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
    #Objeto post
    context.titulo = "Serviço na casa de Gustavo"
    context.profissional = response_profissional
    context.idServico = servico
    response = PostServico.objects.create(
        titulo=context.titulo,
        profissional=context.profissional,
        idServico=context.idServico
    )
    context.postagem_id = response.id

@when("eu faço a publicação")
def step_when_fazer_postagem(context):
    url = "http://127.0.0.1:8000/api/posts/"
    data = {"titulo": context.titulo, "profissional": context.profissional.id, "idServico": context.idServico.id}
    response = client.post(url, data, format="json")
    context.response = response
    
@then("O post é publicado")
def step_then_postagem_publicada(context):
    url = f"http://127.0.0.1:8000/api/posts/{context.postagem_id}/"
    response_get = client.get(url, format="json")
    assert response_get.status_code == 200, f"Postagem realizada"