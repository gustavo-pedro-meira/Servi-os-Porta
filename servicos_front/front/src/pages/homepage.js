import React from "react";
import { FaSearch } from "react-icons/fa"; // Importe o ícone de lupa
import styles from "../styles/page.module.css";

const Home = () => {
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
        <div className={styles.services_div}>
          <div className={styles.info}>
            <p className={styles.infotext}>
              Pesquise e descubra profissionais qualificados onde você só encontrará na{" "}
              <span className={styles.destaque}>Serviços à Porta.</span>
            </p>
          </div>

          <div className={styles.mainimage}>
            <img className={styles.engenheiro} src="/Engenheiro.png" alt="Imagem" />
          </div>

          <div className={styles.search}>
            <h1 className={styles.searchtitle}>
              Um método moderno para <span className={styles.destaque}>contratar profissionais</span>
            </h1>
            <div className={styles.inputWrapper}>
              <input
                className={styles.inputsearch}
                type="text"
                placeholder="Buscar"
              />
              <FaSearch className={styles.searchIcon} />
            </div>
          </div>
        </div>

          <div className={styles.service_type}>
            <h1 className={styles.destaque}>Principais Serviços</h1>

            <div className={styles.services_info}>
              <div className={styles.services_separator}>
                <div className={styles.circle}>
                  <img className={styles.circle_icon} src="/limpezadomestica.png" alt="Icon"></img>
                </div>
                <p>Limpeza Domésticas</p>
              </div>
                
              <div className={styles.services_separator}>
                <div className={styles.circle}>
                  <img className={styles.circle_icon} src="/reparo.png" alt="Icon"></img> 
                </div>
                <p>Reparos e Manutenção</p>
              </div>

              <div className={styles.services_separator}>
                <div className={styles.circle}>
                  <img className={styles.circle_icon} src="/servicoar.png" alt="Icon"></img>   
                </div>
                <p>Serviços de Ar-Condionado</p>
              </div>

              <div className={styles.services_separator}>
                <div className={styles.circle}>
                  <img className={styles.circle_icon} src="/transporte.png" alt="Icon"></img>
                </div>
                <p>Mudança e Transportes</p>
              </div>

              <div className={styles.services_separator}>
                <div className={styles.circle}>
                  <img className={styles.circle_icon} src="/instalacoes.png" alt="Icon"></img>
                </div>
                <p>Instalações</p>
              </div>
            </div>
          </div>

      </section>

    </main>
  );
};

export default Home;
