const cpfInput = document.getElementById("cpf");
const btnVerficar = document.getElementById("verifyBtn");

function verficarCpf() {
    const cpf = cpfInput.value.trim();
    const msg = "CPF inválido, digite 11 dígitos";

    if (cpf.length !== 11) {
        alert(msg);
        return false;
    } else if (/\D/.test(cpf)) {
        alert(msg);
        return false;
    }

    let numeros = [];  
    for (let i = 0; i < cpf.length; i++) {
        numeros.push(parseInt(cpf[i]));  
    }
    let soma1 = 0;
    for (let i = 0; i < 9; i++) {
        soma1 += numeros[i] * (i + 1);
    }
    let dv1 = soma1 % 11;
    if (dv1 === 10) dv1 = 0;

    let soma2 = 0;
    for (let i = 0; i < 10; i++) {
        soma2 += (i) * (i < 9 ? numeros[i] : dv1);
    }
    let dv2 = soma2 % 11;
    if (dv2 === 10) dv2 = 0;

    const dvInformados = [numeros[9], numeros[10]];

    if (dv1 === dvInformados[0] && dv2 === dvInformados[1]) {
        alert("Dígito Correto");
    } else {
        alert("Dígito Inválido");
    }
}

btnVerficar.addEventListener("click", verficarCpf);