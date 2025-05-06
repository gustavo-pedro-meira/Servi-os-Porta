import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/homepage.jsx";
import Bio from "./pages/bio.jsx";
import ListaProfissionais from "./pages/listar.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Posts from "./pages/posts.jsx";
import CadastroProfissional from "./pages/cadastro.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bio" element={<Bio />} />
        <Route path="/listar" element={<ListaProfissionais />}/>
        <Route path="/posts" element={<Posts />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cadastro" element={<CadastroProfissional />} />
      </Routes>
    </Router>
  );
};

export default App;
