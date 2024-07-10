import sql from "mssql";
import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

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


// evseguimientonotificacion
const Search = sequelize.define('evseguimientonotificacion', {}, { tableName: 'evseguimientonotificacion' });

const searchTrackers = async(ccompania) => {
  try {
    const items = await Search.findAll({
      attributes: ['cseguimientonotificacion', 'cnotificacion', 'ctiposeguimiento', 'cmotivoseguimiento', 'fseguimientonotificacion', 'bcerrado', 'xobservacion', 'corden'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    console.log(error.messagec)
    return { error: error.message };
  }
}
const getTracker = async(id) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    SELECT * FROM evseguimientonotificacion WHERE cseguimientonotificacion = ${id}`)
    await pool.close();

    const keys = Object.keys(result.recordset[0])
    const values = Object.values(result.recordset[0])
    let resultLowerCase = {}
    let i = 0
    for (const key of keys) {
      const lowerKey = key.toLowerCase()
      resultLowerCase[lowerKey] = values[i]
      i++
    }
    result.recordset[0] = resultLowerCase

    return { 
      result: result.recordset
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}


export default {
  searchTrackers,
  getTracker,
}

