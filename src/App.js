import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Cadastro from "./components/Cadastro";
import RestaurarSenha from "./components/RestaurarSenha";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/restaurarSenha" element={<RestaurarSenha/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
