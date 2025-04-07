import React, { useState, useEffect } from "react";
import styles from "../styles/login.module.css";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
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
                                <input placeholder="Email" type="email" />
                            </div>

                            <div className={styles.inputcontainer}>
                                <i className="fas fa-lock"></i>
                                <input
                                    id="password"
                                    placeholder="Senha"
                                    type={showPassword ? "text" : "password"}
                                />
                                <i
                                    id="toggle-password"
                                    className="fas fa-eye"
                                    onClick={togglePassword}
                                    style={{ cursor: "pointer" }}
                                ></i>
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
                                <a className={styles.registeraccount} href="register.html">
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
