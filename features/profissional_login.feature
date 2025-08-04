Feature: Autenticação do Profissional
    Como usuário de Profissional cadastrado, quero fazer login
    e receber o token de autenticação

    Scenario: Login bem-sucedido
        Given eu sou um profissional registrado, com  username 'gustavo' e password 'guga200#4'
        When eu faço uma requisição POST para o endpoint de login com o meu username e o password
        Then eu recebo um token de autenticação

