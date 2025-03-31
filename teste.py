caracteres = ["!","@","#","$","%","^","&","*"]
contador = 0
senha = input("Digite a Senha: ")
if not any(c in senha for c in caracteres):
    print("Sem Caracteres")