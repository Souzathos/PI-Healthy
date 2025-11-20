async function cadastrar(e) {
    if (e) e.preventDefault();

    const nome = document.getElementById("nomeUsuario").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if (!nome || !email || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    try {
        const resp = await fetch("http://localhost:5500/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, email, senha })
        });

        const data = await resp.json();

        if (resp.ok) {
            alert("Usuário cadastrado: " + data.nome);
            window.location.href = "login.html";
        } else {
            alert("Erro: " + data.erro);
        }
    } catch (err) {
        alert("Erro ao conectar ao servidor!");
    }
}

