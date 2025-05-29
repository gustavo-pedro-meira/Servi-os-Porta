import React, { useState } from "react";
import styles from "../styles/cadastro.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CadastroProfissional = () => {
  const [nome, setNome] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [numero, setNumero] = useState("");
  const [idProfissao, setIdProfissao] = useState("");
  const [nivelProfissional, setNivelProfissional] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [cep, setCep] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [dataNascimento, setDataNascimento] = useState("");
  const [cpf, setCpf] = useState("");
  const [erro, setErro] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("access"));
  const navigate = useNavigate();

  // Função de logout
  const handleLogout = () => {
    localStorage.removeItem("access");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    if (password !== confirmarPassword) {
      setErro("As senhas não conferem");
      return;
    }

    if (!nome || !email || !username || !cpf || !dataNascimento) {
      setErro("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmarPassword", confirmarPassword);
    formData.append("numero", numero);
    formData.append("idProfissao", idProfissao);
    formData.append("nivelProfissional", nivelProfissional);
    formData.append("descricao", descricao);
    formData.append("dataInicio", dataInicio);
    formData.append("cep", cep);
    formData.append("estado", estado);
    formData.append("cidade", cidade);
    if (fotoPerfil) {
      formData.append("fotoPerfil", fotoPerfil);
    }
    formData.append("dataNascimento", dataNascimento);
    formData.append("cpf", cpf);

    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/profissionais/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.error("Erro ao cadastrar profissional", error);
      if (error.response && error.response.data) {
        // Exibe erros retornados pelo backend
        const backendErrors = error.response.data;
        if (typeof backendErrors === "object") {
          const errorMessages = Object.values(backendErrors).flat().join(" ");
          setErro(errorMessages || "Erro ao cadastrar profissional");
        } else {
          setErro(backendErrors || "Erro ao cadastrar profissional");
        }
      } else {
        setErro("Erro ao cadastrar profissional");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.mainClass}>
      <section className={styles.section}>
        <nav className={styles.nav}>
          <img src="/logoservicos.png" alt="Logo" height={80} />
          <div className={styles.navcontent}>
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
              onClick={isLoggedIn ? handleLogout : () => navigate("/login")}
            >
              {isLoggedIn ? "Sair" : "Entrar"}
            </button>
          </div>
        </nav>
      </section>

      <div className={styles.mainimage}>
        <img
          className={styles.engenheiro}
          src="/Engenheiro.png"
          alt="Imagem"
        />
        <div className={styles.texts_cadastro}>
          <h1>Seja um Profissional na Serviços à Porta</h1>
          <p>Conheça as vantagens ao fazer parte do nosso time</p>
          <div className={styles.icones}>
            <img
              src="/Dinheiro.png"
              alt="Icone Dinheiro"
              className={styles.icone_dinheiro}
            />
            <img
              src="/Localização.png"
              alt="Icone Localização"
              className={styles.icone_localizacao}
            />
          </div>
          <div className={styles.icones_textos}>
            <h6>Aumente sua renda</h6>
            <h6>Localize os clientes</h6>
          </div>
          <div className={styles.texto_explicacao}>
            <p className={styles.textinho}>
              Trabalhar com serviços à porta é uma ótima escolha! Você ganha
              flexibilidade para montar sua rotina, autonomia para gerenciar suas
              tarefas e a chance de aumentar sua renda em horários de alta
              demanda. Além disso, é um mercado em alta, com oportunidades
              constantes, e permite desenvolver habilidades como atendimento ao
              cliente e gestão de tempo. Seja entregando pedidos ou prestando
              serviços, você conhece pessoas novas e faz parte da conveniência
              que todo mundo ama!
            </p>
          </div>
        </div>
      </div>

      <div className={styles.linha}></div>

      <h2 className={styles.titulo_cadastro}>Cadastro Profissional</h2>

      <div className={styles.div_cadastro}>
        {erro && <p style={{ color: "red" }}>{erro}</p>}
        <div className={styles.container_foto}>
          <label className={styles.label_foto}>
            Foto +
            <input
              type="file"
              onChange={(e) => setFotoPerfil(e.target.files[0])}
              className={styles.input_foto}
            />
          </label>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirmar Senha"
            value={confirmarPassword}
            onChange={(e) => setConfirmarPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          <input
            type="date"
            placeholder="Data de Nascimento"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            style={{ color: dataNascimento === "" ? "gray" : "black" }}
          />
          <input
            type="date"
            placeholder="Data de Início"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
            style={{ color: dataInicio === "" ? "gray" : "black" }}
          />
          <input
            type="text"
            placeholder="CEP"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
          />
          <input
            type="text"
            placeholder="Estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          />
          <input
            type="text"
            placeholder="Cidade"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
          />
          <input
            type="text"
            placeholder="Número"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
          />
          <input
            type="text"
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
          <select
            value={idProfissao}
            onChange={(e) => setIdProfissao(e.target.value)}
            style={{ color: idProfissao === "" ? "gray" : "black" }}
          >
            <option value="">Selecione uma profissão</option>
            <option value="2">Pedreiro</option>
            <option value="3">Limpeza Doméstica</option>
            <option value="4">Reparos e Manutenção</option>
            <option value="5">Serviços de Ar-Condicionado</option>
            <option value="6">Mudança e Transportes</option>
            <option value="7">Instalações</option>
            <option value="8">Montador de Móveis</option>
          </select>
          <select
            value={nivelProfissional}
            onChange={(e) => setNivelProfissional(e.target.value)}
            style={{ color: nivelProfissional === "" ? "gray" : "black" }}
          >
            <option value="">Selecione o nível</option>
            <option value="I">Iniciante</option>
            <option value="Q">Qualificado</option>
            <option value="P">Profissional</option>
          </select>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Enviando..." : "Cadastrar"}
          </button>
        </form>
      </div>

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

export default CadastroProfissional;