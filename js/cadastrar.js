async function cadastrar(e) {
    // evita reload da página
    if (e) e.preventDefault();

    const nome = document.getElementById("nomeUsuario").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if (!nome || !email || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    const resp = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nome,
            email,
            senha_hash: senha   // mesma estrutura da sua API
        })
    });

    const data = await resp.json();

    if (resp.ok) {
        alert("Usuário cadastrado: " + data.nome);
        window.location.href = "login.html"; // redireciona se quiser
    } else {
        alert("Erro: " + data.erro);
    }
}
