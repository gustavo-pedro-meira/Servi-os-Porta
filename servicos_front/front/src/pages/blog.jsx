import React, { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "../styles/blog.module.css";

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className={styles.mainClass}>
      <nav className={styles.nav}>
        <img src="#" alt="Logo" />
        <div className={styles.navcontent}>
          <p>Fale Conosco</p>
          <p>Sobre Nós</p>
          <p>Como Funciona?</p>
          <button type="button">Seja um Profissional</button>
          <button type="button">Entrar</button>
        </div>
      </nav>

      <section className={styles.section_one}>
        <div className={styles.search_div}>
          <div className={styles.service_search}>
            <h1 className={styles.destaque}>Que tipo de Serviço está procurando?</h1>
            <div className={styles.inputWrapper}>
              <input 
                className={styles.inputsearch}
                type="text"
                placeholder="Buscar"
              />
              <FaSearch className={styles.searchIcon} />
            </div>
          </div>

          <div className={styles.buttons_list}>
            <input className={styles.input_select} type="number" placeholder="CEP" />
            <input className={styles.input_select} type="text" id="estados" placeholder="Estado" list="lista-estados" />
            <datalist id="lista-estados">
              <option value="Acre" />
              <option value="Alagoas" />
              <option value="Amapá" />
              <option value="Amazonas" />
              <option value="Bahia" />
              <option value="Ceará" />
              <option value="Distrito Federal" />
              <option value="Espírito Santo" />
              <option value="Goiás" />
              <option value="Maranhão" />
              <option value="Mato Grosso" />
              <option value="Mato Grosso do Sul" />
              <option value="Minas Gerais" />
              <option value="Pará" />
              <option value="Paraíba" />
              <option value="Paraná" />
              <option value="Pernambuco" />
              <option value="Piauí" />
              <option value="Rio de Janeiro" />
              <option value="Rio Grande do Norte" />
              <option value="Rio Grande do Sul" />
              <option value="Rondônia" />
              <option value="Roraima" />
              <option value="Santa Catarina" />
              <option value="São Paulo" />
              <option value="Sergipe" />
              <option value="Tocantins" />
            </datalist>
            <input className={styles.input_select} type="text" id="cidades" placeholder="Cidade" />
            <input className={styles.input_select} type="text" id="nivel" placeholder="Nivel Profissional" list="lista-nivel" />
            <datalist id="lista-nivel">
              <option value="Estagiário" />
              <option value="Júnior" />
              <option value="Pleno" />
              <option value="Sênior" />
              <option value="Especialista" />
              <option value="Freelancer" />
            </datalist>
          </div>
        </div>

        <div className={styles.div_perfil}>
          <div className={styles.perfil}>
            <div className={styles.perfil_image}>
              <img className={styles.image} src="gustavo.jpg" alt="Gustavo Pedro" />
            </div>
            <div className={styles.perfil_info}>
              <h3>Gustavo Pedro</h3>
              <h5 className={styles.perfil_funcao}>Pedreiro</h5>
              <p className={styles.perfil_paragrafo}>Tenho 20 anos.</p>
            </div>
          </div>

          <div className={styles.perfil}>
            <div className={styles.perfil_image}>
              <img className={styles.image} src="/gabriel.jpg" alt="Gabriel França" />
            </div>
            <div className={styles.perfil_info}>
              <h3>Gabriel França</h3>
              <h5 className={styles.perfil_funcao}>Montador de Móveis</h5>
              <p className={styles.perfil_paragrafo}>Fanático por montar móveis.</p>
            </div>
          </div>

          <div className={styles.perfil}>
            <div className={styles.perfil_image}>
              <img className={styles.image} src="/angelica1.jpeg" alt="Angélica Felix" />
            </div>
            <div className={styles.perfil_info}>
              <h3>Angélica Felix</h3>
              <h5 className={styles.perfil_funcao}>Cuidadora de Idosos</h5>
              <p className={styles.perfil_paragrafo}>Sempre ajudando aqueles que precisam de ajuda.</p>
            </div>
          </div>

          <div className={styles.perfil}>
            <div className={styles.perfil_image}>
              <img className={styles.image} src="/matheus.jpeg" alt="Matheus Lima" />
            </div>
            <div className={styles.perfil_info}>
              <h3>Matheus Lima</h3>
              <h5 className={styles.perfil_funcao}>Encanador</h5>
              <p className={styles.perfil_paragrafo}>Evitando risco em sua residência.</p>
            </div>
          </div>

          <div className={styles.perfil}>
            <div className={styles.perfil_image}>
              <img className={styles.image} src="/pablo.jpeg" alt="Pablo Roberto" />
            </div>
            <div className={styles.perfil_info}>
              <h3>Pablo Roberto</h3>
              <h5 className={styles.perfil_funcao}>Diarista</h5>
              <p className={styles.perfil_paragrafo}>Prazer, sou Pablo diarista.</p>
            </div>
          </div>

          <h5 className={styles.aviso_pagina}>(Aqui será inserido a paginação).</h5>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footer_sobre}>
          <h3>Serviços à Porta</h3>
          <span className={styles.footer_line}></span>
          <p>
            Serviços à Porta é a solução ideal, conectando pessoas que não tem experiência em serviços com profissionais de alta qualidade, de forma rápida e eficiente. Nossa plataforma é intuitiva e acessível, permitindo que você consiga um profissional com facilidade. Com recursos avançados e segurança garantida, oferecemos uma experiência confiável e otimizada para atender às suas necessidades.
          </p>
          <p>© 2024. Serviços à Porta. Todos os direitos reservados.</p>
        </div>

        <div className={styles.footer_redes}>
          <h3>Redes Sociais</h3>
          <span className={styles.footer_line}></span>
          <a>Instagram</a>
          <a>Facebook</a>
          <a>WhatsApp</a>
          <a>LinkedIn</a>
          <a>X</a>
        </div>

        <div className={styles.footer_paginas}>
          <h3>Páginas</h3>
          <span className={styles.footer_line}></span>
          <a>Como Funciona</a>
          <a>Seja um Profissional</a>
          <a>Criar Conta</a>
          <a>Entrar</a>
          <a>Contato</a>
        </div>

        <div className={styles.footer_regulamento}>
          <h3>Regulamento</h3>
          <span className={styles.footer_line}></span>
          <a>Termos de Uso</a>
          <a>Política de Privacidade</a>
        </div>
      </footer>
    </main>
  );
};

export default Blog;
