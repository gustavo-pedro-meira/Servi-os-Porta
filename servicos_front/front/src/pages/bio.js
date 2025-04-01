import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import styles from "../styles/bio.module.css";

const Bio = () => {
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
        <div className={styles.profissional_div}>
          <div className={styles.profissional_imagem}>
            <img src="./angelica.png"></img>
          </div>

          <div className={styles.funciona_info}>
            <h3 className={styles.nome_prof}>Angelica Felix</h3>
            <p>Patos - PB, 25 anos</p>
            <p>Cuidadora de Idosos</p>
            <h5>Apresentação</h5>
            <p className={styles.apresentacao_bio}>
                Meu nome é Angélica Felix, tenho 25 anos e sou de Patos, PB.Trabalho como cuidadora de idosos, uma profissão que exerço
                com muito carinho e dedicação. Minha missão é proporcionar
                conforto, atenção e qualidade de vida para aqueles que precisam
                de cuidados especiais. Gosto de criar um ambiente acolhedor,
                ajudando nas atividades do dia a dia, oferecendo companhia e
                garantindo que cada idoso se sinta respeitado e bem assistido.
                Para mim, cuidar é mais do que uma profissão, é um ato de amor e empatia.
            </p>
          </div>
        </div>
        <button 
            className={styles.whatsapp_button} 
            type="button"
            onClick={() => window.open("https://wa.me/55123456789", "_blank")}
        >
            <FaWhatsapp size={20} style={{ marginRight: "8px" }} />
            Fale com o Profissional
        </button>
        <span className={styles.bio_line}></span>
          <div className={styles.service_type}>
            <h1 className={styles.destaque}>Outros profissionais que oferecem o mesmo serviço ou serviços semelhantes</h1>

            <div className={styles.services_info}>
              <div className={styles.services_separator}>
                <div className={styles.circle}>
                  <img className={styles.circle_icon} src="/pedro.png" alt="Icon"></img> 
                </div>
                <p>Pedro Lucas</p>
              </div>

              <div className={styles.services_separator}>
                <div className={styles.circle}>
                  <img className={styles.circle_icon} src="/saulo.png" alt="Icon"></img>
                </div>
                <p>Saulo J</p>
              </div>

              <div className={styles.services_separator}>
                <div className={styles.circle}>
                  <img className={styles.circle_icon} src="/charles.png" alt="Icon"></img>
                </div>
                <p>Charles Oliveira</p>
              </div>

              <div className={styles.services_separator}>
                <div className={styles.circle}>
                  <img className={styles.circle_icon} src="/fernando.png" alt="Icon"></img>
                </div>
                <p>Fernando Neto</p>
              </div>
            </div>
          </div>

      </section>
      <footer className={styles.footer}>
        <div className={styles.footer_sobre}>
          <h3>Serviços à Porta</h3>
          <span className={styles.footer_line}></span>
          <p>Serviços à Porta é a solução ideal, conectando pessoas que não tem experiência em serviços com profissionais de alta qualidade, de forma rápida e eficiente. Nossa plataforma é intuitiva e acessível, permitindo que você consiga um profissional com facilidade. Com recursos avançados e  segurança garantida, oferecemos uma experiência confiável e otimizada para atender às suas necessidades.</p>
            <p>© 2024. Serviços à Porta. Todos os direitos reservados.</p>
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

export default Bio;
