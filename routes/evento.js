const express = require('express');
const router = express.Router();

router.get('/local', (req, res) => {
    res.json({ local: 'UNINASSAU Campina Grande', horario: '18h às 21h' });
});

router.get('/tema', (req, res) => {
    res.json({ edicao: '14ª Edição ENTEC', tema: 'IA no fluxo de DEVOPS e Agentes de IA' });
});

router.get('/contato', (req, res) => {
    res.json({ organizacao: ['UNINASSAU', 'JAM Labs'], instagram: '@jamlabsdev' });
});

module.exports = router;