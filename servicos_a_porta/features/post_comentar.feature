Feature: Comentar em um Serviço
    Achei o serviço bem legal e vou realizar um 
    Comentário elogiando o profissional

    Scenario: Comentar em uma Postagem
        Given eu irei fazer comentário em uma Postagem
        When eu realizo o seguinte comentário 'Excelente profissional'
        Then o comentario é realizado com sucesso