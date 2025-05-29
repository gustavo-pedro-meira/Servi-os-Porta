
from behave import given, when, then
from rest_framework.test import APIClient
from posts.models import PostServico
from servicos.models import Servico
from profissionais.models import Profissional, Profissao

client = APIClient()

@given("eu realizei um serviço e vou realizar um post desse serviço")
def step_given_realizar_postagem(context):
    context.nome_servico = "Serviço na casa de Gustavo"
    context.preco_servico = 100
    servico = Servico.objects.create(nome=context.nome_servico, preco=context.preco_servico)

    context.nome_profissao = "Pedreiro"
    context.descricao_profissao = "Obra por amor"
    profissao = Profissao.objects.create(nome=context.nome_profissao, descricao=context.descricao_profissao)

    context.username = "gustav_post_test"
    context.password = "Guga2004#"
    context.cep = "58695000"
    context.nome_profissional = "Gustavo Postador"
    context.cpf = "10625523423"
    context.descricao_profissional = "Teste de postagem"
    context.data_nascimento_profissional = "1990-01-01"
    context.data_inicio_profissional = "2023-01-10"
    context.numero_profissional = "83998397275"
    context.email_profissional = "gustavopostador@example.com"

    context.profissional_user = Profissional.objects.create_user(
        username=context.username,
        password=context.password,
        cep=context.cep,
        nome=context.nome_profissional,
        cpf=context.cpf,
        descricao=context.descricao_profissional,
        dataNascimento=context.data_nascimento_profissional,
        dataInicio=context.data_inicio_profissional,
        idProfissao=profissao,
        numero=context.numero_profissional,
        email=context.email_profissional
    )

    context.titulo_post = "Excelente Serviço de Alvenaria Realizado"

@when("eu faço a publicação")
def step_when_fazer_postagem(context):
    client.force_authenticate(user=context.profissional_user)
    url = "/api/posts/"
    data = {"titulo": context.titulo_post}
    response = client.post(url, data, format="json")
    context.response = response

@then("O post é publicado")
def step_then_postagem_publicada(context):
    assert context.response.status_code == 201, (
        f"Esperado status code 201 (Created), mas foi {context.response.status_code}. Erro: {context.response.data}"
    )
    new_post_id = context.response.data.get('id')
    assert new_post_id is not None, "A resposta da API não incluiu um ID para o novo post."
    try:
        post_criado = PostServico.objects.get(id=new_post_id)
        assert post_criado.titulo == context.titulo_post
        assert post_criado.profissional == context.profissional_user
    except PostServico.DoesNotExist:
        assert False, f"O post com ID {new_post_id} não foi encontrado no banco de dados."
    client.force_authenticate(user=None)