import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import styles from "../styles/page.module.css";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      try {
        await fetch(`http://localhost:8000/api/profissoes/?search=${searchTerm}`);
        navigate("/listar", { state: { searchTerm } });
      } catch (error) {
        console.error("Erro ao buscar Profissões:", error);
        navigate("/listar", { state: { searchTerm } });
      }
    }
  };

  const fetchPosts = async() => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/api/posts/?ordering=-dataCriacao&t=${Date.now()}`, {
        headers: {Authorization: `Bearer ${localStorage.getItem("access")}`}
      })
      const data = Array.isArray(response.data)
        ? response.data
        : Array.isArray(response.data.results)
        ? response.data.results
        : [];
      console.log("Posts Encontrados:", data);
      setPosts(data);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
      setPosts([]);
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

  useEffect(() => {
    const token = localStorage.getItem("access");
    setIsLoggedIn(!!token);
    fetchPosts();
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Tem certeza que deseja sair?");
    if (confirmLogout) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      setIsLoggedIn(false);
      navigate("/");
    }
  };

  return (
    <main className={styles.mainClass}>
      <nav className={styles.nav}>
        <img src="/logoservicos.png" alt="Logo" height={80} />
        <div className={styles.navcontent}>
          <p onClick={() => document.getElementById("contato").scrollIntoView({ behavior: "smooth" })}>
            Fale Conosco
          </p>
          <p onClick={() => document.getElementById("sobre").scrollIntoView({ behavior: "smooth" })}>
            Sobre Nós
          </p>
          <p onClick={() => document.getElementById("como_funciona").scrollIntoView({ behavior: "smooth" })}>
            Como Funciona?
          </p>
          <button onClick={() => navigate("/cadastro")} type="button">Seja um Profissional</button>
          {isLoggedIn ? (
            <button onClick={handleLogout} type="button">Sair</button>
          ) : (
            <button onClick={() => navigate("/login")} type="button">Entrar</button>
          )}
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
                placeholder="Buscar profissão"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
              />
              <FaSearch className={styles.searchIcon} onClick={handleSearch} />
            </div>
          </div>
        </div>
        <div className={styles.service_type}>
          <h1 className={styles.destaque}>Principais Serviços</h1>
          <div className={styles.services_info}>
            <div className={styles.services_separator}>
              <div className={styles.circle}>
                <img className={styles.circle_icon} src="/limpezadomestica.png" alt="Icon" />
              </div>
              <p>Limpeza Domésticas</p>
            </div>
            <div className={styles.services_separator}>
              <div className={styles.circle}>
                <img className={styles.circle_icon} src="/reparo.png" alt="Icon" />
              </div>
              <p>Reparos e Manutenção</p>
            </div>
            <div className={styles.services_separator}>
              <div className={styles.circle}>
                <img className={styles.circle_icon} src="/servicoar.png" alt="Icon" />
              </div>
              <p>Serviços de Ar-Condicionado</p>
            </div>
            <div className={styles.services_separator}>
              <div className={styles.circle}>
                <img className={styles.circle_icon} src="/transporte.png" alt="Icon" />
              </div>
              <p>Mudança e Transportes</p>
            </div>
            <div className={styles.services_separator}>
              <div className={styles.circle}>
                <img className={styles.circle_icon} src="/instalacoes.png" alt="Icon" />
                
              </div>
              <p>Instalações</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section_two}>

        <div className={styles.title_unicos}>
          <span className={styles.line}></span>
          <h3 className={styles.destaque}>Conheça o que nos torna únicos</h3>
          <span className={styles.line}></span>
        </div>

        <div className={styles.div_diferenciais}>
          <div className={styles.diferencial}>
            <img className={styles.diferencial_icon} src="/seguranca.png" alt="Icon"></img>
            <h4>Segurança</h4>
            <p>Serviços à Porta com segurança e confiança, cuidando do seu lar com qualidade.</p>
          </div>

          <div className={styles.diferencial}>
            <img className={styles.diferencial_icon} src="/agendamento.png" alt="Icon"></img>
            <h4>Agendamento Ágil</h4>
            <p>Agendamento ágil e sem complicações. Seu serviço marcado em poucos cliques!"</p>
          </div>

          <div className={styles.diferencial}>
            <img className={styles.diferencial_icon} src="/servicos.png" alt="Icon"></img>
            <h4>Serviços Qualificados</h4>
            <p>Serviços qualificados para sua casa, empresa e outros com excelência e confiança.</p>
          </div>

          <div className={styles.diferencial}>
            <img className={styles.diferencial_icon} src="/suporte.png" alt="Icon"></img>
            <h4>Suporte ao Cliente</h4>
            <p>Suporte ao cliente rápido e eficiente, sempre que você precisar.</p>
          </div>
        </div>

        <div className={styles.title_unicos}>
          <span className={styles.line}></span>
          <h3 className={styles.destaque}>Blog de Serviços</h3>
          <span className={styles.line}></span>
        </div>

        <div className={styles.posts_blog}>
          {isLoading ? (
            <p>Carregando posts...</p>
          ) : posts.length > 0 ? (
            posts.slice(0,3).map((post) => (
              <div className={styles.post_home} key={post.id || Math.random()}>
                <img
                  src={post.conteudo || "/default.jpg"} 
                  alt={post.titulo || "Imagem do post"} 
                  className={styles.post_image}
                  onError={(e) => (e.target.src = "/default.jpg")} 
                />
                <h2>{post?.usuario?.nome}</h2>
                <h4>{post.titulo || "Sem título"}</h4>
              </div>
            ))
          ) : (
            <p>Nenhum post encontrado</p>
          )}
        </div>
        <button onClick={() => navigate("/posts")} className={styles.more_button} type="button">Ver Mais</button>

        <div id="como_funciona" className={styles.title_unicos}>
          <span className={styles.line}></span>
          <h3 className={styles.destaque}>Como Funciona?</h3>
          <span className={styles.line}></span>
        </div>

        <div className={styles.funciona_div}>
          <div className={styles.funciona_faxineira}>
            <img src="./faxineira.png"></img>
          </div>

          <div className={styles.funciona_info}>
            <p>
              Nosso sistema conecta pessoas que precisam de um serviço especializado a profissionais qualificados de forma simples e eficiente. <br></br>
              <span>1 Solicitação de Serviço</span> <br></br> O usuário acessa a plataforma, descreve o problema e escolhe o tipo de profissional necessário. <br></br>
              <span>2 Conexão com o Profissional</span> <br></br> O sistema exibe uma lista de profissionais disponíveis na região, permitindo ao usuário selecionar aquele que melhor atende às suas
              necessidades com base em avaliações e recomendações. <br></br>
              <span>3 Agendamento e Atendimento</span> <br></br> Após a escolha do profissional, o usuário pode agendar um horário conveniente. O profissional se desloca até o local para realizar o
              serviço de forma segura e eficiente. <br></br>
              <span>4 Finalização e Feedback</span> <br></br> Ao término do serviço, o usuário pode avaliar o profissional, ajudando outras pessoas a tomarem decisões mais seguras e
              garantindo a qualidade dos atendimentos na plataforma.
              Com um processo simples e intuitivo, garantimos rapidez, segurança e praticidade para todos os envolvidos. 🚀
            </p>
          </div>
        </div>

        <button className={styles.more_button} onClick={() => navigate("/listar")} type="button">Contratar Serviço</button>
        
        <div id="sobre" className={styles.title_unicos}>
          <span className={styles.line}></span>
          <h3 className={styles.destaque}>Sobre Nós</h3>
          <span className={styles.line}></span>
        </div>

      </section>
      <section className={styles.section_three}>
        <div className={styles.div_sobre}>
          <div className={styles.sobre_info}>
            <p>
            Na Serviços à Porta, dedicamo-nos apaixonadamente a levar praticidade
            e qualidade para o seu lar. Desde a nossa fundação, somos a escolha ideal
            para quem busca serviços eficientes e confiáveis, garantindo cuidado e
            excelência em cada detalhe. Com uma equipe experiente e comprometida,
            oferecemos diversos tipos de serviços em sua residencia, empresa, comercio
            e muito mais, sempre com agilidade e profissionalismo.
            Na Serviços à Porta, estamos empenhados em superar expectativas,
            proporcionando soluções que trazem conforto, segurança e tranquilidade
            para o seu dia a dia.
            </p>
          </div>

          <div className={styles.sobre_mecanico}>
            <img src="./mecanico.png"></img>
          </div>

        </div>

        <div id="contato" className={styles.title_unicos}>
          <span className={styles.line}></span>
          <h3 className={styles.destaque}>Contato</h3>
          <span className={styles.line}></span>
        </div>
        
        <div className={styles.div_contato}>
          <div className={styles.diferencial}>
            <img className={styles.contato_icon} src="/whatsapp.png" alt="Icon"></img>
            <h4>WhatsApp</h4>
            <p>00 1.2345 - 6789</p>
          </div>

          <div className={styles.diferencial}>
            <img className={styles.contato_icon} src="/endereco.png" alt="Icon"></img>
            <h4>Endereço</h4>
            <p>Rua Unifip, Centro,
            Patos - PB</p>
          </div>

          <div className={styles.diferencial}>
            <img className={styles.contato_icon} src="/email.png" alt="Icon"></img>
            <h4>Email</h4>
            <p>serviçosaporta@gmail.com</p>
          </div>
        </div>

      
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

export default Home;