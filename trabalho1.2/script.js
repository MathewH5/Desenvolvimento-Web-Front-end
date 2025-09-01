    document.getElementById("btn-gerar").onclick = function () {
        const nomeInput = document.getElementById("nome").value.trim();
        const loginOutput = document.getElementById("login");
        const senhaOutput = document.getElementById("senha");

        if (nomeInput.length < 15) {
            alert("O nome deve ter no mínimo 15 caracteres.");
            return;
        }

        if (nomeInput.startsWith(" ")) {
            alert("O nome não deve começar com espaço.");
            return;
        }

        const nomes = nomeInput.split(" ").filter(p => p !== "");

        if (nomes.length < 2) {
            alert("Informe pelo menos um nome e um sobrenome.");
            return;
        }

        for (let i = 0; i < nomes.length; i++) {
            if (nomes[i].includes("  ")) {
                alert("Evite espaços duplos entre nomes.");
                return;
            }
        }

        let login = "";
        for (let i = 0; i < nomes.length; i++) {
            login += nomes[i][0].toUpperCase();
        }

        let senha = "";
        for (let i = 0; i < login.length; i++) {
            let ascii = login.charCodeAt(i).toString(); 
            senha += ascii[0]; 
        }

        loginOutput.textContent = "Login gerado => " + login;
        senhaOutput.textContent = "Senha gerada => " + senha;
    };
