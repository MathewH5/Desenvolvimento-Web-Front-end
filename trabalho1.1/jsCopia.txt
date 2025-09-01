document.addEventListener("DOMContentLoaded", function () {

  const jogador1Input = document.getElementById("jogador1");
  const jogador2Input = document.getElementById("jogador2");
  const resultadoSpan = document.getElementById("resultado");
  const btnChecar     = document.getElementById("btnChecar");
  const btnLimpar     = document.getElementById("btnLimpar");

  let jogoEncerrado = false;

  function normalizarEntradaBasica(texto) {
    if (!texto) return "";
    return String(texto).toLowerCase().trim();
  }

  function jogadaValida(j) {
    const opcoes = ["pedra", "papel", "tesoura"]; 
    return opcoes.indexOf(j) !== -1;
  }

  function atualizarResultado(txt, tipo) {
    resultadoSpan.textContent = txt;
    resultadoSpan.className = "";
    if (tipo === "ok")   resultadoSpan.classList.add("badge", "badge--ok");
    if (tipo === "warn") resultadoSpan.classList.add("badge", "badge--warn");
    if (tipo === "err")  resultadoSpan.classList.add("badge", "badge--err");
  }

  function limparCamposParaProximaRodada() {
    jogador1Input.value = "";
    jogador2Input.value = "";
    jogador1Input.focus();
  }

  function checarVencedor() {
    if (jogoEncerrado) return;

    const j1 = normalizarEntradaBasica(jogador1Input.value); 
    
    const j2 = normalizarEntradaBasica(jogador2Input.value);

    console.log("Digite a jogada do Jogador 1:", j1 || "(inválida)");
    console.log("Digite a jogada do Jogador 2:", j2 || "(inválida)");

    const j1Valida = jogadaValida(j1);
    const j2Valida = jogadaValida(j2);

    if (!j1Valida || !j2Valida) {
      atualizarResultado("Jogo terminado.", "err");
      console.log("Vencedor: Jogo terminado.");
      jogoEncerrado = true;
      jogador1Input.disabled = true;
      jogador2Input.disabled = true;
      btnChecar.disabled = true;
      return;
    }

    if (j1 === j2) {
      atualizarResultado("Empate!", "warn");
      console.log("Vencedor: Empate!");
      limparCamposParaProximaRodada();
      return;
    }

    const jogador1Vence =
      (j1 === "pedra"   && j2 === "tesoura") ||
      (j1 === "papel"   && j2 === "pedra")   ||
      (j1 === "tesoura" && j2 === "papel");

    if (jogador1Vence) {
      atualizarResultado("Jogador 1", "ok");
      console.log("Vencedor: Jogador 1");
    } else {
      atualizarResultado("Jogador 2", "ok");
      console.log("Vencedor: Jogador 2");
    }

    limparCamposParaProximaRodada();
  }

  function limpar() {
    jogador1Input.value = "";
    jogador2Input.value = "";
    atualizarResultado("—", "");
    jogador1Input.disabled = false;
    jogador2Input.disabled = false;
    btnChecar.disabled = false;
    jogoEncerrado = false;
    jogador1Input.focus();
  }

  btnChecar.addEventListener("click", checarVencedor);
  btnLimpar.addEventListener("click", limpar);

  jogador2Input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") checarVencedor();
  });
});
