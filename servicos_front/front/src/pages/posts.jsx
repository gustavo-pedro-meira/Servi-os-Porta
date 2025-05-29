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
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("access"));
  const [openComments, setOpenComments] = useState({});
  const menuRefs = useRef({});

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("access"); // Remove token from localStorage
    setCurrentUser(null); // Reset current user
    setIsProfissional(false); // Reset profissional status
    setPosts([]); // Optional: Clear posts
    navigate("/login"); // Redirect to login page
    console.log("Logout realizado com sucesso");
  };

  const handleMenuClick = (postId, event) => {
    event.stopPropagation();
    console.log("Clicou no botão de menu, postId:", postId);
    setMenuOpenId(menuOpenId === postId ? null : postId);
  };

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
    if (!token) {
      console.log("Nenhum token encontrado, redirecionando para login...");
      setIsProfissional(false);
      setCurrentUser(null);
      navigate("/login");
      return;
    }
    try {
      console.log("Fazendo requisição para /api/me/ com token:", token);
      const response = await axios.get(
        `http://localhost:8000/api/me/?t=${Date.now()}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Resposta da API /api/me/: ", response.data);
      setCurrentUser(response.data);
      const isProf = response.data.is_profissional || false;
      console.log("isProfissional definido como:", isProf);
      setIsProfissional(isProf);
      if (!isProf) {
        console.log("Aviso: Usuário não é profissional, criação de posts bloqueada.");
      }
    } catch (err) {
      console.error("Erro ao verificar usuário:", err.response?.data || err.message);
      setIsProfissional(false);
      setCurrentUser(null);
      navigate("/login");
    }
  };

  const handleNovoComentarioChange = (postId, e) => {
    setNovoComentario({ ...novoComentario, [postId]: e.target.value });
  };

  const toggleComments = (postId) => {
    setOpenComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleAdicionarComentario = async (postId) => {
    const comentario = novoComentario[postId];
    if (!comentario || !comentario.trim()) return;

    try {
      const response = await axios.post(
        `http://localhost:8000/api/comentarios/`,
        { post: postId, conteudo: comentario, profissional: currentUser?.id },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
        }
      );
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                comentarios: [...(post.comentarios || []), response.data],
                comentarios_count: (post.comentarios_count || 0) + 1,
              }
            : post
        )
      );
      setOpenComments((prev) => ({ ...prev, [postId]: true }));
      setNovoComentario({ ...novoComentario, [postId]: "" });
    } catch (error) {
      console.error("Erro ao adicionar comentário:", error);
      alert("Você não é um profissional.");
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

    console.log("Tentando criar post, título:", titulo, "conteúdo:", conteudo);

    if (!titulo.trim()) {
      setError("O título é obrigatório.");
      setIsPosting(false);
      console.log("Erro: Título vazio");
      return;
    }

    const formData = new FormData();
    formData.append("titulo", titulo);
    if (conteudo) {
      formData.append("conteudo", conteudo);
    }

    try {
      console.log("Enviando requisição POST para /api/posts/");
      const response = await axios.post(
        `http://localhost:8000/api/posts/?t=${Date.now()}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Post criado com sucesso, resposta:", response.data);
      alert("Post criado com sucesso!");
      setTitulo("");
      setConteudo(null);
      setIsModalOpen(false);
      fetchPosts();
    } catch (err) {
      console.error("Erro ao criar post:", err.response?.data || err.message);
      setError(
        err.response?.data?.detail ||
          "Erro ao criar o post. Verifique se você é um profissional."
      );
    } finally {
      setIsPosting(false);
    }
  };

  const handleDelete = async (postId, event) => {
    event.stopPropagation();
    console.log("Clicou em Deletar, postId:", postId, "currentUser:", currentUser);
    console.log("Elemento clicado:", event.target);

    if (!window.confirm("Tem certeza que deseja deletar este post?")) {
      console.log("Deleção cancelada pelo usuário");
      return;
    }

    try {
      const token = localStorage.getItem("access");
      console.log("Enviando requisição DELETE para /api/posts/", postId, "com token:", token);
      await axios.delete(`http://localhost:8000/api/posts/${postId}/?t=${Date.now()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Post deletado com sucesso, postId:", postId);
      alert("Post deletado com sucesso!");
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Erro ao deletar post:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      alert(
        error.response?.data?.detail || "Erro ao deletar o post. Tente novamente."
      );
    } finally {
      console.log("Fechando menu após tentativa de deleção, postId:", postId);
      setMenuOpenId(null);
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
      const currentMenuRef = menuRefs.current[menuOpenId];
      if (currentMenuRef && !currentMenuRef.contains(event.target)) {
        console.log("Clicou fora do menu, fechando menuOpenId:", menuOpenId, "target:", event.target);
        setMenuOpenId(null);
      } else {
        console.log("Clicou dentro do menu, mantendo aberto, menuOpenId:", menuOpenId, "target:", event.target);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuOpenId]);

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
            >
              Fale Conosco
            </p>
            <p
              onClick={() => {
                navigate("/", { state: { scrollTo: "sobre" } });
              }}
            >
              Sobre Nós
            </p>
            <p
              onClick={() => {
                navigate("/", { state: { scrollTo: "como_funciona" } });
              }}
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
            {/* Conditional rendering for Login/Logout button */}
            {currentUser ? (
              <button type="button" onClick={handleLogout}>
                Sair
              </button>
            ) : (
              <button type="button" onClick={() => navigate("/login")}>
                Entrar
              </button>
            )}
          </div>
        </nav>
      </section>

      {/* Rest of the component remains unchanged */}
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
              <button
                className={styles.button_publi}
                onClick={() => {
                  console.log("Clicou em Criar Publicação, isProfissional:", isProfissional, "currentUser:", currentUser);
                  if (!isProfissional) {
                    alert("Apenas profissionais podem criar publicações.");
                    console.log("Bloqueado: Usuário não é profissional.");
                    return;
                  }
                  if (!currentUser) {
                    alert("Usuário não carregado. Faça login novamente.");
                    console.log("Bloqueado: currentUser é null.");
                    navigate("/login");
                    return;
                  }
                  setIsModalOpen(true);
                  console.log("Definindo isModalOpen como true");
                }}
              >
                Criar Publicação
              </button>
            </div>
          </div>
        </div>
      </section>

      {isLoading ? (
        null
      ) : Array.isArray(posts) && posts.length > 0 ? (
        posts.map((post) => {
          if (!menuRefs.current[post.id]) {
            menuRefs.current[post.id] = React.createRef();
          }
          return (
            <section className={styles.postagens} key={post.id}>
              <div className={styles.pontos_editar} ref={menuRefs.current[post.id]}>
                <div className={styles.menu_container}>
                  <button
                    className={styles.botao_editar}
                    onClick={(e) => handleMenuClick(post.id, e)}
                  >
                    ⋮
                  </button>
                  <ul
                    className={`${styles.menu_opcoes} ${
                      menuOpenId === post.id ? styles.show : ""
                    }`}
                  >
                    {isProfissional && post.usuario.id === currentUser?.id && (
                      <li>
                        <button onClick={(e) => handleDelete(post.id, e)}>
                          Deletar
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
              <div className={styles.posts}>
                <img
                  className={styles.img_perfil}
                  src={post?.usuario?.foto_perfil || "/default.png"}
                  alt="Img Perfil"
                  onError={(e) => (e.target.src = "/default.png")}
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
                  <span
                    className={styles.comentarios_count}
                    onClick={() => toggleComments(post.id)}
                  >
                    {post.comentarios_count || 0} comentários
                  </span>
                </div>
                <div className={styles.linha} />
                <div className={styles.linha_separacao} />
                <div className={styles.comentarios}>
                  {openComments[post.id] && post.comentarios && post.comentarios.length > 0 ? (
                    post.comentarios.map((comentario) => (
                      <div key={comentario.id} className={styles.comentario}>
                        <img
                          src={comentario.foto_perfil || "/default.png"}
                          alt="Img Perfil"
                          onError={(e) => (e.target.src = "/default.png")}
                          className={styles.img_perfil_comentario}
                        />
                        <div className={styles.text_container}>
                          <div className={styles.nome_profissao_comentario}>
                            <h4 className={styles.nome_comentario}>
                              {comentario.autor || "Usuário"}
                            </h4>
                            <h6 className={styles.profissao_comentario}>
                              {comentario.profissao || "Profissão não informada"}
                            </h6>
                          </div>
                          <p className={styles.conteudo_comentario}>{comentario.conteudo}</p>
                          <span className={styles.data_comentario}>
                            {new Date(comentario.dataCriacao).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : openComments[post.id] ? (
                    <p>Sem comentários ainda.</p>
                  ) : null}
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
          );
        })
      ) : (
        <p>Nenhum post encontrado</p>
      )}

      {isModalOpen && currentUser && (
        <>
          {console.log("Renderizando modal, isModalOpen:", isModalOpen, "currentUser:", currentUser)}
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
                  src={currentUser?.foto_perfil || "/default.png"}
                  alt="Imagem de Perfil"
                  onError={(e) => (e.target.src = "/default.png")}
                />
                <h3>{currentUser.nome || "Usuário"}</h3>
                <textarea
                  className={styles.text_post}
                  placeholder={`No que você está pensando, ${currentUser.nome || "Usuário"}?`}
                  rows={17}
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />
                <label htmlFor="arquivo" className={styles.add_arquivo_label}>
                  Adicionar Mídia
                  <img
                    src="/imgMidia.png"
                    alt="Ícone de Mídia"
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
                {isPosting ? "Salvando..." : "Postar"}
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
          <a onClick={() => {navigate("/", { state: { scrollTo: "como_funciona" } });}}>Como Funciona</a>
          <a onClick={() => {navigate("/", { state: { scrollTo: "sobre" } });}}>Sobre nós</a>
        </div>
      </footer>
    </main>
  );
};

export default Posts;