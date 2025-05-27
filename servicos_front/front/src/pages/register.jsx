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

    // Função para validar a senha
    const validatePassword = (password) => {
        if (password.length < 8) {
            return alert("A senha deve ter pelo menos 8 caracteres.");
        }
        if (!/[A-Z]/.test(password)) {
            return alert("A senha deve conter pelo menos uma letra maiúscula.");
        }
        if (!/[0-9]/.test(password)) {
            return alert("A senha deve conter pelo menos um número.");
        }
        if (!/[!@#$%^&*]/.test(password)) {
            return alert("A senha deve conter pelo menos um caractere especial (!, @, #, $, %, ^, &, *).");
        }
        if (/\s/.test(password)) {
            return alert("A senha não pode conter espaços.");
        }
        return null;
    };

    // Função para validar a idade
    const validateAge = (dataNascimento) => {
        const today = new Date();
        const birthDate = new Date(dataNascimento);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age < 18) {
            return alert("A pessoa deve ter pelo menos 18 anos.");
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro("");

        // Verifica se as senhas coincidem
        if (password !== confirmarPassword) {
            alert("As senhas não conferem");
            return;
        }

        // Verifica se os campos obrigatórios estão preenchidos
        if (!nome || !email || !username || !cpf || !dataNascimento) {
            alert("Por favor, preencha todos os campos obrigatórios");
            return;
        }

        // Valida a senha
        const passwordError = validatePassword(password);
        if (passwordError) {
            alert(passwordError);
            return;
        }

        // Valida a idade
        const ageError = validateAge(dataNascimento);
        if (ageError) {
            alert(ageError);
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
            });
            console.log(response.data);
            navigate("/login");
        } catch (error) {
            console.error("Erro ao cadastrar cliente", error);
            if (error.response) {
                console.log("Erro detalhado:", error.response.data);
                // setErro(JSON.stringify(error.response.data));
            } else {
                setErro("Erro ao cadastrar cliente");
            }
        } finally {
            setIsLoading(false);
        }
    };

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

                        {erro && <p style={{ color: "red" }}>{erro}</p>}

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
                                style={{ color: dataNascimento === "" ? "gray" : "black" }}
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

                        <button onClick={handleSubmit} className={styles.cadastrar_button} disabled={isLoading}>
                            {isLoading ? "Cadastrando..." : "Cadastrar"}
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Register;