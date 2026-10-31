const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use('/estilos', express.static(path.join(__dirname, 'public/css')));
app.use('/scripts', express.static(path.join(__dirname, 'public/js')));
app.use('/paginas', express.static(path.join(__dirname, 'public/html')));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// Rota principal para servir a Landing Page da ENTEC
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/index.html'));
});

// ==========================================
// GRUPAMENTOS DE ROTAS (ROUTERS)
// ==========================================

// --- Grupo de Rotas 1: Mortal Kombat 11 ---
const rotasMK = express.Router();
rotasMK.get('/regras', (req, res) => res.json({ titulo: "Regras MK11", formato: "Tag Team (Duplas)" }));
rotasMK.get('/chaveamento', (req, res) => res.json({ status: "Chaves em formação" }));
rotasMK.get('/inscritos', (req, res) => res.json({ total: 16 }));

// --- Grupo de Rotas 2: EA FC 26 ---
const rotasFC = express.Router();
rotasFC.get('/regras', (req, res) => res.json({ titulo: "Regras EA FC 26", formato: "Co-op (2v2)" }));
rotasFC.get('/chaveamento', (req, res) => res.json({ status: "Fase de grupos" }));
rotasFC.get('/inscritos', (req, res) => res.json({ total: 32 }));

// --- Grupo de Rotas 3: Informações da ENTEC ---
const rotasEntec = express.Router();
rotasEntec.get('/local', (req, res) => res.json({ local: "UNINASSAU", horario: "18h às 21h" }));
rotasEntec.get('/tema', (req, res) => res.json({ edicao: "14ª", tema: "IA no fluxo de DEVOPS" }));
rotasEntec.get('/contato', (req, res) => res.json({ instagram: "@uninassau.cg e @jamlabsdev" }));

// Vinculando os roteadores à aplicação principal
app.use('/mk11', rotasMK);
app.use('/eafc', rotasFC);
app.use('/evento', rotasEntec);

// Inicialização do servidor
app.listen(port, () => {
    console.log(`Landing Page ENTEC 2026 rodando em http://localhost:${port}`);
});