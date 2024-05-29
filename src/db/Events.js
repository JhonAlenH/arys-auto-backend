import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import sql from "mssql";
import insert from "../utilities/insert.js";
import dayjs from "dayjs";

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

const Seguimentos = sequelize.define('evVseguimientoNotificacion', {}, {tableName: 'evVseguimientoNotificacion'});

const Search = sequelize.define('evVnotificaciones', {});
const ServiceOrder = sequelize.define('evVordenServicio', {}, {tableName: 'evVordenServicio'});


const searchEvents = async (body, ccompania, cpais) => {
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
const getSeguimientos = async (id) => {
  
  try {
    const items = await Seguimentos.findAll({
      attributes: ['cnotificacion','cseguimientonotificacion', 'xtiposeguimiento', 'xnombre', 'xapellido', 'xobservacion', 'ctiposeguimiento', 'cmotivoseguimiento', 'xmotivoseguimiento', 'bcerrado', 'fseguimientonotificacion'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    for (const item of result) {
      item.xfseguimientonotificacion = dayjs(item.fseguimientonotificacion).format('DD/MM/YYYY')
    }

    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};
const getSeguimientosById = async (id) => {
  
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    SELECT * FROM evVseguimientoNotificacion WHERE cnotificacion = ${id}`)
    await pool.close();
    
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
      resultLowerCase.xfseguimientonotificacion = dayjs(resultLowerCase.fseguimientonotificacion).format('DD/MM/YYYY')
      result.recordset[j] = resultLowerCase
      j++ 
    };

    return { 
      result: result.recordset
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

const createEvents = async (data) => {
  const keys = Object.keys(data).filter(key => key !== 'seguimiento' && key !== 'repuestos' && key !== 'serviceOrder');
  const values = keys.map(key => data[key]);

  let pool;
  try {
    pool = await sql.connect(sqlConfig);
    const request = pool.request();

    const placeholders = keys.map((_, i) => `@param${i + 1}`).join(',');
    const query = `INSERT INTO EVNOTIFICACION (${keys.join(',')}) VALUES (${placeholders}) SELECT SCOPE_IDENTITY() AS cnotificacion`;

    keys.forEach((key, index) => {
      request.input(`param${index + 1}`, values[index]);
    });

    const event = await request.query(query);
    const cnotificacion = event.recordset[0].cnotificacion;

    if (cnotificacion && data.seguimiento) {
      const seguimientoKeys = ['cnotificacion', ...Object.keys(data.seguimiento)];
      const seguimientoValues = [cnotificacion, ...Object.values(data.seguimiento)];

      const placeholdersSeguimiento = seguimientoKeys.map((_, i) => `@sparam${i + 1}`).join(',');
      const querySeguimiento = `INSERT INTO EVSEGUIMIENTONOTIFICACION (${seguimientoKeys.join(',')}) VALUES (${placeholdersSeguimiento})`;

      const seguimientoRequest = pool.request();
      seguimientoKeys.forEach((key, index) => {
        seguimientoRequest.input(`sparam${index + 1}`, seguimientoValues[index]);
      });

      await seguimientoRequest.query(querySeguimiento);
    }

    if (cnotificacion && data.repuestos) {
      await Promise.all(data.repuestos.map(item => {
        const repuestoRequest = pool.request()
          .input('cnotificacion', sql.Int, cnotificacion)
          .input('crepuesto', sql.Int, parseInt(item.crepuesto))
          .input('ncantidad', sql.Int, item.ncantidad)
          .input('xniveldano', sql.NVarChar, item.xniveldano)
          .input('fcreacion', sql.DateTime, new Date())
          .input('cusuariocreacion', sql.Int, data.cusuario)
          .query(`
            INSERT INTO EVREPUESTONOTIFICACION (
              cnotificacion, crepuesto, ncantidad, xniveldano, fcreacion, cusuariocreacion
            )
            VALUES (
              @cnotificacion, @crepuesto, @ncantidad, @xniveldano, @fcreacion, @cusuariocreacion
            );
          `);
        return repuestoRequest;
      }));
    }

    if (cnotificacion && data.serviceOrder) {
      const serviceOrderKeys = ['cnotificacion', ...Object.keys(data.serviceOrder)];
      const serviceOrderValues = [cnotificacion, ...Object.values(data.serviceOrder)];

      const placeholdersServiceOrder = serviceOrderKeys.map((_, i) => `@soparam${i + 1}`).join(',');
      const queryServiceOrder = `INSERT INTO EVORDENSERVICIO (${serviceOrderKeys.join(',')}) VALUES (${placeholdersServiceOrder})`;

      const serviceOrderRequest = pool.request();
      serviceOrderKeys.forEach((key, index) => {
        serviceOrderRequest.input(`soparam${index + 1}`, serviceOrderValues[index]);
      });

      await serviceOrderRequest.query(queryServiceOrder);
    }

    return event;
  } catch (error) {
    console.error(error.message);
    return { error: error.message };
  } finally {
    if (pool) {
      await pool.close();
    }
  }
};

const getServiceOrderById = async (id) => {
  try {
    const order = await ServiceOrder.findAll({
      where: {
        cnotificacion: id
      },
      attributes: [
        'corden', 'cservicio', 'xservicio', 'cnotificacion', 
        'fsolicitud', 'fajuste', 'cproveedor', 'xproveedor', 
        'xdireccion_proveedor', 'xidentidad_proveedor', 
        'xcorreo_proveedor', 'xtelefono_proveedor', 
        'xobservacion', 'itiporeporte'
      ],
    });
    const ordenes = order.map((item) => item.get({ plain: true }));
    return ordenes;
  } catch (error) {
    return { error: error.message };
  }
};

export default {
    searchEvents,
    getEvent,
    getSeguimientosById,
    getSeguimientos,
    createEvents,
    getServiceOrderById
}