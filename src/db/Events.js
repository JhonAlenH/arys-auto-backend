import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import sql from "mssql";

const sqlConfig = {
    user: process.env.USER_BD,
    password: process.env.PASSWORD_BD,
    server: process.env.SERVER_BD,
    database: process.env.NAME_BD,
    requestTimeout: 60000,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}

const Search = sequelize.define('evVnotificaciones', {});


const searchEvents = async () => {
    try {
      const event = await Search.findAll({
        attributes: ['cnotificacion', 'xnombre', 'xapellido', 'xplaca', 'xmarca', 'xmodelo', 'xversion', 'xcausasiniestro'],
      });
      const events = event.map((item) => item.get({ plain: true }));
      return events;
    } catch (error) {
      return { error: error.message };
    }
};

export default {
    searchEvents,
}