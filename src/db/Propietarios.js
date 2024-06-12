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

const Search = sequelize.define('trpropietario', {}, {tableName: 'trpropietario'});

const searchPropietarios = async () => {
  try {
    const items = await Search.findAll({
      attributes: ['cpropietario', 'xnombre','xapellido','cestadocivil','csexo','fnacimiento','icedula','xcedula','xdireccion','xemail'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

const searchPropietario = async (id) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT cpropietario, xnombre,xapellido,cestadocivil,csexo,fnacimiento,icedula,xcedula,xdireccion,xemail from TRPROPIETARIO WHERE cpropietario = ${parseInt(id)}`)
    await pool.close();
    return { 
      result: result.recordset[0]
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

const updatePropietarios = async(id, data) => {

  const rData = insert.formatEditData(data)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    UPDATE TRPROPIETARIO SET ${rData} where cpropietario = ${id}`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}

const searchPropietariosById = async (id) => {
    try {
      let pool = await sql.connect(sqlConfig);
      let result = await pool.request().query(`SELECT xnombre,xapellido,cestadocivil,csexo,fnacimiento,icedula,xcedula,xdireccion,xemail from TRPROPIETARIO WHERE cpropietario = ${parseInt(id)}`)
      await pool.close();
      return { 
        result: result.recordset[0]
      };
    } catch (error) {
      console.log(error.message)
      return { error: error.message };
    }
  };

export default {
  searchPropietarios,
  searchPropietario,
  updatePropietarios,
  searchPropietariosById
}