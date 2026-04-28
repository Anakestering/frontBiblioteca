import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RestaurarSenha() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [enviado, setEnviado] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
//... fetch e outras coisas la

        setEnviado(true);
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-[430px] bg-white px-14 py-16 rounded-md">

                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Recuperar Senha
                </h1>

                <p className="text-sm text-gray-600 mb-8">
                    Informe seu e-mail cadastrado para receber
                    instruções de como redefinir sua senha.
                </p>

                {!enviado ? (
                    <form onSubmit={handleSubmit}>

                        <div className="mb-6">
                            <label className="block text-sm text-gray-800 mb-2">
                                E-mail
                            </label>

                            <input
                                type="email"
                                placeholder="Digite seu e-mail"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
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


                        <button
                            type="submit"
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
                            Enviar recuperação
                        </button>

                    </form>
                ) : (
                    <div className="space-y-6">

                        <div className="
                            bg-green-50
                            border
                            border-green-300
                            rounded-md
                            p-4
                            text-sm
                            text-green-700
                        ">
                            Se o e-mail existir no sistema,
                            enviamos instruções de recuperação.
                        </div>

                        <button
                            onClick={() => navigate("/")}
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
                            Voltar para login
                        </button>

                    </div>
                )}

                <div className="mt-5 text-sm">
                    <button
                        onClick={() => navigate("/")}
                        className="text-blue-700 hover:underline"
                    >
                        Voltar ao login
                    </button>
                </div>

            </div>
        </div>
    );
}