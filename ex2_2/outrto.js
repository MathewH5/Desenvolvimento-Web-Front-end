// Tabela de preços
const precos = {
  "STANDARD": 120,
  "LUXO": 150,
  "SUPER-LUXO": 180
};

// Cidades válidas
const vetCidades = [
  "BELO HORIZONTE",
  "SÃO PAULO",
  "RIO DE JANEIRO",
  "SALVADOR",
  "CURITIBA"
];

// Estado
let contas = [];          // cada item: { nome: string, valor: number }
let ultimoValor = null;   // guarda o último valor calculado (número)

// Helpers
function normalize(s) {
  return (s || "")
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toUpperCase();
}

function verificarDia(diaEntrada, diaSaida) {
  if (!Number.isInteger(diaEntrada) || diaEntrada < 1 || diaEntrada > 31) {
    alert("Dia de entrada inválido. Use 1–31.");
    return false;
  }
  if (!Number.isInteger(diaSaida) || diaSaida < 1 || diaSaida > 31) {
    alert("Dia de saída inválido. Use 1–31.");
    return false;
  }
  if (diaSaida <= diaEntrada) {
    alert("O dia de saída deve ser MAIOR que o dia de entrada.");
    return false;
  }
  return true;
}

function validarCidade(cidade) {
  const alvo = normalize(cidade);
  return vetCidades.some(c => normalize(c) === alvo);
}

function calcularConta(tipo, dias) {
  const valorDiaria = precos[tipo];
  if (!valorDiaria) {
    alert("Tipo de quarto inválido.");
    return 0;
  }
  return dias * valorDiaria;
}

function formatBRL(n) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function getListaElement() {
  // Suporta tanto "listaEmpregados" (seu HTML original) quanto "listaHospedes"
  return document.getElementById("listaEmpregados") || document.getElementById("listaHospedes");
}

// ----- Ações dos botões -----

function calcular() {
  const nome = document.getElementById("name").value.trim();
  const entrada = parseInt(document.getElementById("entrada").value, 10);
  const saida = parseInt(document.getElementById("saida").value, 10);
  const tipo = document.getElementById("tipo").value;
  const cidade = document.getElementById("cidade").value.trim();

  // validações básicas
  if (!nome) {
    alert("Informe o nome do hóspede.");
    return;
  }
  if (!verificarDia(entrada, saida)) {
    return;
  }
  if (!validarCidade(cidade)) {
    alert("Cidade inválida. Válidas: " + vetCidades.join(", "));
    return;
  }

  const dias = saida - entrada;
  const valorConta = calcularConta(tipo, dias);
  ultimoValor = valorConta; // guarda o valor numérico para salvar no "Novo"

  const campoValor = document.getElementById("valor");
  if (campoValor) {
    campoValor.value = formatBRL(valorConta);
  } else {
    alert("Valor da conta: " + formatBRL(valorConta));
  }
}

function novo() {
  const nome = document.getElementById("name").value.trim();

  if (!nome) {
    alert("Calcule primeiro e informe o nome para salvar.");
    return;
  }
  if (ultimoValor === null) {
    alert("Clique em Calcular antes de salvar (Novo).");
    return;
  }

  // Salva {nome, valor: número}
  contas.push({ nome, valor: ultimoValor });

  // Atualiza a lista visual com TODOS os itens salvos
  renderLista(contas);

  // Limpa campos para o próximo cadastro
  document.getElementById("name").value = "";
  document.getElementById("entrada").value = "";
  document.getElementById("saida").value = "";
  document.getElementById("tipo").value = "STANDARD";
  document.getElementById("cidade").value = "";
  const campoValor = document.getElementById("valor");
  if (campoValor) campoValor.value = "";

  ultimoValor = null; // reset
}

function RelatorioContasAcimaMedia() {
  if (contas.length === 0) {
    alert("Nenhuma conta salva ainda.");
    return;
  }
  const media = contas.reduce((s, c) => s + c.valor, 0) / contas.length;
  const acima = contas.filter(c => c.valor >= media);

  // Atualiza a lista visual mostrando apenas ≥ média
  renderLista(acima, ` (≥ média: ${formatBRL(media)})`);

  if (acima.length === 0) {
    alert("Nenhuma conta é maior ou igual à média.");
  }
}

// ----- Renderização da lista (<ul>) -----

function renderLista(itens, tituloExtra = "") {
  const ul = getListaElement();
  if (!ul) return;

  ul.innerHTML = ""; // limpa

  // Cabeçalho (opcional — se seu HTML já tem, pode remover)
  const header = document.createElement("li");
  header.style.listStyle = "none";
  header.innerHTML = `<strong>NOME — VALOR DA CONTA${tituloExtra}</strong>`;
  ul.appendChild(header);

  if (itens.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Lista vazia.";
    ul.appendChild(li);
    return;
  }

  itens.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.nome} — ${formatBRL(item.valor)}`;
    ul.appendChild(li);
  });
}
