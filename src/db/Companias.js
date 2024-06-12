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

const Search = sequelize.define('macompania', {}, {tableName: 'macompania'});

const searchCompanias = async () => {
  try {
    const items = await Search.findAll({
      attributes: ['ccompania', 'xcompania', 'xrif', 'xpaginaweb', 'xdireccionfiscal', 'xrepresentantelegal', 'xdocidentidad', 'xtelefono'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};
const searchCompaniasById = async (id) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT ccompania, xcompania, xrif, xpaginaweb, xdireccionfiscal, xrepresentantelegal, xdocidentidad, xtelefono from MACOMPANIA WHERE ccompania = ${parseInt(id)}`)
    await pool.close();
    return { 
      result: result.recordset[0]
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};


const createCompanias = async(data) => {

  const rData = insert.formatCreateData(data)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    INSERT INTO MACOMPANIA (${rData.keys}) VALUES (${rData.values})`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}

const updateCompanias = async(id, data) => {

  const rData = insert.formatEditData(data)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    UPDATE MACOMPANIA SET ${rData} where ccompania = ${id}`)
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
  createCompanias,
  searchCompanias,
  updateCompanias,
  searchCompaniasById
}