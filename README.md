# ENTEC 2026 E-Sports - Servidor Express (Atividade AT2)

Esta é a versão adaptada em Node.js/Express da landing page dos torneios de E-Sports da ENTEC 2026, desenvolvida como requisito avaliativo para o componente de BEF (Ciência da Computação - UNINASSAU). 

**Repositório Original (Versão Estática):** [AugustoCGM/Entec_Main](https://github.com/AugustoCGM/Entec_Main.git)

## 📌 Sobre a Adaptação

O código original foi refatorado para deixar de ser uma simples página estática e passar a ser servido por uma aplicação backend robusta. A arquitetura foi dividida para cumprir estritamente dois requisitos acadêmicos:

1. **Roteamento Modular:** Utilização da classe `express.Router()` para criar três agrupamentos de rotas (MK11, EA FC e Evento), fragmentando a API por tipo de recurso.
2. **Arquivos Estáticos:** Implementação de middlewares `express.static()` para expor diretórios independentes (`/css`, `/js`, `/html`, `/assets`), garantindo que o layout neo-brutalista e os scripts de animação sejam carregados corretamente pela raiz da aplicação.

## 🚀 Tecnologias Utilizadas

* **Backend:** Node.js, Express
* **Frontend:** HTML5, CSS3, JavaScript Vanilla
* **Estilização:** Tailwind CSS (via CDN), Design Neo-Brutalista
* **Animações:** Lógica de frame-by-frame em JS, CSS Marquee, Pixel Art UI

## 📂 Estrutura de Pastas

```text
/
├── server.js               # Ponto de entrada e configuração do Express
├── package.json            # Dependências do Node.js
└── public/                 # Diretórios expostos estaticamente
    ├── assets/             # Imagens, renders e logos
    ├── css/                
    │   ├── animations.css  # Animações contínuas e marquee
    │   ├── brutalism.css   # Sombras duras e utilitários visuais
    │   └── style.css       # Variáveis de cor, tipografia Space Grotesk e Cursor
    ├── html/               
    │   ├── index.html      # Landing page principal
    │   ├── regras-eafc.html
    │   └── regras-mk11.html
    └── js/                 
        ├── cursor.js       # Lógica do cursor interativo em pixel art
        ├── fab.js          # Ações do botão flutuante
        └── script.js       # Carrossel, touch/swipe e troca de renders

```

⚙️ Como Executar o Projeto
Certifique-se de ter o Node.js instalado em sua máquina.

1 - Clone este repositório:
git clone [https://github.com/AugustoCGM/Entec_Adaptado_Expres_E_EstudoDeRotas.git](https://github.com/AugustoCGM/Entec_Adaptado_Expres_E_EstudoDeRotas.git)

2 - Acesse a pasta do projeto:
cd Entec_Adaptado_Expres_E_EstudoDeRotas

3 - Instale as dependências (Express):
npm install

4 - Inicie o servidor:
npm start

5 - Acesse no navegador:http://localhost:3000