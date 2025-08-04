Feature: Atualizar o CEP 
    Sou um profissional e preciso mudar o CEP, pois, mudei de cidade
    E os clientes precisam saber que mudei de cidade para ficarem informados

    Scenario: Mudar o CEP do Profissional
        Given sou um Profissional, e preciso atualizar o meu CEP da minha conta
        When eu faço o login como profissional
        And e modifico apenas o CEP para definir o estado e a cidade
        Then e a minha localização é modificada, alterando o estado e a cidade que mudei