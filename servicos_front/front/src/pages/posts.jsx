import React, { useState, useEffect, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "../styles/posts.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import debounce from "lodash/debounce";

const Posts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [profissionais, setProfissionais] = useState([]);

  // Função para buscar todos os posts
  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:8000/api/posts/?t=${Date.now()}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
        }
      );
      const data = Array.isArray(response.data)
        ? response.data
        : Array.isArray(response.data.results)
        ? response.data.results
        : [];
      console.log("Posts encontrados:", data);
      setPosts(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
      setPosts([]);
      setIsLoading(false);
    }
  };

  // Função para buscar profissionais
  const fetchProfissionais = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/profissionais/?t=${Date.now()}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
        }
      );
      const data = Array.isArray(response.data)
        ? response.data
        : Array.isArray(response.data.results)
        ? response.data.results
        : [];
      console.log("Profissionais Encontrados:", data);
      setProfissionais(data);
    } catch (error) {
      console.error("Erro ao buscar profissionais:", error);
      setProfissionais([]);
      setIsLoading(false);
    }
  };

  // Função de busca
  const handleSearch = async (term) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:8000/api/posts/?search=${term}&t=${Date.now()}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
        }
      );
      const data = Array.isArray(response.data)
        ? response.data
        : Array.isArray(response.data.results)
        ? response.data.results
        : [];
      console.log("Posts encontrados na busca:", data);
      setPosts(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
      setPosts([]);
      setIsLoading(false);
    }
  };

  // Função de busca com debounce
  

  // Função para lidar com a mudança no input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Função para lidar com o pressionamento de teclas
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const term = e.target.value
      if (term.trim()) {
        handleSearch(term);
      } else {
        fetchPosts();
      }
    }
  };


  useEffect(() => {
    fetchPosts();
    fetchProfissionais();
  }, []);

  // Função para abrir o modal
  const abrirModal = () => {
    setIsModalOpen(true);
  };

  // Função para fechar o modal
  const fecharModal = () => {
    setIsModalOpen(false);
  };

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
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
              />
              <FaSearch
                className={styles.searchIcon}
                onClick={() => handleSearch(searchTerm)}
              />
              <button className={styles.button_publi} onClick={abrirModal}>
                Criar Publicação
              </button>
            </div>
          </div>
        </div>
      </section>

      {isLoading ? (
        <p className={styles.loading}>Carregando...</p>
      ) : Array.isArray(posts) && posts.length > 0 ? (
        posts.map((post) => (
          <section className={styles.postagens} key={post.id}>
            <div className={styles.posts}>
              <img
                className={styles.img_perfil}
                src={post?.usuario?.foto_perfil || "/default.jpg"}
                alt="Img Perfil"
              />
              <h3>{post?.usuario?.nome}</h3>
              <h5>{post?.usuario?.profissao || "Profissão não informada"}</h5>
              <p>{post?.titulo}</p>
              <img
                src={post?.conteudo || "/default.jpg"}
                alt="Img Post"
                className={styles.img_post}
              />
              <div className={styles.linha} />
            </div>
          </section>
        ))
      ) : (
        <p>Nenhum post encontrado</p>
      )}

      {isModalOpen && (
        <>
          <div className={styles.overlay} onClick={fecharModal}></div>
          <section className={styles.criar_postagem_modal}>
            <div className={styles.criar_publicacao}>
              <button className={styles.button_fechar} onClick={fecharModal}>
                X
              </button>
              <h2 className={styles.titulo_post}>Criar Publicação</h2>
              <div className={styles.linha_criar} />
              <div className={styles.campos_criar}>
                <img
                  className={styles.img_perfil}
                  src="/pablo.jpeg"
                  alt="Img Perfil"
                />
                <h3>Pablo Roberto</h3>
                <textarea
                  className={styles.text_post}
                  type="text"
                  placeholder="No que você está pensando, Pablo Roberto?"
                  rows={17}
                />
                <label
                  htmlFor="arquivo"
                  className={styles.add_arquivo_label}
                >
                  Adicionar Mídia
                  <img
                    src="/imgMidia.png"
                    alt="Img Midia"
                    className={styles.img_midia}
                  />
                </label>
                <input
                  type="file"
                  id="arquivo"
                  name="arquivo"
                  className={styles.input_arquivo}
                />
              </div>
              <button type="button" className={styles.button_postar}>
                Postar
              </button>
            </div>
          </section>
        </>
      )}

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