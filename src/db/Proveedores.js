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

const Search = sequelize.define('maproveedores', {}, {tableName: 'maproveedores'});

const searchProveedores = async (body) => {
  try {
    const items = await Search.findAll({
      where: body,
      attributes: ['cproveedor', 'xnombre', 'xdireccion', 'xdocidentidad', 'cpais', 'cestado', 'cciudad', 'xcorreo', 'xtelefonocelular', 'xtelefono', 'xobservacion', 'ccompania', 'cestatusgeneral'],
    });
    
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};
const searchProveedoresById = async (id) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT cproveedor, xnombre, xdireccion, xdocidentidad, cpais, cestado, cciudad, xcorreo, xtelefonocelular, xtelefono, xobservacion, ccompania, cestatusgeneral from MAPROVEEDORES WHERE cproveedor = ${parseInt(id)}`)
    await pool.close();
    return { 
      result: result.recordset[0]
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};


const createProveedores = async(data) => {

  const rData = insert.formatCreateData(data)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    INSERT INTO MAPROVEEDORES (${rData.keys}) VALUES (${rData.values})`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}

const updateProveedores = async(id, data) => {

  const rData = insert.formatEditData(data)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    UPDATE MAPROVEEDORES SET ${rData} where cproveedor = ${id}`)
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
  createProveedores,
  searchProveedores,
  updateProveedores,
  searchProveedoresById
}