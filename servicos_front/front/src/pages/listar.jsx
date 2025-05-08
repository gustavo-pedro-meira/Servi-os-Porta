import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "../styles/blog.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import debounce from "lodash/debounce";

const ListaProfissionais = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Para acessar o state passado por Home
  const [searchTerm, setSearchTerm] = useState("");
  const [profissionais, setProfissionais] = useState([]);
  const [cep, setCep] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [nivel, setNivel] = useState("");
  const [profissao, setProfissao] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCepLoading, setIsCepLoading] = useState(false);


  // Função utilitária para cortar texto
  const truncateText = (text, maxLength = 100) => {
    if (typeof text !== "string") return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  // Validação de CEP
  const debouncedCepChange = debounce(async (novoCep) => {
    setCep(novoCep);
    if (novoCep.length === 8) {
      setIsCepLoading(true);
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${novoCep}/json/`);
        if (response.data.erro) {
          alert("CEP não encontrado.");
          setEstado("");
          setCidade("");
        } else {
          setEstado(response.data.uf);
          setCidade(response.data.localidade);
        }
      } catch (error) {
        console.error("Erro ao consultar o CEP:", error);
        alert("Erro ao consultar o CEP.");
        setEstado("");
        setCidade("");
      } finally {
        setIsCepLoading(false);
      }
    } else {
      setEstado("");
      setCidade("");
    }
  }, 100);

  const formatCep = (cep) => {
    const onlyNumbers = cep.replace(/\D/g, "");
    if (onlyNumbers.length <= 5) return onlyNumbers;
    return `${onlyNumbers.slice(0, 5)}-${onlyNumbers.slice(5)}`;
  };

  const handleCepChange = (e) => {
    const novoCep = e.target.value.replace(/\D/g, "");
    setCep(formatCep(novoCep));
    debouncedCepChange(novoCep);
  };

  const handleProfissaoChange = (e) => {
    setProfissao(e.target.value);
  };

  // Busca por termo
  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/profissionais/?search=${searchTerm}&cep=${cep}&estado=${estado}&cidade=${cidade}&nivel_profissional=${nivel}&idProfissao=${profissao}&t=${Date.now()}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
        }
      );
      console.log("URL da requisição:", response.config.url);
      console.log("Resposta da requisição:", response.data);
      const data = Array.isArray(response.data)
        ? response.data
        : Array.isArray(response.data.results)
        ? response.data.results
        : [];
      console.log("Profissionais encontrados:", data);
      setProfissionais(data);
    } catch (error) {
      console.error("Erro ao buscar profissionais:", error);
      setProfissionais([]);
      if (error.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Verificação de autenticação e busca inicial
  useEffect(() => {
    window.scrollTo(0, 0);
    const token = localStorage.getItem("access");
    if (!token) {
      navigate("/login");
      return;
    }

    // Recebe o searchTerm do state (vindo de Home)
    const initialSearchTerm = location.state?.searchTerm || "";
    if (initialSearchTerm) {
      setProfissao(initialSearchTerm); // Define o termo no campo profissão
    }

    const buscarProfissionais = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/profissionais/?idProfissao=${initialSearchTerm}&t=${Date.now()}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = Array.isArray(response.data)
          ? response.data
          : Array.isArray(response.data.results)
          ? response.data.results
          : [];
        setProfissionais(data);
      } catch (error) {
        console.error("Erro ao buscar profissionais:", error);
        setProfissionais([]);
        if (error.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Executa a busca inicial se houver um searchTerm
    if (initialSearchTerm) {
      buscarProfissionais();
    } else {
      // Busca padrão sem filtros (como no código original)
      buscarProfissionais();
    }
  }, [navigate, location.state]);

  return (
    <main className={styles.mainClass}>
      <nav className={styles.nav}>
        <img src="/logoservicos.png" alt="Logo" height={80} />
        <div className={styles.navcontent}>
          <p>Fale Conosco</p>
          <p>Sobre Nós</p>
          <p onClick={() => navigate("..")}>Como Funciona?</p>
          <button type="button" onClick={() => navigate("/cadastro")}>Seja um Profissional</button>
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
                placeholder="Buscar..."
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleKeyPress}
              />
              <FaSearch className={styles.searchIcon} />
            </div>
          </div>
          <div className={styles.buttons_list}>
            <input
              className={styles.input_select}
              onChange={handleCepChange}
              value={cep}
              type="text"
              placeholder="CEP"
              maxLength={9}
              pattern="\d*"
              disabled={isCepLoading}
            />
            <input
              className={styles.input_select}
              onChange={(e) => setEstado(e.target.value)}
              value={estado}
              type="text"
              placeholder="Estado"
              list="lista-estados"
            />
            <input
              className={styles.input_select}
              onChange={(e) => setCidade(e.target.value)}
              value={cidade}
              type="text"
              placeholder="Cidade"
            />
            <input
              className={styles.input_select}
              onChange={handleProfissaoChange}
              value={profissao}
              type="text"
              placeholder="Profissão"
            />
            <datalist id="lista-nivel">
              <option value="Iniciante" />
              <option value="Qualificado" />
              <option value="Profissional" />
            </datalist>
          </div>
        </div>
        <div className={styles.div_perfil}>
          {isLoading ? (
            <p>Carregando...</p>
          ) : Array.isArray(profissionais) && profissionais.length > 0 ? (
            profissionais.map((profissional) => (
              <div className={styles.perfil} key={profissional.id} onClick={() => navigate(`/bio`)}>
                <div className={styles.perfil_image}>
                  <img
                    className={styles.image}
                    src={profissional.foto_perfil || "/default.png"}
                    alt={profissional.nome}
                    onError={(e) => (e.target.src = "/default.png")}
                  />
                </div>
                <div className={styles.perfil_info}>
                  <h3>{profissional.nome}</h3>
                  <h5 className={styles.perfil_funcao}>{profissional.profissao}</h5>
                  <p className={styles.perfil_paragrafo}>
                    {truncateText(profissional.descricao, 85)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>Nenhum profissional encontrado.</p>
          )}
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

export default ListaProfissionais;