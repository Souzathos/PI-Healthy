const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt'); // necessário para login

const app = express();
const porta = 3000;

app.use(cors());
app.use(express.json());

const db = require('./db_config');

app.listen(porta, () => console.log(`Servidor rodando na porta ${porta}`));



//  ROTA POST: Criar usuário

app.post("/register", async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ erro: "Dados incompletos" });
    }

    try {
        // 🔐 Criptografar senha ANTES de salvar
        const senhaHash = await bcrypt.hash(senha, 10);

        const sql = "INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)";

        db.query(sql, [nome, email, senhaHash], (err, result) => {
            if (err) {
                console.error("Erro ao inserir usuário:", err);
                return res.status(500).json({ erro: "Erro ao salvar usuário" });
            }

            res.json({
                id: result.insertId,
                nome,
                email
            });
        });

    } catch (err) {
        res.status(500).json({ erro: "Erro interno ao registrar usuário" });
    }
});


// ROTA POST: Login

app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    const sql = 'SELECT * FROM usuarios WHERE email = ?';

    db.query(sql, [email], (err, results) => {
        if (err) return res.status(500).json({ error: 'Erro no login' });
        if (results.length === 0) return res.status(401).json({ error: 'Usuário não encontrado' });

        const user = results[0];

        bcrypt.compare(senha, user.senha_hash, (err, match) => {
            if (err) return res.status(500).json({ error: 'Erro ao verificar senha' });
            if (!match) return res.status(401).json({ error: 'Senha incorreta' });

            res.json({ message: 'Login realizado com sucesso!' });
        });
    });
});



//ROTA GET: Listar usuários

app.get("/usuarios", (req, res) => {
    const sql = "SELECT id, nome, email, telefone, status, role FROM usuarios";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Erro ao buscar usuários:", err);
            return res.status(500).json({ erro: "Erro ao buscar usuários" });
        }

        res.json(results);
    });
});


// ROTA PUT: Atualizar usuário

app.put('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    const { nome } = req.body;

    if (!nome) {
        return res.status(400).json({ erro: "Nome é obrigatório" });
    }

    const sql = 'UPDATE usuarios SET nome = ? WHERE id = ?';

    db.query(sql, [nome, id], (err, results) => {
        if (err) {
            console.error("Erro ao atualizar usuário:", err);
            return res.status(500).json({ sucess: false, message: 'Erro ao atualizar usuário', data: err });
        }

        res.json({
            sucess: true,
            message: 'Usuário atualizado com sucesso',
            data: results
        });
    });
});



// ROTA DELETE: Deletar usuário

app.delete('/usuarios/:id', (req, res) => {
    const id = req.params.id;

    const sql = 'DELETE FROM usuarios WHERE id = ?';

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Erro ao deletar usuário:", err);
            return res.status(500).json({
                sucess: false,
                message: 'Erro ao deletar usuário',
                data: err
            });
        }

        res.json({
            sucess: true,
            message: 'Usuário deletado com sucesso!',
            data: results
        });
    });
});
