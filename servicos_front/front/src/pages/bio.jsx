import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../styles/bio.module.css";
import axios from "axios";

const Bio = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profissional, setProfissional] = useState(null);
  const [outrosProfissionais, setOutrosProfissionais] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("access"));

  const handleLogout = () => {
    localStorage.removeItem("access");
    setIsLoggedIn(false);
    navigate("/login");
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      setProfissional(null);

      try {
        const response = await axios.get(
          `http://localhost:8000/api/profissionais/${id}/?t=${Date.now()}`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
          }
        );
        const fetchedProfissional = response.data;
        setProfissional(fetchedProfissional);

        const outrosResponse = await axios.get(
          `http://localhost:8000/api/profissionais/?profissao_nome=${fetchedProfissional.profissao}&t=${Date.now()}`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
          }
        );
        const outros = Array.isArray(outrosResponse.data)
          ? outrosResponse.data
          : Array.isArray(outrosResponse.data.results)
          ? outrosResponse.data.results
          : [];
        setOutrosProfissionais(
          outros
            .filter((p) => Number(p.id) !== Number(id))
            .slice(0, 4)
        );
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setError("Não foi possível carregar os dados do profissional.");
        if (error.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  return (
    <main className={styles.mainClass}>
      <nav className={styles.nav}>
        <img src="/logoservicos.png" alt="Logo" height={80} />
        <div className={styles.navcontent}>
          <p
            onClick={() => navigate("/", { state: { scrollTo: "contato" } })}
          >
            Fale Conosco
          </p>
          <p
            onClick={() => navigate("/", { state: { scrollTo: "sobre" } })}
          >
            Sobre Nós
          </p>
          <p
            onClick={() => navigate("/", { state: { scrollTo: "como_funciona" } })}
          >
            Como Funciona?
          </p>
          <button
            type="button"
            onClick={() => navigate("/cadastro")}
            className={styles.button_profissional}
          >
            Seja um Profissional
          </button>
          <button
            type="button"
            onClick={isLoggedIn ? handleLogout : () => navigate("/login")}
          >
            {isLoggedIn ? "Sair" : "Entrar"}
          </button>
        </div>
      </nav>
      <section className={styles.section_one}>
        {isLoading ? (
          <p>Carregando...</p>
        ) : error ? (
          <p>{error}</p>
        ) : profissional ? (
          <div className={styles.profissional_div}>
            <div className={styles.profissional_imagem}>
              <img
                src={profissional.foto_perfil || "/default.png"}
                alt={profissional.nome}
                height={270}
                width={180}
                onError={(e) => (e.target.src = "/default.png")}
              />
            </div>
            <div className={styles.profissional_info}>
              <h3 className={styles.nome_prof}>{profissional.nome}</h3>
              <p>
                {profissional.cidade} - {profissional.estado}, {profissional.idade} anos
              </p>
              <p>{profissional.profissao}</p>
              <h5>Apresentação</h5>
              <p className={styles.apresentacao_bio}>{profissional.descricao}</p>
            </div>
          </div>
        ) : (
          <p>Profissional não encontrado.</p>
        )}
        {profissional && (
          <button
            className={styles.whatsapp_button}
            type="button"
            onClick={() => window.open(`https://wa.me/${profissional.numero}`, "_blank")}
          >
            <FaWhatsapp size={20} style={{ marginRight: "8px" }} />
            Fale com o Profissional
          </button>
        )}
        <span className={styles.bio_line}></span>
        <div className={styles.service_type}>
          <h1 className={styles.destaque}>
            Outros profissionais que oferecem o mesmo serviço ou serviços semelhantes
          </h1>
          <div className={styles.services_info}>
            {Array.isArray(outrosProfissionais) && outrosProfissionais.length > 0 ? (
              outrosProfissionais.map((prof) => (
                <div
                  key={prof.id}
                  className={styles.services_separator}
                  onClick={() => navigate(`/bio/${prof.id}`)}
                >
                  <div className={styles.circle}>
                    <img
                      className={styles.circle_icon}
                      src={prof.foto_perfil || "/default.png"}
                      alt={prof.nome}
                      onError={(e) => (e.target.src = "/default.png")}
                    />
                  </div>
                  <p>{prof.nome}</p>
                </div>
              ))
            ) : (
              <p>Nenhum outro profissional encontrado.</p>
            )}
          </div>
        </div>
        <button
          className={styles.more_button}
          type="button"
          onClick={() => navigate("/listar")}
        >
          Ver Mais
        </button>
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
        <div className={styles.footer_contatos}>
          <h3>Contato</h3>
          <span className={styles.footer_line}></span>
          <a>Rua Unifip, Centro, Patos - PB</a>
          <a>serviçosaporta@gmail.com</a>
          <a>+55 (83) 1.2345 - 6789</a>
          <a>+55 (83) 9.8765 - 4321</a>
        </div>
        <div className={styles.footer_paginas}>
          <h3>Páginas</h3>
          <span className={styles.footer_line}></span>
          <a onClick={() => navigate("/listar")}>Profissionais</a>
          <a onClick={() => navigate("/posts")}>Publicações</a>
          <a onClick={() => navigate("/cadastro")}>Seja um Profissional</a>
          <a onClick={() => navigate("/register")}>Criar Conta</a>
          <a onClick={isLoggedIn ? handleLogout : () => navigate("/login")}>
            {isLoggedIn ? "Sair" : "Entrar"}
          </a>
        </div>
        <div className={styles.footer_regulamento}>
          <h3>Regulamento</h3>
          <span className={styles.footer_line}></span>
          <a>Termos de Uso</a>
          <a>Política de Privacidade</a>
          <a onClick={() => navigate("/", { state: { scrollTo: "como_funciona" } })}>
            Como Funciona
          </a>
          <a onClick={() => navigate("/", { state: { scrollTo: "sobre" } })}>
            Sobre nós
          </a>
        </div>
      </footer>
    </main>
  );
};

export default Bio;