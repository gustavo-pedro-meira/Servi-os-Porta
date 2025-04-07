import React, { useState, useEffect } from "react";
import styles from "../styles/register.module.css";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
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
                            <a className={styles.loginaccount} href="login.html">
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
                            <input placeholder="Nome" type="text" />
                        </div>

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

                </div>
            </section>
        </main>
    );
};

export default Register;
