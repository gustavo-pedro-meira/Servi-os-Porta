import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/register.module.css";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleRegister = async () => {
        console.log("handleRegister foi chamado");
        
        try {
            await axios.post("http://127.0.0.1:8000/api/register/", {
                username: username,
                email: email,
                password: password,
            });
            setSuccess("Cadastro realizado com sucesso!");
            setError("");
        } catch (err) {
            setError("Erro ao cadastrar.");
            setSuccess("");
        }
    };

    useEffect(() => {
        document.body.classList.add(styles.registerBody);
        return () => {
            document.body.classList.remove(styles.registerBody);
        };
    }, []);

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
                                placeholder="Usuário"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
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
                            <i className="fas fa-lock"></i>
                            <input
                                id="password"
                                placeholder="Senha"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <i
                                id="toggle-password"
                                className="fas fa-eye"
                                onClick={togglePassword}
                                style={{ cursor: "pointer" }}
                            ></i>
                        </div>

                        {error && <p style={{ color: "red" }}>{error}</p>}
                        {success && <p style={{ color: "green" }}>{success}</p>}

                        <button onClick={handleRegister} className={styles.cadastrar_button}>
                            Cadastrar
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Register;
