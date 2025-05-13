import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../styles/register.module.css";

const Register = () => {
    const [nome, setNome] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmarPassword, setConfirmarPassword] = useState("");
    const [numero, setNumero] = useState("");
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
        formData.append("cpf", cpf);
        formData.append("dataNascimento", dataNascimento);

        setIsLoading(true);
        try {
            const response = await axios.post(`http://localhost:8000/api/clientes/?t=${Date.now()}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            console.log(response.data);
        } catch (error) {
            console.error("Erro ao cadastrar cliente", error);
            if (error.response) {
                console.log("Erro detalhado:", error.response.data);
                setErro(JSON.stringify(error.response.data)); // Mostra os campos com problema
            } else {
                setErro("Erro ao cadastrar cliente");
            }
        } finally {
            setIsLoading(false);
        }

        navigate("/login");
    }

    return (
        <main>
            <section className={styles.login}>
                <div className={styles.logincontainer}>
                    <div className={styles.toregister}>
                        <div className={styles.registercontent}>
                            <h3 className={styles["white-letter"]}>
                                Bem-vindo <br /> de volta!
                            </h3>
                            <p>
                                Acesse sua conta <br /> agora mesmo
                            </p>
                            <a className={styles.loginaccount} href="/login">
                                <button className={styles.registerbutton} type="button">Entrar</button>
                            </a>
                            <a className={styles.forgotpassword} href="#">Esqueci minha senha.</a>
                        </div>
                    </div>

                    <div className={styles.loginimage}>
                        <img
                            className={styles.imgeng}
                            src="/Engenheiro.png"
                            alt="engenheiro-imagem"
                        />
                    </div>

                    <div className={styles.loginforms}>
                        <h1>Crie sua conta</h1>
                        <p>Preencha seus dados</p>

                        <div className={styles.inputcontainer}>
                            <i className="fas fa-user"></i>
                            <input
                                placeholder="Nome"
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </div>

                        <div className={styles.inputcontainer}>
                            <i className="fas fa-lock"></i>
                            <input
                                id="cpf"
                                placeholder="CPF"
                                type="text"
                                value={cpf}
                                onChange={(e) => setCpf(e.target.value)}
                            />
                            <i
                                id="toggle-cpf"
                                className="fas fa-eye"
                                style={{ cursor: "pointer" }}
                            ></i>
                        </div>

                        <div className={styles.inputcontainer}>
                            <i className="fas fa-lock"></i>
                            <input
                                id="dataNascimento"
                                placeholder="Data de Nascimento"
                                type="date"
                                value={dataNascimento}
                                onChange={(e) => setDataNascimento(e.target.value)}
                                style={{ color: dataNascimento === "" ? "gray" : "black"}}
                            />
                            <i
                                id="toggle-dataNascimento"
                                className="fas fa-eye"
                                style={{ cursor: "pointer" }}
                            ></i>
                        </div>

                        <div className={styles.inputcontainer}>
                            <i className="fas fa-envelope"></i>
                            <input
                                placeholder="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className={styles.inputcontainer}>
                            <i className="fas fa-user"></i>
                            <input
                                placeholder="Usuário"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className={styles.inputcontainer}>
                            <i className="fas fa-lock"></i>
                            <input
                                id="password"
                                placeholder="Senha"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <i
                                id="toggle-password"
                                className="fas fa-eye"
                                style={{ cursor: "pointer" }}
                            ></i>
                        </div>

                        <div className={styles.inputcontainer}>
                            <i className="fas fa-lock"></i>
                            <input
                                id="confirmarPassword"
                                placeholder="Confirmar Senha"
                                type="password"
                                value={confirmarPassword}
                                onChange={(e) => setConfirmarPassword(e.target.value)}
                            />
                            <i
                                id="toggle-confirmar-password"
                                className="fas fa-eye"
                                style={{ cursor: "pointer" }}
                            ></i>
                        </div>

                        <div className={styles.inputcontainer}>
                            <i className="fas fa-lock"></i>
                            <input
                                id="numero"
                                placeholder="Numero"
                                type="text"
                                value={numero}
                                onChange={(e) => setNumero(e.target.value)}
                            />
                            <i
                                id="toggle-numero"
                                className="fas fa-eye"
                                style={{ cursor: "pointer" }}
                            ></i>
                        </div>

                        {/* {error && <p style={{ color: "red" }}>{error}</p>}
                        {success && <p style={{ color: "green" }}>{success}</p>} */}

                        <button onClick={handleSubmit} className={styles.cadastrar_button}>
                            Cadastrar
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Register;
