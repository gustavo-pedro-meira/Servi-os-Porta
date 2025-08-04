from django.contrib.staticfiles.testing import StaticLiveServerTestCase
from django.contrib.auth.models import User
from selenium import webdriver
from selenium.webdriver.edge.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.edge.options import Options as EdgeOptions
from webdriver_manager.microsoft import EdgeChromiumDriverManager
from selenium.webdriver.common.keys import Keys
import time

class TesteSelenium(StaticLiveServerTestCase):
    def setUp(self):
        self.username = 'gustavaoo'
        self.password = 'Guga2004#'
        self.user = User.objects.create_user(username=self.username, password=self.password)
        
        edge_options = EdgeOptions()
        edge_options.add_argument('--no-sandbox')
        edge_options.add_argument('--disable-dev-shm-usage')
        edge_options.add_argument('--disable-gpu')
        edge_options.add_argument('--disable-software-rasterizer')
        # edge_options.add_argument('--headless') 
        
        self.browser = webdriver.Edge(
            service=Service(EdgeChromiumDriverManager().install()),
            options=edge_options
        )
        self.browser.implicitly_wait(5)
        self.frontend_url = 'http://localhost:5173'

    def click_with_delay(self, by, value):
        element = WebDriverWait(self.browser, 5).until(
            EC.element_to_be_clickable((by, value))
        )
        element.click()
        

    def realizar_login(self):
        self.browser.get(f'{self.frontend_url}/login')

        username_input = WebDriverWait(self.browser, 5).until(
            EC.presence_of_element_located((By.ID, "username"))
        )
        
        password_input = WebDriverWait(self.browser, 5).until(
            EC.presence_of_element_located((By.ID, "password"))
        )
        

        username_input.send_keys(self.username)
        
        password_input.send_keys(self.password)

        self.click_with_delay(By.ID, "loginbotao")

        WebDriverWait(self.browser, 5).until(
            EC.url_contains("http://localhost:5173/")
        )

        WebDriverWait(self.browser, 5).until(
            EC.presence_of_element_located((By.ID, 'mainimage'))
        )

    def test_login_usuario(self):
        self.realizar_login()
        self.assertTrue(
            self.browser.current_url.endswith('/'),
            f"Esperava URL terminando em '/', mas obteve {self.browser.current_url}"
        )

    def test_clicar_comofunciona(self):
        self.realizar_login()

        
        self.click_with_delay(By.ID, 'sobre')

        WebDriverWait(self.browser, 5).until(
            EC.url_contains("http://localhost:5173/")
        )

        funciona_info = WebDriverWait(self.browser, 5).until(
            EC.presence_of_element_located((By.ID, 'funciona_info'))
        )

        self.assertTrue(
            self.browser.current_url.endswith('/'),
            f"Esperava URL terminando em '/', mas obteve {self.browser.current_url}"
        )
        self.assertTrue(
            funciona_info.is_displayed(),
            "Elemento 'funciona_info' não está visível na página de posts"
        )

    def test_abrir_posts(self):
        self.realizar_login()

        
        self.click_with_delay(By.ID, 'vermaisbotao')

        
        WebDriverWait(self.browser, 5).until(
            EC.url_contains("http://localhost:5173/posts")
        )

        
        nav_content = WebDriverWait(self.browser, 5).until(
            EC.presence_of_element_located((By.ID, 'navcontent'))
        )

        self.assertTrue(
            self.browser.current_url.endswith('/posts'),
            f"Esperava URL terminando em '/posts', mas obteve {self.browser.current_url}"
        )
        self.assertTrue(
            nav_content.is_displayed(),
            "Elemento 'navcontent' não está visível na página de posts"
        )

    def test_acessar_servico(self):
        self.realizar_login()

        
        self.click_with_delay(By.ID, 'caixa_busca')

        
        caixa_input = WebDriverWait(self.browser, 5).until(
            EC.presence_of_element_located((By.ID, "caixa_busca"))
        )

        
        caixa_input.send_keys("Limpeza Doméstica", Keys.ENTER)

        
        WebDriverWait(self.browser, 5).until(
            EC.url_contains("http://localhost:5173/listar")
        )

        
        self.assertTrue(
            self.browser.current_url.endswith('/listar'),
            f"Esperava URL terminando em '/listar', mas obteve {self.browser.current_url}"
        )

    def test_buscar_profissionais_cep(self):
        self.realizar_login()

        
        self.click_with_delay(By.ID, 'button_contratar_profissional')

        
        WebDriverWait(self.browser, 5).until(
            EC.url_contains("http://localhost:5173/listar")
        )

        
        caixa_input = WebDriverWait(self.browser, 5).until(
            EC.presence_of_element_located((By.ID, "input_cep"))
        )

        
        caixa_input.send_keys("58695000")

        
        self.click_with_delay(By.ID, 'buscar_button')

        
        self.assertTrue(
            self.browser.current_url.endswith('/listar'),
            f"Esperava URL terminando em '/listar', mas obteve {self.browser.current_url}"
        )

    def test_ver_bio_profissional(self):
        self.test_buscar_profissionais_cep()

        time.sleep(2)
        self.click_with_delay(By.ID, 'perfil')

        time.sleep(2)
        WebDriverWait(self.browser, 5).until(
            EC.url_contains("http://localhost:5173/bio")
        )

        time.sleep(1)
        self.assertTrue(
            self.browser.current_url.endswith('/bio/96'),
            f"Esperava URL terminando em '/bio', mas obteve {self.browser.current_url}"
        )

    def tearDown(self):
        self.browser.quit()