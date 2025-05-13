import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaHeart } from "react-icons/fa";
import styles from "../styles/posts.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Posts = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [profissionais, setProfissionais] = useState([]);
  const [isProfissional, setIsProfissional] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [novoComentario, setNovoComentario] = useState("");
  const [conteudo, setConteudo] = useState(null);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [isPosting, setIsPosting] = useState(false);
  const [menuOpenId, setMenuOpenId] =  useState(null);
  const menuRef = useRef(null);

  const handleMenuClick = (postId) => {
    setMenuOpenId(menuOpenId === postId ? null : postId);
  }

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
    }
  };

  const checkProfissional = async () => {
    const token = localStorage.getItem("access");
    if (token) {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/profissionais/?t=${Date.now()}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.data && !Array.isArray(response.data)) {
          setIsProfissional(true);
          setCurrentUser(response.data);
        } else {
          setIsProfissional(false);
          setCurrentUser(null);
        }
      } catch (err) {
        console.error("Erro ao verificar profissional:", err);
        setIsProfissional(false);
        setCurrentUser(null);
      }
    } else {
      setIsProfissional(false);
      setCurrentUser(null);
    }
  };

  const handleNovoComentarioChange = (postId, e) => {
    setNovoComentario({ ...novoComentario, [postId]: e.target.value });
  };
  
  const handleAdicionarComentario = async (postId) => {
    const comentario = novoComentario[postId];
    if (!comentario || !comentario.trim()) return;
  
    try {
      const response = await axios.post(
        `http://localhost:8000/api/comentarios/`,
        { post: postId, conteudo: comentario },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
        }
      );
      // Atualizar o estado com o novo comentário
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, comentarios: [...post.comentarios, response.data] }
            : post
        )
      );
      // Limpar o campo de entrada
      setNovoComentario({ ...novoComentario, [postId]: "" });
    } catch (error) {
      console.error("Erro ao adicionar comentário:", error);
      alert("Erro ao adicionar comentário. Tente novamente.");
    }
  };

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const term = e.target.value;
      if (term.trim()) {
        handleSearch(term);
      } else {
        fetchPosts();
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        setError("Apenas imagens JPEG ou PNG são permitidas.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("A imagem deve ter no máximo 5MB.");
        return;
      }
      setConteudo(file);
      setError("");
    } else {
      setConteudo(null);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setError("");
    setIsPosting(true);

    if (!titulo.trim()) {
      setError("O título é obrigatório.");
      setIsPosting(false);
      return;
    }

    const formData = new FormData();
    formData.append("titulo", titulo);
    if (conteudo) {
      formData.append("conteudo", conteudo);
    }

    try {
      await axios.post(`http://localhost:8000/api/posts/`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Post criado com sucesso!");
      setTitulo("");
      setConteudo(null);
      setIsModalOpen(false);
      fetchPosts();
    } catch (err) {
      console.error("Erro ao criar post:", err);
      setError(
        err.response?.data?.detail ||
          "Erro ao criar o post. Verifique se você é um profissional."
      );
    } finally {
      setIsPosting(false);
    }
  };

  const handleCurtir = async (postId) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/posts/${postId}/curtir/`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
        }
      );
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                curtidas_count: response.data.curtidas_count,
                is_curtido: response.data.status === "curtido",
              }
            : post
        )
      );
    } catch (error) {
      console.error("Erro ao curtir post:", error);
      const errorMessage =
        error.response?.data?.detail || "Erro ao curtir o post. Tente novamente.";
      alert(errorMessage);
    }
  };

  const abrirModal = () => {
    if (!isProfissional) {
      alert("Apenas profissionais podem criar publicações.");
      navigate("/bio");
      return;
    }
    setIsModalOpen(true);
  };

  const fecharModal = () => {
    setIsModalOpen(false);
    setTitulo("");
    setConteudo(null);
    setError("");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const token = localStorage.getItem("access");
    if (!token) {
      navigate("/login");
      return;
    }

    fetchPosts();
    fetchProfissionais();
    checkProfissional();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpenId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <main className={styles.mainClass}>
      <section className={styles.section}>
        <nav className={styles.nav}>
          <img src="/logoservicos.png" alt="Logo" height={80} />
          <div className={styles.navcontent} id="navcontent">
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
            <button type="button" onClick={() => navigate("/cadastro")} className={styles.button_profissional}>
              Seja um Profissional
            </button>
            <button type="button" onClick={() => navigate("/login")}>
              Entrar
            </button>
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
            <div className={styles.pontos_editar} ref={menuRef}>
                <div className={styles.menu_container}>
                  <button className={styles.botao_editar} onClick={() => handleMenuClick(post.id)}>⋮</button>
                  <ul className={`${styles.menu_opcoes} ${menuOpenId === post.id ? styles.show : ""}`}>
                    <li><button onClick={() => handleUpdate(post.id)}>Atualizar</button></li>
                    <li><button onClick={() => handleDelete(post.id)}>Deletar</button></li>
                    <li><button onClick={() => handleShare(post.id)}>Compartilhar</button></li>
                </ul>
              </div>
            </div>
            <div className={styles.posts}>
              <img
                className={styles.img_perfil}
                src={post?.usuario?.foto_perfil || "/default.jpg"}
                alt="Img Perfil"
                onError={(e) => (e.target.src = "/default.jpg")}
              />
              <h3>{post?.usuario?.nome}</h3>
              <h5>{post?.usuario?.profissao || "Profissão não informada"}</h5>
              <p>{post?.titulo}</p>
              <div className={styles.imagem_midia}>
                <img
                  src={post?.conteudo || "/default.jpg"}
                  alt="Img Post"
                  className={styles.img_post}
                  onError={(e) => (e.target.src = "/default.jpg")}
                />
              </div>
              <div className={styles.curtidas}>
                <button
                  className={styles.botao_curtir}
                  onClick={() => handleCurtir(post.id)}
                  disabled={!localStorage.getItem("access")}
                >
                  <FaHeart
                    style={{
                      color: post.is_curtido ? "#74C7DF" : "grey",
                      marginRight: "5px",
                    }}
                  />
                  {post.curtidas_count || 0} curtidas
                </button>
                <span className={styles.comentarios_count}>
                  {post.comentarios_count || 0} comentários
                </span>
              </div>
              <div className={styles.linha} />
              <div className={styles.linha_separacao} />
              <div className={styles.comentarios}>
                {post.comentarios && post.comentarios.length > 0 ? (
                  post.comentarios.map((comentario) => (
                    <div key={comentario.id} className={styles.comentario}>
                      <p>{comentario.conteudo}</p>
                    </div>
                  ))
                ) : (
                  <p></p>
                )}
              </div>
              <div className={styles.adicionar_comentario}>
                <input
                  type="text"
                  value={novoComentario[post.id] || ""}
                  onChange={(e) => handleNovoComentarioChange(post.id, e)}
                  placeholder="Adicione um comentário..."
                  className={styles.input_comentario}
                />
                <button
                  onClick={() => handleAdicionarComentario(post.id)}
                  className={styles.botao_comentar}
                >
                  Comentar
                </button>
              </div>
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
                  src={currentUser?.foto_perfil || "/default.jpg"}
                  alt="Img Perfil"
                  onError={(e) => (e.target.src = "/default.jpg")}
                />
                <h3>{currentUser?.nome || "Usuário"}</h3>
                <textarea
                  className={styles.text_post}
                  placeholder={`No que você está pensando, ${currentUser?.nome || "Usuário"}?`}
                  rows={17}
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />
                <label htmlFor="arquivo" className={styles.add_arquivo_label}>
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
                  accept="image/jpeg,image/png"
                  className={styles.input_arquivo}
                  onChange={handleFileChange}
                />
                {error && <p className={styles.error}>{error}</p>}
              </div>
              <button
                type="button"
                className={styles.button_postar}
                onClick={handleCreatePost}
                disabled={isPosting}
              >
                {isPosting ? "Postando..." : "Postar"}
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