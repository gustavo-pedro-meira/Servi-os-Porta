from django.contrib.staticfiles.testing import StaticLiveServerTestCase
from django.contrib.auth.models import User
from selenium import webdriver
from selenium.webdriver.edge.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.edge.options import Options as EdgeOptions
from webdriver_manager.microsoft import EdgeChromiumDriverManager

class TesteSelenium(StaticLiveServerTestCase):
    def setUp(self):
        # Cria um usuário de teste
        self.username = 'gustavaoo'
        self.password = 'Guga2004#'
        self.user = User.objects.create_user(username=self.username, password=self.password)
        
        # Configura o Selenium com Edge
        edge_options = EdgeOptions()
 
        edge_options.add_argument('--no-sandbox')
        edge_options.add_argument('--disable-dev-shm-usage')
        
        self.browser = webdriver.Edge(
            service=Service(EdgeChromiumDriverManager().install()),
            options=edge_options
        )
        self.browser.implicitly_wait(10)
        
        # URL do frontend (ajuste se necessário)
        self.frontend_url = 'http://localhost:5173'
        

    def realizar_login(self):
        self.browser.get(f'{self.frontend_url}/login')

        username_input = WebDriverWait(self.browser, 10).until(
            EC.presence_of_element_located((By.ID, "username"))
        )
        password_input = WebDriverWait(self.browser, 10).until(
            EC.presence_of_element_located((By.ID, "password"))
        )

        username_input.send_keys(self.username)
        password_input.send_keys(self.password)

        submit_button = WebDriverWait(self.browser, 10).until(
            EC.element_to_be_clickable((By.ID, "loginbotao"))
        )
        submit_button.click()

        WebDriverWait(self.browser, 10).until(
            EC.url_contains("http://localhost:5173/")
        )

        WebDriverWait(self.browser, 10).until(
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

        click_como_funciona = WebDriverWait(self.browser, 10).until(
            EC.element_to_be_clickable((By.ID, 'como_funciona'))
        )
        click_como_funciona.click()

        WebDriverWait(self.browser, 10).until(
            EC.url_contains("http://localhost:5173/")
        )

        funciona_info = WebDriverWait(self.browser, 10).until(
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

        click_button = WebDriverWait(self.browser, 10).until(
            EC.element_to_be_clickable((By.ID, 'vermaisbotao'))
        )
        click_button.click()

        WebDriverWait(self.browser, 10).until(
            EC.url_contains("http://localhost:5173/posts")
        )

        nav_content = WebDriverWait(self.browser, 10).until(
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


