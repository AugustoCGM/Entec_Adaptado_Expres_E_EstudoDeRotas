const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Inscricao = sequelize.define('Inscricao', {
    jogo: {
        type: DataTypes.ENUM('EAFC26', 'MK11'),
        allowNull: false
    },
    nomeDupla: {
        type: DataTypes.STRING,
        allowNull: false
    },
    jogador1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    jogador2: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contato: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'Pendente'
    }
});

module.exports = Inscricao;