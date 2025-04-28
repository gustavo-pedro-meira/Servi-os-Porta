import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "../styles/posts.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import debounce from "lodash/debounce";

const Posts = () => {

  return (
    <main className={styles.mainClass}>

      <section className={styles.section}>
        <nav className={styles.nav}>
          <img src="/logoservicos.png" alt="Logo" height={80} />
          <div className={styles.navcontent}>
            <p>Fale Conosco</p>
            <p>Sobre Nós</p>
            <p>Como Funciona?</p>
            <button type="button">Seja um Profissional</button>
            <button type="button">Entrar</button>
          </div>
        </nav>
      </section>

      <section className={styles.section_one}>
        <div className={styles.search_div}>
          <div className={styles.service_search}>
            <div className={styles.inputWrapper}>
              <input
                className={styles.inputsearch}
                type="text"
                placeholder="Buscar..."
              />
              <FaSearch className={styles.searchIcon} />
              <button className={styles.button_publi}>Criar Publicação</button>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.postagens}>
        <div className={styles.posts}>
          <img className={styles.img_perfil} src="/pablo.jpeg" alt="Img Perfil"/>
          <h3>Gustavo Pedro</h3>
          <h5>Pedreiro</h5>
          <p>Acabei o serviço na casa da dona Maria. Deixei tudo pronto,
            do jeito que ela queria: parede bem alinhada, piso no capricho
            e sem nenhuma imperfeição. Gosto de ver o cliente satisfeito,
            sabendo que fiz um trabalho bem-feito. Agora é juntar as
            ferramentas, dar aquela conferida final e partir para o
            próximo serviço. Mais uma obra entregue com dedicação
            e responsabilidade!</p>
          <img src="/pablo.jpeg" alt="Img Post" className={styles.img_post} />
          <div className={styles.linha}/>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footer_sobre}>
          <h3>Serviços à Porta</h3>
          <span className={styles.footer_line}></span>
          <p>
            Serviços à Porta é a solução ideal, conectando pessoas que não têm
            experiência em serviços com profissionais de alta qualidade, de forma
            rápida e eficiente. Nossa plataforma é intuitiva e acessível,
            permitindo que você consiga um profissional com facilidade. Com
            recursos avançados e segurança garantida, oferecemos uma experiência
            confiável e otimizada para atender às suas necessidades.
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

export default Posts;