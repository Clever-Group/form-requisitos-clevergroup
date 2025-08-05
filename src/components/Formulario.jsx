import { useState } from "react";
import { Switch } from "@headlessui/react";
import { validarFormulario } from './validation';

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProjectForm() {
  const [erros, setErros] = useState({});
  const [form, setForm] = useState({
    nome: "",
    cnpj: "",
    responsavel: "",
    email: "",
    telefone: "",
    redesSociais: "",
    objetivo: "",
    produtos: "",
    variacoes: "",
    pagamentoExterno: "",
    identidadeVisual: false,
    referencias: "",
    estilo: "",
    carrinho: false,
    redirecionamentoPagamento: false,
    traducao: false,
    idiomas: "",
    pluginTraducao: "",
    formularioContato: false,
    emailMarketing: false,
    dispositivos: {
      celular: false,
      tablet: false,
      computador: false,
    },
    acessibilidade: "",
    dominio: "",
    hospedagem: "",
    tecnologia: "",
    manual: false,
    suporte: "",
    autoGerenciamento: false,
    prazo: "",
    orcamento: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const toggleSwitch = (field) => {
    setForm((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const toggleDispositivo = (field) => {
    setForm((prev) => ({
      ...prev,
      dispositivos: {
        ...prev.dispositivos,
        [field]: !prev.dispositivos[field],
      },
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const erros = validarFormulario(form);
    if (Object.keys(erros).length) {
      setErros(erros);
      alert("Por favor, corrija os erros antes de enviar.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("http://localhost:3000/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
  
      if (response.ok) {
        setSubmitStatus("success");
        alert("Dados enviados com sucesso!");
        setForm(initialFormState);
      } else {
        setSubmitStatus("error");
        alert("Erro ao enviar os dados. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao enviar:", error);
      setSubmitStatus("error");
      alert("Erro ao enviar os dados. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };  

  return (
    <form className="max-w-3xl mx-auto p-6 space-y-8 text-gray-800 dark:text-white">
      <h2 className="text-2xl font-bold text-center">Formulário de Requisitos</h2>
  
      {/* infos gerais */}
      <fieldset className="space-y-4">
        <legend className="text-xl font-semibold">🧾 Informações Gerais</legend>
  
        <input
          type="text"
          name="nome"
          placeholder="Nome da empresa/marca"
          className="input"
          onChange={handleChange}
        />
        {erros.nome && <p className="text-red-600 text-sm">{erros.nome}</p>}
  
        <input
          type="text"
          name="cnpj"
          placeholder="CNPJ ou CPF"
          className="input"
          onChange={handleChange}
        />
        {erros.cnpj && <p className="text-red-600 text-sm">{erros.cnpj}</p>}
  
        <input
          type="text"
          name="responsavel"
          placeholder="Nome do responsável"
          className="input"
          onChange={handleChange}
        />
        {erros.responsavel && <p className="text-red-600 text-sm">{erros.responsavel}</p>}
  
        <input
          type="email"
          name="email"
          placeholder="Email de contato"
          className="input"
          onChange={handleChange}
        />
        {erros.email && <p className="text-red-600 text-sm">{erros.email}</p>}
  
        <input
          type="tel"
          name="telefone"
          placeholder="Telefone / WhatsApp"
          className="input"
          onChange={handleChange}
        />
        {erros.telefone && <p className="text-red-600 text-sm">{erros.telefone}</p>}
  
        <input
          type="text"
          name="redesSociais"
          placeholder="Redes sociais (opcional)"
          className="input"
          onChange={handleChange}
        />
      </fieldset>
  
      {/* sobre o projeto */}
      <fieldset className="space-y-4">
        <legend className="text-xl font-semibold">🌐 Sobre o Projeto</legend>
        <textarea
          name="objetivo"
          placeholder="Qual o objetivo da landing page?"
          className="textarea"
          onChange={handleChange}
        />
        {erros.objetivo && <p className="text-red-600 text-sm">{erros.objetivo}</p>}
  
        <textarea
          name="produtos"
          placeholder="Quais produtos ou serviços serão vendidos?"
          className="textarea"
          onChange={handleChange}
        />
        {erros.produtos && <p className="text-red-600 text-sm">{erros.produtos}</p>}
  
        <input
          type="text"
          name="variacoes"
          placeholder="Quantos produtos estarão disponíveis?"
          className="input"
          onChange={handleChange}
        />
        {erros.variacoes && <p className="text-red-600 text-sm">{erros.variacoes}</p>}
  
        <SwitchField
          label="Plataforma de pagamento ?"
          enabled={form.pagamentoExterno}
          onChange={() => toggleSwitch("pagamentoExterno")}
        />
      </fieldset>
  
      {/* design e identidade visual */}
      <fieldset className="space-y-4">
        <legend className="text-xl font-semibold">🖌️ Design e Identidade Visual</legend>
        <SwitchField
          label="Já possui identidade visual?"
          enabled={form.identidadeVisual}
          onChange={() => toggleSwitch("identidadeVisual")}
        />
        <textarea
          name="referencias"
          placeholder="Links ou prints de referência"
          className="textarea"
          onChange={handleChange}
        />
        {erros.referencias && <p className="text-red-600 text-sm">{erros.referencias}</p>}
  
        <input
          type="text"
          name="estilo"
          placeholder="Preferência de estilo (moderno, clássico...)"
          className="input"
          onChange={handleChange}
        />
        {erros.estilo && <p className="text-red-600 text-sm">{erros.estilo}</p>}
      </fieldset>
  
      {/* funcionalidades */}
      <fieldset className="space-y-4">
        <legend className="text-xl font-semibold">🧩 Funcionalidades</legend>
        <SwitchField
          label="Sistema de carrinho"
          enabled={form.carrinho}
          onChange={() => toggleSwitch("carrinho")}
        />
        <SwitchField
          label="Redirecionamento para pagamento externo"
          enabled={form.redirecionamentoPagamento}
          onChange={() => toggleSwitch("redirecionamentoPagamento")}
        />
        <SwitchField
          label="Tradução automática do conteúdo"
          enabled={form.traducao}
          onChange={() => toggleSwitch("traducao")}
        />
        <input
          type="text"
          name="idiomas"
          placeholder="Quais idiomas?"
          className="input"
          onChange={handleChange}
        />
        {erros.idiomas && <p className="text-red-600 text-sm">{erros.idiomas}</p>}
  
        <input
          type="text"
          name="pluginTraducao"
          placeholder="Plugin de tradução preferido"
          className="input"
          onChange={handleChange}
        />
        {erros.pluginTraducao && <p className="text-red-600 text-sm">{erros.pluginTraducao}</p>}
  
        <SwitchField
          label="Formulário de contato / leads"
          enabled={form.formularioContato}
          onChange={() => toggleSwitch("formularioContato")}
        />
        <SwitchField
          label="Integração com e-mail marketing?"
          enabled={form.emailMarketing}
          onChange={() => toggleSwitch("emailMarketing")}
        />
      </fieldset>
  
      {/* Responsividade */}
      <fieldset className="space-y-4">
        <legend className="text-xl font-semibold">📱 Responsividade</legend>
        <SwitchField
          label="Celular"
          enabled={form.dispositivos.celular}
          onChange={() => toggleDispositivo("celular")}
        />
        <SwitchField
          label="Tablet"
          enabled={form.dispositivos.tablet}
          onChange={() => toggleDispositivo("tablet")}
        />
        <SwitchField
          label="Computador"
          enabled={form.dispositivos.computador}
          onChange={() => toggleDispositivo("computador")}
        />
        <SwitchField
          label="Acessibilidade"
          enabled={form.acessibilidade}
          onChange={() => toggleSwitch("acessibilidade")}
        />
        {erros.acessibilidade && <p className="text-red-600 text-sm">{erros.acessibilidade}</p>}
        {erros.dispositivos && <p className="text-red-600 text-sm">{erros.dispositivos}</p>}
      </fieldset>
  
      {/* hospedagem e dominio */}
      <fieldset className="space-y-4">
        <legend className="text-xl font-semibold">🧑‍💻 Hospedagem e Domínio</legend>
        <SwitchField
          label="Já possui domínio?"
          enabled={form.dominio}
          onChange={() => toggleSwitch("dominio")}
        />
        {erros.dominio && <p className="text-red-600 text-sm">{erros.dominio}</p>}
  
        <SwitchField
          label="Já possui hospedagem?"
          enabled={form.hospedagem}
          onChange={() => toggleSwitch("hospedagem")}
        />
        {erros.hospedagem && <p className="text-red-600 text-sm">{erros.hospedagem}</p>}
  
        <input
          type="text"
          name="tecnologia"
          placeholder="Tecnologia/CMS preferido?"
          className="input"
          onChange={handleChange}
        />
        {erros.tecnologia && <p className="text-red-600 text-sm">{erros.tecnologia}</p>}
      </fieldset>
  
      {/* entrega e suporte */}
      <fieldset className="space-y-4">
        <legend className="text-xl font-semibold">📦 Entrega e Suporte</legend>
        <SwitchField
          label="Manual de uso"
          enabled={form.manual}
          onChange={() => toggleSwitch("manual")}
        />
  
        <input
          type="text"
          name="suporte"
          placeholder="Suporte pós-entrega por quanto tempo?"
          className="input"
          onChange={handleChange}
        />
        {erros.suporte && <p className="text-red-600 text-sm">{erros.suporte}</p>}
  
        <SwitchField
          label="Auto gerenciamento do conteúdo?"
          enabled={form.autoGerenciamento}
          onChange={() => toggleSwitch("autoGerenciamento")}
        />
      </fieldset>
  
      {/* prazos e orçamento */}
      <fieldset className="space-y-4">
        <legend className="text-xl font-semibold">🗓️ Prazos e Orçamento</legend>
        <input
          type="text"
          name="prazo"
          placeholder="Prazo de entrega desejado"
          className="input"
          onChange={handleChange}
        />
        {erros.prazo && <p className="text-red-600 text-sm">{erros.prazo}</p>}
  
        <input
          type="text"
          name="orcamento"
          placeholder="Orçamento estimado"
          className="input"
          onChange={handleChange}
        />
        {erros.orcamento && <p className="text-red-600 text-sm">{erros.orcamento}</p>}
      </fieldset>
  
      <button
        type="submit"
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
      >
        Enviar Formulário
      </button>
    </form>
  );
  
}

function SwitchField({ label, enabled, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium">{label}</label>
      <Switch
        checked={enabled}
        onChange={onChange}
        className={classNames(
          enabled ? "bg-indigo-600" : "bg-gray-300 dark:bg-gray-600",
          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
        )}
      >
        <span
          className={classNames(
            enabled ? "translate-x-6" : "translate-x-1",
            "inline-block h-4 w-4 transform rounded-full bg-white transition"
          )}
        />
      </Switch>
    </div>
  );
}
