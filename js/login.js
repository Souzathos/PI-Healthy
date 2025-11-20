async function login(){
      
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if (!email || !senha) {
        alert("Preencha todos os campos!");
        return;
    }
    
    try {
        const resp = await fetch("http://localhost:5500/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha })
        });
    
        const data = await resp.json();
    
        if (resp.ok) {
            window.location.href = "loginRealizado.html"; // redireciona se quiser
            document.getElementById("msg").innerText = data.message;
        } else {
            document.getElementById("msg").innerText = data.error || "Erro desconhecido";
        }
    
    } catch (err) {
        document.getElementById("msg").innerText = "Erro no login do usuário";
    }
}