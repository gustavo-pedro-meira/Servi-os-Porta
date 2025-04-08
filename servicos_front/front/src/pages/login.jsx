import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/login.module.css";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/token/", {
                username: email,
                password: password,
            });
            localStorage.setItem("access", response.data.access);
            localStorage.setItem("refresh", response.data.refresh);
            alert("Login bem-sucedido!");
            navigate("/");
        } catch (err) {
            setError("Credenciais inválidas.");
        }
    };

    useEffect(() => {
        document.body.classList.add(styles.loginBody);
        return () => {
            document.body.classList.remove(styles.loginBody);
        };
    }, []);

    return (
        <main>
            <section className={styles.login}>
                <div className={styles.card}>
                    <div className={styles.logincontainer}>
                        <div className={styles.loginforms}>
                            <h1>Faça o Login</h1>
                            <p>Preencha seus dados</p>

                            <div className={styles.inputcontainer}>
                                <i className="fas fa-envelope"></i>
                                <input
                                    placeholder="Usuário"
                                    type="text"
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
                                {error && <p style={{ color: "red" }}>{error}</p>}

                                <button onClick={handleLogin} className={styles.loginbutton}>
                                    Entrar
                                </button>
                            </div>

                            
                        </div>

                        <div className={styles.loginimage}>
                            <img
                                className={styles.imgeng}
                                src="/Engenheiro.png"
                                alt="engenheiro-imagem"
                            />
                        </div>

                        <div className={styles.toregister}>
                            <div className={styles.registercontent}>
                                <h3 className={styles.whiteletter}>
                                    Ainda não <br /> tem uma conta?
                                </h3>
                                <p>Crie agora mesmo.</p>
                                <a className={styles.registeraccount} href="/register">
                                    <button className={styles.registerbutton} type="button">
                                        Cadastrar
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Login;
