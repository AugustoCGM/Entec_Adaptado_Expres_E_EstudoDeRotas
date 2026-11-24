const express = require('express');
const router = express.Router();
const Inscricao = require('../models/Inscricao');

// 1. Página de regras
router.get('/regras', (req, res) => {
    res.render('regras-mk11', { titulo: 'Regras - Mortal Kombat 11' });
});

// 2. READ: Página dedicada de inscrição e listagem
router.get('/inscritos', async (req, res) => {
    const inscritos = await Inscricao.findAll({
        where: { jogo: 'MK11' },
        order: [['id', 'DESC']],
        raw: true
    });
    res.render('inscricoes', {
        titulo: 'Inscrições Mortal Kombat 11',
        nomeTorneio: 'Mortal Kombat 11 (Tag Team)',
        corTema: '#ff00ff',
        rotaBase: '/mk11',
        inscritos
    });
});

// 3. CREATE: Cadastrar nova dupla
router.post('/inscrever', async (req, res) => {
    const { nomeDupla, jogador1, jogador2, contato } = req.body;
    if (!nomeDupla?.trim() || !jogador1?.trim() || !jogador2?.trim() || !contato?.trim()) {
        return res.status(400).send('Todos os campos da inscrição são obrigatórios.');
    }

    await Inscricao.create({
        jogo: 'MK11',
        nomeDupla: nomeDupla.trim(),
        jogador1: jogador1.trim(),
        jogador2: jogador2.trim(),
        contato: contato.trim()
    });
    res.redirect('/mk11/inscritos');
});

// 4. UPDATE: Editar dados da dupla
router.post('/editar/:id', async (req, res) => {
    const { nomeDupla, jogador1, jogador2, contato } = req.body;
    if (!nomeDupla?.trim() || !jogador1?.trim() || !jogador2?.trim() || !contato?.trim()) {
        return res.status(400).send('Todos os campos da inscrição são obrigatórios.');
    }

    await Inscricao.update(
        {
            nomeDupla: nomeDupla.trim(),
            jogador1: jogador1.trim(),
            jogador2: jogador2.trim(),
            contato: contato.trim()
        },
        { where: { id: req.params.id, jogo: 'MK11' } }
    );
    res.redirect('/mk11/inscritos');
});

// 5. DELETE: Remover inscrição
router.post('/deletar/:id', async (req, res) => {
    await Inscricao.destroy({ where: { id: req.params.id, jogo: 'MK11' } });
    res.redirect('/mk11/inscritos');
});

module.exports = router;