Feature: Postagem de Serviço do Profissional
    Como um Profissional, realizei um serviço e quero fazer uma Postagem
    Do serviço para que pessoas possam ver e me contratar para realizar
    Um serviço em seu estabelecimento

    Scenario: Criar uma Postagem do Serviço Realizado
        Given eu realizei um serviço e vou realizar um post desse serviço
        When eu faço a publicação
        Then O post é publicado