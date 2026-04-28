import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nome: "",
        nascimento: "",
        cpf: "",

        cep: "",
        cidade: "",
        rua: "",
        bairro: "",

        email: "",
        usuario: "",
        senha: "",
        confirmarSenha: ""
    });

    const [erro, setErro] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

    const senhasDiferentes =
        form.confirmarSenha &&
        form.senha !== form.confirmarSenha;


    async function buscarCep(cepDigitado) {
        setErro("");

        try {
            const resposta = await fetch(
                `https://viacep.com.br/ws/${cepDigitado}/json/`
            );

            const dados = await resposta.json();

            if (dados.erro) {
                setErro("CEP não encontrado");
                return;
            }

            setForm(prev => ({
                ...prev,
                rua: dados.logradouro || "",
                bairro: dados.bairro || "",
                cidade: dados.localidade || ""
            }));

        } catch {
            setErro("Erro ao buscar CEP");
        }
    }


    async function handleChange(e) {
        let { name, value } = e.target;

        // máscara CPF
        if (name === "cpf") {
            value = value
                .replace(/\D/g, "")
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
                .slice(0, 14);
        }

        // máscara CEP
        if (name === "cep") {
            value = value
                .replace(/\D/g, "")
                .replace(/(\d{5})(\d)/, "$1-$2")
                .slice(0, 9);
        }

        setForm(prev => ({
            ...prev,
            [name]: value
        }));


        // busca automática do CEP
        if (name === "cep") {
            const cepNumerico = value.replace(/\D/g, "");

            if (cepNumerico.length === 8) {
                buscarCep(cepNumerico);
            }
        }
    }


    async function handleSubmit(e) {
        e.preventDefault();

        if (senhasDiferentes) return;

        try {

            const resposta = await fetch(
                "http://localhost:8080/usuarios/cadastro",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        ...form,
                        cpf: form.cpf.replace(/\D/g, "")
                    })
                }
            );

            if (!resposta.ok) {
                throw new Error("Erro no cadastro");
            }

            alert("Usuário cadastrado!");
            navigate("/");

        } catch (err) {
            alert("Erro ao cadastrar");
            console.error(err);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center py-10">
            <div className="w-[650px] bg-white rounded-md shadow-md p-10">

                <h1 className="text-3xl font-bold mb-8">
                    Cadastro de Usuário
                </h1>


                <form onSubmit={handleSubmit} className="space-y-8">


                    {/* DADOS PESSOAIS */}
                    <div>
                        <h2 className="text-xl font-semibold mb-5 border-b pb-2">
                            Dados Pessoais
                        </h2>

                        <div className="grid grid-cols-2 gap-5">

                            <div className="col-span-2">
                                <label className="block mb-2 font-medium">
                                    Nome Completo *
                                </label>

                                <input
                                    name="nome"
                                    value={form.nome}
                                    onChange={handleChange}
                                    required
                                    className="w-full h-12 border rounded-md px-4"
                                />
                            </div>


                            <div>
                                <label className="block mb-2 font-medium">
                                    Data de Nascimento
                                </label>

                                <input
                                    type="date"
                                    name="nascimento"
                                    value={form.nascimento}
                                    onChange={handleChange}
                                    className="w-full h-12 border rounded-md px-4"
                                />
                            </div>


                            <div>
                                <label className="block mb-2 font-medium">
                                    CPF *
                                </label>

                                <input
                                    name="cpf"
                                    value={form.cpf}
                                    onChange={handleChange}
                                    maxLength={14}
                                    required
                                    placeholder="000.000.000-00"
                                    className="w-full h-12 border rounded-md px-4"
                                />
                            </div>

                        </div>
                    </div>



                    {/* ENDEREÇO */}
                    <div>
                        <h2 className="text-xl font-semibold mb-5 border-b pb-2">
                            Endereço
                        </h2>

                        <div className="grid grid-cols-2 gap-5">

                            <div>
                                <input
                                    name="cep"
                                    placeholder="CEP"
                                    value={form.cep}
                                    onChange={handleChange}
                                    className="w-full h-12 border rounded-md px-4"
                                />

                                {erro && (
                                    <p className="text-red-600 text-sm mt-2">
                                        {erro}
                                    </p>
                                )}
                            </div>


                            <input
                                name="cidade"
                                placeholder="Cidade"
                                value={form.cidade}
                                onChange={handleChange}
                                className="h-12 border rounded-md px-4"
                            />

                            <input
                                name="rua"
                                placeholder="Rua"
                                value={form.rua}
                                onChange={handleChange}
                                className="col-span-2 h-12 border rounded-md px-4"
                            />

                            <input
                                name="bairro"
                                placeholder="Bairro"
                                value={form.bairro}
                                onChange={handleChange}
                                className="col-span-2 h-12 border rounded-md px-4"
                            />

                        </div>
                    </div>



                    {/* ACESSO */}
                    <div>
                        <h2 className="text-xl font-semibold mb-5 border-b pb-2">
                            Dados de Acesso
                        </h2>

                        <div className="space-y-5">

                            <div>
                                <label className="block mb-2 font-medium">
                                    E-mail *
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full h-12 border rounded-md px-4"
                                />
                            </div>


                            <div>
                                <label className="block mb-2 font-medium">
                                    Usuário *
                                </label>

                                <input
                                    name="usuario"
                                    required
                                    value={form.usuario}
                                    onChange={handleChange}
                                    className="w-full h-12 border rounded-md px-4"
                                />
                            </div>



                            {/* SENHA */}
                            <div>
                                <label className="block mb-2 font-medium">
                                    Senha *
                                </label>

                                <div className="relative">
                                    <input
                                        type={mostrarSenha ? "text" : "password"}
                                        name="senha"
                                        required
                                        value={form.senha}
                                        onChange={handleChange}
                                        className="w-full h-12 border rounded-md px-4 pr-20"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setMostrarSenha(!mostrarSenha)
                                        }
                                        className="absolute right-4 top-3 text-blue-700 text-sm"
                                    >
                                        {mostrarSenha ? "Ocultar" : "Ver"}
                                    </button>
                                </div>
                            </div>



                            {/* CONFIRMAR SENHA */}
                            <div>
                                <label className="block mb-2 font-medium">
                                    Confirmar Senha *
                                </label>

                                <div className="relative">
                                    <input
                                        type={
                                            mostrarConfirmacao
                                                ? "text"
                                                : "password"
                                        }
                                        name="confirmarSenha"
                                        required
                                        value={form.confirmarSenha}
                                        onChange={handleChange}
                                        className="w-full h-12 border rounded-md px-4 pr-20"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setMostrarConfirmacao(
                                                !mostrarConfirmacao
                                            )
                                        }
                                        className="absolute right-4 top-3 text-blue-700 text-sm"
                                    >
                                        {mostrarConfirmacao
                                            ? "Ocultar"
                                            : "Ver"}
                                    </button>
                                </div>

                                {senhasDiferentes && (
                                    <p className="text-red-600 text-sm mt-2">
                                        As senhas não são iguais
                                    </p>
                                )}
                            </div>

                        </div>
                    </div>



                    <div className="flex gap-4 pt-4">

                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="
                flex-1
                h-12
                border-2
                border-gray-400
                rounded-md
              "
                        >
                            Voltar
                        </button>


                        <button
                            type="submit"
                            disabled={senhasDiferentes}
                            className="
                flex-1
                h-12
                bg-blue-700
                disabled:bg-gray-400
                text-white
                rounded-md
                font-semibold
              "
                        >
                            Cadastrar
                        </button>

                    </div>

                </form>

            </div>
        </div>
    );
}