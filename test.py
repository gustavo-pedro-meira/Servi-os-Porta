import requests

url = "https://servicodados.ibge.gov.br/api/v1/localidades/distritos"
response = requests.get(url)

if response.status_code == 200:
    dados = response.json()
    
    for distrito in dados:
        nome_distrito = distrito["nome"]
        sigla_estado = distrito["municipio"]["microrregiao"]["mesorregiao"]["UF"]["sigla"]
        print(f"{nome_distrito} - {sigla_estado}")
        
else:
    print(f"Erro ao acessar a API: {response.status_code}")
