export const validarCPF = (cpf) => {
    if (!cpf) return false;
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    resto = resto === 10 ? 0 : resto;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    resto = resto === 10 ? 0 : resto;
    if (resto !== parseInt(cpf.charAt(10))) return false;

    return true;
};

export const validarCNPJ = (cnpj) => {
    if (!cnpj) return false;
    cnpj = cnpj.replace(/[^\d]+/g, "");
    if (cnpj.length !== 14) return false;
    if (/^(\d)\1{13}$/.test(cnpj)) return false;

    const validarDigito = (cnpj, peso) => {
        let soma = 0;
        for (let i = 0; i < peso.length; i++) {
            soma += parseInt(cnpj.charAt(i)) * peso[i];
        }
        let resto = soma % 11;
        return resto < 2 ? 0 : 11 - resto;
    };

    const peso1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const peso2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    const digito1 = validarDigito(cnpj, peso1);
    const digito2 = validarDigito(cnpj, peso2);

    return (
        digito1 === parseInt(cnpj.charAt(12)) &&
        digito2 === parseInt(cnpj.charAt(13))
    );
};

export const validarEmail = (email) => {
    if (!email) return false;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const validarTelefone = (telefone) => {
    if (!telefone) return false;
    const regex = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/;
    return regex.test(telefone);
};

const validarObrigatorio = (valor) => {
    return valor && valor.trim().length > 0;
};

const validarCheckbox = (valor) => {
    return valor === true;
};

const validarDispositivos = (dispositivos) => {
    if (!dispositivos) return false;
    return dispositivos.celular || dispositivos.tablet || dispositivos.computador;
};

export const validarFormulario = (form) => {
    const erros = {};

    if (!validarObrigatorio(form.nome)) erros.nome = "Nome é obrigatório";

    if (!validarCNPJ(form.cnpj) && !validarCPF(form.cnpj)) {
        erros.cnpj = "CNPJ ou CPF inválido";
    }

    if (!validarObrigatorio(form.responsavel)) erros.responsavel = "Responsável é obrigatório";

    if (!validarEmail(form.email)) erros.email = "E-mail inválido";

    if (!validarTelefone(form.telefone)) erros.telefone = "Telefone inválido";

    if (!validarObrigatorio(form.objetivo)) erros.objetivo = "Objetivo é obrigatório";

    if (!validarObrigatorio(form.produtos)) erros.produtos = "Produtos são obrigatórios";

    // if (!validarObrigatorio(form.variacoes)) erros.variacoes = "Variações são obrigatórias";

    // if (!validarObrigatorio(form.referencias)) erros.referencias = "Referências são obrigatórias";

    if (!validarObrigatorio(form.estilo)) erros.estilo = "Estilo é obrigatório";

    // if (form.traducao && !validarObrigatorio(form.pluginTraducao)) erros.pluginTraducao = "Plugin de tradução é obrigatório";

    // if (!validarObrigatorio(form.idiomas)) erros.idiomas = "Idiomas são obrigatórios";

    // // if (!validarObrigatorio(form.acessibilidade)) erros.acessibilidade = "Informe acessibilidade";

    // if (!validarObrigatorio(form.tecnologia)) erros.tecnologia = "Informe tecnologia";

    // if (!validarObrigatorio(form.suporte)) erros.suporte = "Informe suporte";

    // if (!validarObrigatorio(form.prazo)) erros.prazo = "Informe prazo";

    // if (!validarObrigatorio(form.orcamento)) erros.orcamento = "Informe orçamento";

    // if (!validarDispositivos(form.dispositivos)) erros.dispositivos = "Selecione ao menos um dispositivo";

    return erros;
};
