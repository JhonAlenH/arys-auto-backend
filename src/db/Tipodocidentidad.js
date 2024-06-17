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

const Search = sequelize.define('matipodocidentidad', {}, {tableName: 'matipodocidentidad'});

const searchTipodocidentidad = async () => {
  try {
    const items = await Search.findAll({
      attributes: ['ctipodocidentidad', 'xtipodocidentidad', 'xdescripcion','cpais'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    console.log(error.messagec)
    return { error: error.message };
  }
};

const searchTipodocidentidadById = async (id) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT ctipodocidentidad, xtipodocidentidad, xdescripcion,cpais from MATIPODOCIDENTIDAD WHERE ctipodocidentidad = ${parseInt(id)}`)
    await pool.close();
    return { 
      result: result.recordset[0]
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};


const createTipodocidentidad = async(data) => {

  const rData = insert.formatCreateData(data)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    INSERT INTO MATIPODOCIDENTIDAD (${rData.keys}) VALUES (${rData.values})`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}

const updateTipodocidentidad = async(id, data) => {

  const rData = insert.formatEditData(data)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    UPDATE MATIPODOCIDENTIDAD SET ${rData} where ctipodocidentidad = ${id}`)
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
  createTipodocidentidad,
  searchTipodocidentidad,
  updateTipodocidentidad,
  searchTipodocidentidadById
}