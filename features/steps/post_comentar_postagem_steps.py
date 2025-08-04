from behave import given, when, then
from rest_framework.test import APIClient
from posts.models import PostServico, ComentarioPost
from servicos.models import Servico
from profissionais.models import Profissional, Profissao

client = APIClient()

@given("eu irei fazer comentário em uma Postagem")
def step_given_realizar_comentario(context):
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
    response_post = PostServico.objects.create(titulo=context.titulo, profissional=context.profissional)
    #Objeto Comentario
    context.conteudo = "Excelente profissional"
    context.post = response_post
    context.profissional  = response_profissional
    response_comentario = ComentarioPost.objects.create(conteudo=context.conteudo, post=context.post, profissional=context.profissional)
    context.comentario_id = response_comentario.id
    
@when("eu realizo o seguinte comentário 'Excelente profissional'")
def step_when_realizo_comentario(context):
    url = "http://127.0.0.1:8000/api/comentarios/"
    data = {"conteudo": context.conteudo, "post": context.post.id, "profissional": context.profissional.id}
    response = client.post(url, data, format="json")
    context.response = response
    
@then("o comentario é realizado com sucesso")
def step_then_comentario_publicado(context):
    url = f"http://127.0.0.1:8000/api/comentarios/{context.comentario_id}/"
    response_get = client.get(url, format="json")
    assert response_get.status_code == 200, f"Comentario é realizado"