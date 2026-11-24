const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');

const sequelize = require('./config/database');
const Inscricao = require('./models/Inscricao');

const rotasMK = require('./routes/mk11');
const rotasFC = require('./routes/eafc');
const rotasEntec = require('./routes/evento');

const app = express();
const port = 3000;

// ==========================================
// 1. CONFIGURAÇÃO DO HANDLEBARS
// ==========================================
app.engine('handlebars', engine({
    defaultLayout: 'main',
    helpers: {
        eq: (a, b) => a === b
    },
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// ==========================================
// 2. MIDDLEWARES (FORMULÁRIOS E ESTÁTICOS)
// ==========================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// ==========================================
// 3. ROTA PRINCIPAL (LANDING PAGE DINÂMICA)
// ==========================================
app.get('/', async (req, res, next) => {
    try {
        const [totalMK, totalFC] = await Promise.all([
            Inscricao.count({ where: { jogo: 'MK11' } }),
            Inscricao.count({ where: { jogo: 'EAFC26' } })
        ]);

        res.render('home', {
            titulo: 'ENTEC UNINASSAU 2026',
            totalMK,
            totalFC
        });
    } catch (err) {
        next(err);
    }
});

// ==========================================
// 4. GRUPAMENTOS DE ROTAS
// ==========================================
app.use('/mk11', rotasMK);
app.use('/eafc', rotasFC);
app.use('/evento', rotasEntec);

// ==========================================
// 5. TRATAMENTO DE ROTAS E ERROS
// ==========================================
app.use((req, res) => {
    res.status(404).send('Página não encontrada');
});

app.use((err, req, res, next) => {
    console.error('Erro na aplicação:', err);
    res.status(err.status || 500).send(
        err.status === 400 ? err.message : 'Erro interno do servidor'
    );
});

// ==========================================
// 6. SINCRONIZAÇÃO COM O BANCO E START
// ==========================================
sequelize.sync()
    .then(() => {
        console.log('Banco SQLite sincronizado com sucesso.');
        app.listen(port, () => {
            console.log(`Servidor ENTEC 2026 rodando em http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error('Erro ao conectar com o banco de dados:', err);
    });