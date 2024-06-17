import insert from "../utilities/insert.js";
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

const Search = sequelize.define('trvehiculopropietario', {}, {tableName: 'trvehiculopropietario'});

const searchVehiculos = async () => {
  try {
    const items = await Search.findAll({
      attributes: ['cvehiculopropietario', 'ccompania', 'cmarca','cmodelo','cversion', 'xmarca','xmodelo','xversion','xplaca','xclase','fano','ccolor','nkilometraje','xserialcarroceria','xserialmotor','cpais','cmoneda','xcolor'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    console.log(error.messagec)
    return { error: error.message };
  }
};

const searchVehiculosById = async (id) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT cvehiculopropietario, ccompania, cmarca,cmodelo,cversion, xmarca,xmodelo,xversion,xplaca,xclase,fano,ccolor,nkilometraje,xserialcarroceria,xserialmotor,cpais,cmoneda,xcolor from TRVEHICULOPROPIETARIO WHERE cvehiculopropietario = ${parseInt(id)}`)
    await pool.close();
    return { 
      result: result.recordset[0]
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

const updateVehiculos = async(id, data) => {

  const rData = insert.formatEditData(data)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    UPDATE TRVEHICULOPROPIETARIO SET ${rData} where cvehiculopropietario = ${id}`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}

export default {
  searchVehiculos,
  updateVehiculos,
  searchVehiculosById
}