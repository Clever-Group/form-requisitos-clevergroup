import { useState } from "react";
import { Switch } from "@headlessui/react";
import { toast } from 'react-toastify';

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProjectForm() {
  const initialFormState = {
    nome: "",
    cnpj: "",
    responsavel: "",
    email: "",
    telefone: "",
    redesSociais: "",
    objetivo: "",
    produtos: "",
    variacoes: "",
    pagamentoExterno: false,
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
    acessibilidade: false,
    dominio: false,
    hospedagem: false,
    tecnologia: "",
    manual: false,
    suporte: "",
    autoGerenciamento: false,
    prazo: "",
    orcamento: "",
    imagens_produtos: "",
    textos_descritivos: "",
    links_conteudos: "",
    materiais_apoio: "",
    localHospedagem: "",
    tempoSuporte: "",
  };
  
  const [form, setForm] = useState(initialFormState);

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
        toast.success("Formulário enviado com sucesso!");
        setForm(initialFormState);
      } else {
        setSubmitStatus("error");
        toast.error("Erro ao enviar os dados.");
      }
    } catch (error) {
      console.error("Erro ao enviar:", error);
      setSubmitStatus("error");
      toast.error("Erro de conexão. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };  

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 space-y-8 text-gray-800 dark:text-white">
      <h2 className="text-2xl font-bold text-center">Formulário de Requisitos</h2>

      {/* infos gerais */}
      <fieldset className="space-y-4">
        <legend className="text-xl font-semibold">🧾 Informações Gerais</legend>
        <input type="text" name="nome" value={form.nome} placeholder="Nome da empresa/marca" className="input" onChange={handleChange} />
        <input type="text" name="cnpj" value={form.cnpj} placeholder="CNPJ ou CPF" className="input" onChange={handleChange} />
        <input type="text" name="responsavel" value={form.responsavel} placeholder="Nome do responsável" className="input" onChange={handleChange} />
        <input type="email" name="email" value={form.email} placeholder="Email de contato" className="input" onChange={handleChange} />
        <input type="tel" name="telefone" value={form.telefone} placeholder="Telefone / WhatsApp" className="input" onChange={handleChange} />
        <input type="text" name="redesSociais" value={form.redesSociais} placeholder="Redes sociais (opcional)" className="input" onChange={handleChange} />
      </fieldset>

      {/* sobre o projeto */}
      <fieldset className="space-y-4">
        <legend className="text-xl font-semibold">🌐 Sobre o Projeto</legend>
        <textarea name="objetivo" value={form.objetivo} placeholder="Qual o objetivo da landing page?" className="textarea" onChange={handleChange} />
        <textarea name="produtos" value={form.produtos} placeholder="Quais produtos ou serviços serão vendidos?" className="textarea" onChange={handleChange} />
        <input type="text" name="variacoes" value={form.variacoes} placeholder="Quantos produtos estarão disponíveis?" className="input" onChange={handleChange} />
        <SwitchField label="Plataforma de pagamento ?" enabled={form.pagamentoExterno} onChange={() => toggleSwitch("pagamentoExterno")} />
      </fieldset>

      {/* design e identidade visual */}
      <fieldset className="space-y-4">
        <legend className="text-xl font-semibold">🖌️ Design e Identidade Visual</legend>
        <SwitchField label="Já possui identidade visual?" enabled={form.identidadeVisual} onChange={() => toggleSwitch("identidadeVisual")} />
        <textarea name="referencias" value={form.referecias} placeholder="Links ou prints de referência" className="textarea" onChange={handleChange} />
        <input type="text" name="estilo" value={form.estilo} placeholder="Preferência de estilo (moderno, clássico...)" className="input" onChange={handleChange} />
      </fieldset>

      {/* funcionalidades */}
      <fieldset className="space-y-4">
        <legend className="text-xl font-semibold">🧩 Funcionalidades</legend>
        <SwitchField label="Sistema de carrinho" enabled={form.carrinho} onChange={() => toggleSwitch("carrinho")} />
        <SwitchField label="Redirecionamento para pagamento externo" enabled={form.redirecionamentoPagamento} onChange={() => toggleSwitch("redirecionamentoPagamento")} />
        <SwitchField label="Tradução automática do conteúdo" enabled={form.traducao} onChange={() => toggleSwitch("traducao")} />
        <input type="text" name="idiomas" value={form.idiomas} placeholder="Quais idiomas?" className="input" onChange={handleChange} />
        <input type="text" name="pluginTraducao" value={form.pluginTraducao} placeholder="Plugin de tradução preferido" className="input" onChange={handleChange} />
        <SwitchField label="Formulário de contato / leads" enabled={form.formularioContato} onChange={() => toggleSwitch("formularioContato")} />
        <SwitchField label="Integração com e-mail marketing?" enabled={form.emailMarketing} onChange={() => toggleSwitch("emailMarketing")} />
      </fieldset>

      {/* Responsividade */}
      <fieldset className="space-y-4">
        <legend className="text-xl font-semibold">📱 Responsividade</legend>
        <SwitchField label="Celular" enabled={form.dispositivos.celular} onChange={() => toggleDispositivo("celular")} />
        <SwitchField label="Tablet" enabled={form.dispositivos.tablet} onChange={() => toggleDispositivo("tablet")} />
        <SwitchField label="Computador" enabled={form.dispositivos.computador} onChange={() => toggleDispositivo("computador")} />
        <SwitchField label="Acessibilidade" enabled={form.acessibilidade} onChange={() => toggleSwitch("acessibilidade")} />
      </fieldset>

      {/* hospedagem e dominio */}
      <fieldset className="space-y-4">
        <legend className="text-xl font-semibold">🧑‍💻 Hospedagem e Domínio</legend>
        <SwitchField label="Já possui domínio?" enabled={form.dominio} onChange={() => toggleSwitch("dominio")} />
        <SwitchField label="Já possui hospedagem?" enabled={form.hospedagem} onChange={() => toggleSwitch("hospedagem")} />
        <input type="text" name="tecnologia" value={form.tecnologia} placeholder="Tecnologia/CMS preferido?" className="input" onChange={handleChange} />
      </fieldset>

      {/* entrega e suporte */}
      <fieldset className="space-y-4">
        <legend className="text-xl font-semibold">📦 Entrega e Suporte</legend>
        <SwitchField label="Manual de uso" enabled={form.manual} onChange={() => toggleSwitch("manual")} />
        <input type="text" name="suporte" value={form.suporte} placeholder="Suporte pós-entrega por quanto tempo?" className="input" onChange={handleChange} />
        <SwitchField label="Auto gerenciamento do conteúdo?" enabled={form.autoGerenciamento} onChange={() => toggleSwitch("autoGerenciamento")} />
        <input type="text" name="localHospedagem" value={form.localHospedagem} placeholder="Onde está hospedado (se tiver)?" className="input" onChange={handleChange} />
        <input type="text" name="tempoSuporte" value={form.tempoSuporte} placeholder="Tempo de suporte desejado (ex: 6 meses)" className="input" onChange={handleChange} />
      </fieldset>

      {/* prazos e orçamento */}
      <fieldset className="space-y-4">
        <legend className="text-xl font-semibold">🗓️ Prazos e Orçamento</legend>
        <input type="text" name="prazo" value={form.prazo} placeholder="Prazo de entrega desejado" className="input" onChange={handleChange} />
        <input type="text" name="orcamento" value={form.orcamento} placeholder="Orçamento estimado" className="input" onChange={handleChange} />
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-xl font-semibold">🧾 Conteúdo a Ser Fornecido</legend>
        <textarea name="imagens_produtos" value={form.imagens_produtos} placeholder="Links para imagens dos produtos" className="textarea" onChange={handleChange} />
        <textarea name="textos_descritivos" value={form.textos_descritivos} placeholder="Textos descritivos que deseja usar" className="textarea" onChange={handleChange} />
        <textarea name="links_conteudos" value={form.links_conteudos} placeholder="Links úteis (docs, sites, etc)" className="textarea" onChange={handleChange} />
        <textarea name="materiais_apoio" value={form.materiais_apoio} placeholder="Materiais de apoio adicionais" className="textarea" onChange={handleChange} />
      </fieldset>

      <button type="submit" onClick={handleSubmit} className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
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
