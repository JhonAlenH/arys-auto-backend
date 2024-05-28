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

const Search = sequelize.define('mabanco', {}, {tableName: 'mabanco'});

const searchBancos = async () => {
  try {
    const items = await Search.findAll({
      attributes: ['cbanco', 'xbanco', 'cpais'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    console.log(error.messagec)
    return { error: error.message };
  }
};
const searchBancosMaestros = async (cpais) => {
  try {
    const items = await Search.findAll({
      where: {cpais: cpais},
      attributes: ['cbanco', 'xbanco', 'cpais'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    console.log(error.messagec)
    return { error: error.message };
  }
};
const searchBancosById = async (id) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT cbanco, xbanco, cpais from MABANCO WHERE cbanco = ${parseInt(id)}`)
    await pool.close();
    return { 
      result: result.recordset[0]
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};


const createBancos = async(data) => {

  const rData = insert.formatCreateData(data)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    INSERT INTO MABANCO (${rData.keys}) VALUES (${rData.values})`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}

const updateBancos = async(id, data) => {

  const rData = insert.formatEditData(data)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    UPDATE MABANCO SET ${rData} where cbanco = ${id}`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}


const searchProveedorBancos = async(cproveedor) => {
  try {

    console.log(cproveedor);
    let pool = await sql.connect(sqlConfig)
    let result = await pool.request().query(`SELECT * from PRBANCO WHERE cproveedor = ${cproveedor};`)
    await pool.close();

    if(result.recordset.length > 0){
      let j = 0
      for (const record of result.recordset) {
        const keys = Object.keys(record)
        const values = Object.values(record)
        let resultLowerCase = {}
        let i = 0
        for (const key of keys) {
          const lowerKey = key.toLowerCase()
          resultLowerCase[lowerKey] = values[i]
          i++
        }
        result.recordset[j] = resultLowerCase
        j++ 
      };
    }

    
    
    if (result.rowsAffected < 1) {
        return false;
    }
    await pool.close();
    return result.recordset;
  }
  catch (error) {
      console.log(error.message)
      return { error: error.message };
  }
}

const linkBancosProveedor = async(bancos, cproveedor) => {
  
  try {
    let pool = await sql.connect(sqlConfig);
    const bancosSplittedString = bancos.split('[]')[0].split(',')

    const bancosAll = await pool.request().query(`
    DELETE FROM PRBANCO WHERE cproveedor = ${parseInt(cproveedor)}
    `)
    let result = {message: 'no hay servicios'}
    if(bancosSplittedString.length > 0 && bancosSplittedString[0]) {      
  
      const table = new sql.Table('PRBANCO');
      table.columns.add('cproveedor', sql.Int, {nullable: false});
      table.columns.add('cbanco', sql.Int, {nullable: false});
      table.columns.add('ctipocuentabancaria', sql.Int, {nullable: true});
      table.columns.add('xnumerocuenta', sql.VarChar(250), {nullable: true});
  
      for (const banco of bancosSplittedString) {
        const splittedBancoInfo =  banco.split('?')
        table.rows.add(cproveedor, parseInt(splittedBancoInfo[0]), parseInt(splittedBancoInfo[1]), splittedBancoInfo[2]);
      }
      
      result = await pool.request().bulk(table)
      
      if (result.rowsAffected < 1) {
          return false;
      }
      await pool.close();
    } 
    

    return result;
  }
  catch (error) {
      console.log(error.message)
      return { error: error.message };
  }
}

export default {
  createBancos,
  searchBancos,
  updateBancos,
  searchBancosById,
  searchBancosMaestros,
  searchProveedorBancos,
  linkBancosProveedor
}