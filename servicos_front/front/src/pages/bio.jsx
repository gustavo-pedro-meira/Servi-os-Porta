import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import styles from "../styles/bio.module.css";
import { useState, useEffect } from "react";
import axios from "axios";


const Bio = () => {
  const [profissional, setProfissional] = useState(null);
  const [profissionais, setProfissionais] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfissional = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:8000/api/profissionais/78/?t=${Date.now()}`);
        console.log("Resposta da API:", response.data);
        setProfissional(response.data); // Ajuste se necessário, ex.: response.data.profissional
      } catch (error) {
        console.error("Erro ao buscar profissional:", error);
        setError("Não foi possível carregar os dados do profissional.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfissional();
  
  const buscarProfissionais = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/api/profissionais/?t=${Date.now()}`);
      console.log("Resposta da API:", response.data);
      setProfissionais(response.data.results);
    } catch (error) {
      console.error("Erro ao buscar profissionais:", error);
      setProfissionais([]);
      if (error.response?.status === 401) {
        navigate("/login"); // Token inválido ou expirado
      }
    } finally {
      setIsLoading(false);
    }
  };

  buscarProfissionais();
  },[]);

 
  const outrosProfissionais = profissionais
    .filter((p) => p.id !== 78 && p.profissao === profissional?.profissao)
    .slice(0, 4);
    
  console.log(profissionais);

    return (
    <main className={styles.mainClass}>
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

      <section className={styles.section_one}>
        {profissional ? (
          <div className={styles.profissional_div}>
            <div className={styles.profissional_imagem}>
              <img src={profissional.foto_perfil} alt={profissional.nome} height={270} width={180}></img>
          </div>

            <div className={styles.profissional_info}>
              <h3 className={styles.nome_prof}>{profissional.nome}</h3>
              <p>{profissional.cidade} - {profissional.estado}, {profissional.idade} anos</p>
              <p>{profissional.profissao}</p>
              <h5>Apresentação</h5>
              <p className={styles.apresentacao_bio}>
                {profissional.descricao}
              </p>
          </div>
          </div>
        ) : (
          <p>Carregando...</p>
        )}
        <button 
            className={styles.whatsapp_button} 
            type="button"
            onClick={() => window.open(`https://wa.me/${profissional.numero}`, "_blank")}
        >
            <FaWhatsapp size={20} style={{ marginRight: "8px" }} />
            Fale com o Profissional
        </button>
        <span className={styles.bio_line}></span>
          <div className={styles.service_type}>
            <h1 className={styles.destaque}>Outros profissionais que oferecem o mesmo serviço ou serviços semelhantes</h1>

            <div className={styles.services_info}>
              {Array.isArray(outrosProfissionais) && outrosProfissionais.length > 0 ? (
                outrosProfissionais.map((profissional) => (
                  <div key={profissional.id} className={styles.services_separator}>
                    <div className={styles.circle}>
                      <img className={styles.circle_icon} src={profissional.foto_perfil} alt="Icon"></img> 
                    </div>
                    <p>{profissional.nome}</p>

                  </div>
                ))
              ) : (
                <p>Nenhum outro profissional encontrado.</p>
              )}
            </div>
          </div>
            <button className={styles.more_button} type="button">Ver Mais</button>
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
