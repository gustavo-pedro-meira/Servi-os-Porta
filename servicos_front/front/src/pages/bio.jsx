import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useParams, useNavigate, useLocation } from "react-router-dom"; // Adicione useLocation
import styles from "../styles/bio.module.css";
import axios from "axios";

const Bio = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); 
  const [profissional, setProfissional] = useState(location.state?.profissional || null); 
  const [outrosProfissionais, setOutrosProfissionais] = useState([]);
  const [isLoading, setIsLoading] = useState(!location.state?.profissional);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (profissional) {
        try {
          const outrosResponse = await axios.get(
            `http://localhost:8000/api/profissionais/?profissao_nome=${profissional.profissao}&t=${Date.now()}`,
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
          console.error("Erro ao buscar outros profissionais:", error);
          setOutrosProfissionais([]);
          if (error.response?.status === 401) {
            navigate("/login");
          }
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `http://localhost:8000/api/profissionais/${id}/?t=${Date.now()}`,
            {
              headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
            }
          );
          console.log("Resposta da API (profissional):", response.data);
          setProfissional(response.data);

          const outrosResponse = await axios.get(
            `http://localhost:8000/api/profissionais/?profissao_nome=${response.data.profissao}&t=${Date.now()}`,
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
      }
    };

    fetchData();
  }, [id, navigate, profissional, location.state]);

  return (
    <main className={styles.mainClass}>
      <nav className={styles.nav}>
        <img src="/logoservicos.png" alt="Logo" height={80} />
        <div className={styles.navcontent}>
          <p
            onClick={() => {
              navigate("/", { state: { scrollTo: "contato" } });
            }}
          >Fale Conosco</p>
          <p
            onClick={() => {
              navigate("/", { state: { scrollTo: "sobre" } });
            }}
          >Sobre Nós</p>
          <p 
            onClick={() => {
              navigate("/", { state: { scrollTo: "como_funciona" } });
            }}
          >
            Como Funciona? 
          </p>
          <button type="button" onClick={() => navigate("/cadastro")}>
            Seja um Profissional
          </button>
          <button type="button" onClick={() => navigate("/login")}>
            Entrar
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
              outrosProfissionais.map((profissional) => (
                <div
                  key={profissional.id}
                  className={styles.services_separator}
                  onClick={() =>
                    navigate(`/bio/${profissional.id}`, {
                      state: { profissional }, 
                    })
                  }
                >
                  <div className={styles.circle}>
                    <img
                      className={styles.circle_icon}
                      src={profissional.foto_perfil || "/default.png"}
                      alt={profissional.nome}
                      onError={(e) => (e.target.src = "/default.png")}
                    />
                  </div>
                  <p>{profissional.nome}</p>
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
          onClick={() => navigate("/")}
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