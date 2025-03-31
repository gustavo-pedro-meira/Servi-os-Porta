Feature: Autenticação do Profissional
    Como usuário de Profissional cadastrado, quero fazer login
    Para acessar as minhas postagens dos serviços

    Scenario: Fazer o login bem-sucecido
        Given eu tenho uma conta com username "gusta" e o password "guga2004"
        When eu faço a tentativa de login 
        Then eu tenho que ser autenticado com sucesso

Feature: Fazer uma Postagem
    Como um Profissional, realizei um serviço e quero fazer uma Postagem
    Do serviço para que pessoas possam ver e me contratar para realizar
    Um serviço em seu estabelecimento

    Scenario: Criar uma Postagem do Serviço Realizado
        Given eu realizei um serviço e vou realizar uma postagem desse serviço
        And e tenho permissão para postar, pois, sou um Profissional
        When eu faço a publicação, definindo o texto e uma imagem do serviço
        Then O post tem que ser publicado

Feature: Atualizar o CEP 
    Sou um profissional e preciso mudar o CEP, pois, mudei de cidade
    E os clientes precisam saber que mudei de cidade para ficarem informados

    Scenario: Mudar o CEP do Profissional
        Given sou um Profissional e mudei de cidade, preciso atualizar o meu CEP
        And e meus clientes precisam ficarem cientes que mudei de cidade
        When eu acesso meu perfil, modifico apenas o CEP para definir o estado e a cidade
        And e automaticamente o sistema define o estado e a cidade na qual estou morando
        Then a minha localização tem que ser modificada, assim, alterando o estado e a cidade que mudei
