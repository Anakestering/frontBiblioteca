import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-[430px] bg-white px-14 py-16 rounded-md">

                <h1 className="text-3xl font-bold text-gray-900 mb-10">
                    Bem-vindo ao AVA!
                </h1>

                {/* Usuário */}
                <div className="mb-5">
                    <label className="block text-sm text-gray-800 mb-2">
                        Identificação de usuário
                    </label>

                    <input
                        type="text"
                        placeholder="Digite seu usuário"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        className="
              w-full
              h-12
              border border-gray-400
              rounded-sm
              px-4
              focus:outline-none
              focus:border-blue-600
            "
                    />
                </div>

                {/* Senha */}
                <div className="mb-6">
                    <label className="block text-sm text-gray-800 mb-2">
                        Senha
                    </label>

                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        className="
              w-full
              h-12
              border border-gray-400
              rounded-sm
              px-4
              focus:outline-none
              focus:border-blue-600
            "
                    />
                </div>

                {/* Botão login */}
                <button
                    className="
            w-full
            h-12
            bg-blue-700
            hover:bg-blue-800
            text-white
            font-semibold
            rounded-md
            transition
          "
                >
                    Acessar
                </button>

                {/* Links abaixo */}
                <div className="flex justify-between items-center mt-5 text-sm">
                    <button className="text-blue-700 hover:underline">
                        Esqueceu sua senha?
                    </button>

                    <button className="text-blue-700  hover:underline"
                     onClick={() => navigate("/cadastro")}>
                        Não é cadastrado?
                    </button>
                </div>

            </div>
        </div>
    );
}