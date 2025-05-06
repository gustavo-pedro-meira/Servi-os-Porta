import React from "react";
import {useState} from "react";
import styles from "../styles/cadastro.module.css";
import {Navigate, useNavigate} from "react-router-dom";
import axios, { formToJSON } from "axios";

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
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro("");

        if (password !== confirmarPassword) {
            setErro("As senhas não conferem");
            return;
        }

        if (!nome || !email || !username || !cpf) {
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
            const response = await axios.post("http://localhost:8000/api/profissionais/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            console.log(response.data);
            setNavigate(true);
        } catch (error) {
            console.error("Erro ao cadastrar profissional", error);
            if (error.response) {
                console.log("Erro detalhado:", error.response.data);
                setErro(JSON.stringify(error.response.data)); // Mostra os campos com problema
            } else {
                setErro("Erro ao cadastrar profissional");
            }
        } finally {
            setIsLoading(false);
        }

        navigate("/login");
    }

    return (
        <main className={StyleSheet.mainClass}>
            
            <section className={styles.section}>
                <nav className={styles.nav}>
                <img src="/logoservicos.png" alt="Logo" height={80} />
                <div className={styles.navcontent}>
                    <p>Fale Conosco</p>
                    <p>Sobre Nós</p>
                    <p>Como Funciona?</p>
                    <button type="button" onClick={() => navigate("/login")}>
                    Entrar
                    </button>
                </div>
                </nav>
            </section>

            <div>
            <h1>Cadastro de Profissional</h1>
            {erro && <p style={{ color: "red" }}>{erro}</p>}
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
                {/* Adicione outros campos conforme necessário */}
                <input
                type="file"
                onChange={(e) => setFotoPerfil(e.target.files[0])}
                />
                <input
                type="date"
                placeholder="Data de Nascimento"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
                />
                <input
                type="date"
                placeholder="Data de Inicio"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
                />
                <input
                type="text"
                placeholder="CEP"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                />
                <select value={nivelProfissional} onChange={(e) => setNivelProfissional(e.target.value)}>
                    <option value="">Selecione o nível</option>
                    <option value="I">Iniciante</option>
                    <option value="Q">Qualificado</option>
                    <option value="P">Profissional</option>
                </select>

                <input
                type="text"
                placeholder="Descrição"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                />
                <input
                type="text"
                placeholder="Número"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                />
                <select value={idProfissao} onChange={(e) => setIdProfissao(e.target.value)}>
                    <option value="">Selecione uma profissão</option>
                    <option value="2">Pedreiro</option>
                </select>
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
                <button type="submit" disabled={isLoading}>
                {isLoading ? "Enviando..." : "Cadastrar"}
                </button>
            </form>
            </div>
        </main>
      );
    };
    
export default CadastroProfissional;