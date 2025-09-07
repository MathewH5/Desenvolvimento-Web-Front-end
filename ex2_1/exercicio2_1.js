let empregados = [];

function calcularSalario(pecas) {
    if (pecas <= 200) {
        return pecas * 2.00;
    } else if (pecas <= 400) {
        return pecas * 2.30;
    } else {
        return pecas * 2.50;
    }
}

function incluirEmpregado() {


    const nome = document.getElementById("nome").value.trim();
    const pecas = parseInt(document.getElementById("pecas").value);

    if (nome === "" || !isNaN(nome) || isNaN(pecas) || pecas <= 0) {
        alert("Por favor, preencha o nome e um número válido de peças.");
        return;
    }

    const salario = calcularSalario(pecas);
    empregados.push({ nome, salario });

    document.getElementById("nome").value = "";
    document.getElementById("pecas").value = "";
    alert("Empregado adicionado com sucesso!");
}

function exibirRelatorio() {
    const lista = document.getElementById("listaEmpregados");
    lista.innerHTML = "";

    let total = 0;

    for (let emp of empregados) {
        const item = document.createElement("li");
        item.textContent = `${emp.nome} - R$ ${emp.salario.toFixed(2)}`;
        lista.appendChild(item);
        total += emp.salario;
    }

    const media = empregados.length > 0 ? total / empregados.length : 0;

    document.getElementById("totalSalarios").textContent = `Total de Salários: R$ ${total.toFixed(2)}`;
    document.getElementById("mediaSalarios").textContent = `Média de Salários: R$ ${media.toFixed(2)}`;
}
