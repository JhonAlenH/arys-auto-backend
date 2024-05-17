import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import sql from "mssql";
import insert from "../utilities/insert.js";

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


const searchEvents = async (body, ccompania, cpais) => {
  console.log(body)
    try {
      let event
      if(ccompania != 1){
        if(!body.ccompania){
          body.ccompania = ccompania
        }
        event = await Search.findAll({
          where: body,
          attributes: ['cnotificacion', 'xnombre', 'xapellido', 'xplaca', 'xmarca', 'xmodelo', 'xversion', 'xcausasiniestro', 'ccompania', 'xcompania'],
        });
      }else{
        event = await Search.findAll({
          where: body,
          attributes: ['cnotificacion', 'xnombre', 'xapellido', 'xplaca', 'xmarca', 'xmodelo', 'xversion', 'xcausasiniestro', 'ccompania', 'xcompania'],
        });
      }

      const events = event.map((item) => item.get({ plain: true }));
      return events;
    } catch (error) {
      return { error: error.message };
    }
};
const getEvent = async (id) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    SELECT * FROM evVnotificaciones WHERE cnotificacion = ${id}`)
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
};

const createEvents = async(data) => {
  const keys = Object.keys(data);
  const values = Object.values(data);

  try {
    let pool = await sql.connect(sqlConfig);
    const request = pool.request();
    
    // Construir la consulta SQL dinámicamente
    const placeholders = Array.from({ length: keys.length }, (_, i) => `@${i + 1}`).join(',');
    const query = `INSERT INTO EVNOTIFICACION (${keys.join(',')}) VALUES (${placeholders})`;

    // Ejecutar la consulta SQL con los valores adecuados
    keys.forEach((key, index) => {
      request.input((index + 1).toString(), values[index]);
    });

    const event = await request.query(query);

    await pool.close();
    return event;
  } catch (error) {
    console.log(error.message);
    return { error: error.message }; // Devolver un objeto con el mensaje de error
  }
}

export default {
    searchEvents,
    getEvent,
    createEvents
}