from django.contrib.staticfiles.testing import StaticLiveServerTestCase
from django.contrib.auth.models import User
from selenium import webdriver
from selenium.webdriver.edge.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.edge.options import Options as EdgeOptions
from webdriver_manager.microsoft import EdgeChromiumDriverManager
import time  # Importação adicionada para usar time.sleep()

class TesteSelenium(StaticLiveServerTestCase):
    def setUp(self):
        self.username = 'gustavaoo'
        self.password = 'Guga2004#'
        self.user = User.objects.create_user(username=self.username, password=self.password)
        
        edge_options = EdgeOptions()
        edge_options.add_argument('--no-sandbox')
        edge_options.add_argument('--disable-dev-shm-usage')
        edge_options.add_argument('--disable-gpu')  # Desativa aceleração de hardware
        edge_options.add_argument('--disable-software-rasterizer')  # Desativa rasterização por software
        
        self.browser = webdriver.Edge(
            service=Service(EdgeChromiumDriverManager().install()),
            options=edge_options
        )
        self.browser.implicitly_wait(10)
        self.frontend_url = 'http://localhost:5173'

    # Método auxiliar para cliques com atraso
    def click_with_delay(self, by, value):
        element = WebDriverWait(self.browser, 50).until(
            EC.element_to_be_clickable((by, value))
        )
        element.click()
        time.sleep(5)  # Atraso de 5 segundos após o clique

    def realizar_login(self):
        self.browser.get(f'{self.frontend_url}/login')

        username_input = WebDriverWait(self.browser, 50).until(
            EC.presence_of_element_located((By.ID, "username"))
        )
        time.sleep(2)
        password_input = WebDriverWait(self.browser, 50).until(
            EC.presence_of_element_located((By.ID, "password"))
        )
        time.sleep(2)


        username_input.send_keys(self.username)
        time.sleep(2)
        password_input.send_keys(self.password)

        # Substituímos o clique direto pelo método com atraso
        self.click_with_delay(By.ID, "loginbotao")

        WebDriverWait(self.browser, 50).until(
            EC.url_contains("http://localhost:5173/")
        )

        WebDriverWait(self.browser, 50).until(
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

        time.sleep(2)
        self.click_with_delay(By.ID, 'sobre')

        WebDriverWait(self.browser, 50).until(
            EC.url_contains("http://localhost:5173/")
        )

        funciona_info = WebDriverWait(self.browser, 50).until(
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

        time.sleep(2)
        self.click_with_delay(By.ID, 'vermaisbotao')

        time.sleep(2)
        WebDriverWait(self.browser, 50).until(
            EC.url_contains("http://localhost:5173/posts")
        )

        time.sleep(2)
        nav_content = WebDriverWait(self.browser, 50).until(
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

    def tearDown(self):
        self.browser.quit()