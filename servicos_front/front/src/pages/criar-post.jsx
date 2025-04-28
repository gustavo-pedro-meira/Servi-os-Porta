import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/posts.module.css';

const CriarPost = () => {
  const [titulo, setTitulo] = useState('');
  const [imagem, setImagem] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('titulo', titulo);
    if (imagem) {
      formData.append('conteudo', imagem);
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/posts/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/posts');
    } catch (erro) {
      console.error('Erro ao criar post:', erro);
    }
  };

  return (
    <main className={styles.mainClass}>
      <section className={styles.section}>
        <nav className={styles.nav}>
          <img src="/logoservicos.png" alt="Logo" height={80} />
          <div className={styles.navcontent}>
            <p>Fale Conosco</p>
            <p>Sobre Nós</p>
            <p>Como Funciona?</p>
            <button type="button">Seja um Profissional</button>
            <button type="button">Entrar</button>
          </div>
        </nav>
      </section>

      <section className={styles.section_one}>
        <div className={styles.search_div}>
          <div className={styles.service_search}>
            <form onSubmit={handleSubmit} className={styles.form_criar_post}>
              <div className={styles.inputWrapper}>
                <textarea
                  className={styles.inputsearch}
                  placeholder="Digite o conteúdo do seu post..."
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  required
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImagem(e.target.files[0])}
                  className={styles.input_imagem}
                />
                <button type="submit" className={styles.button_publi}>
                  Publicar
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CriarPost; 