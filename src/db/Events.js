import { Sequelize, DataTypes, Op } from 'sequelize';
import sequelize from '../config/database.js';
import sql from "mssql";
import moment from 'moment';
import dayjs from "dayjs";
import insert from "../utilities/insert.js";
import webSocket from '../utilities/webSocket.js';
import trackingController from '../controllers/trackingController.js';

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
const Notas = sequelize.define('EVNOTANOTIFICACION', {}, {tableName: 'EVNOTANOTIFICACION'});

const Search = sequelize.define('evVnotificaciones', {});
const ServiceOrder = sequelize.define('evVordenServicio', {}, {tableName: 'evVordenServicio'});
const ServiceOrder2 = sequelize.define('evVordenServicio', {
  corden: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: true,
  },
}, {tableName: 'evVordenServicio'});

const Replacement = sequelize.define('evVrepuestos', {});


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
const getSeguimientos = async (body) => {
  try {
    let items = []
    let keys = Object.keys(body)
    if(keys.length <= 0) {
      items = await Seguimentos.findAll({
        where:{
          bcerrado: false
        },
        attributes: ['cnotificacion','cseguimientonotificacion', 'xtiposeguimiento', 'xobservacion', 'ctiposeguimiento', 'cmotivoseguimiento', 'xmotivoseguimiento', 'bcerrado', 'fseguimientonotificacion'],
      });
    } else {
      let filters = {}
      var d = new Date()
      if(body.fseguimientonotificacion == '=') {
        filters = {
          [Op.and] : [
            {fseguimientonotificacion: {
              [Op.gte]: moment().format('YYYY-MM-DD', 'date')},
            }, 
            {fseguimientonotificacion: {
              [Op.lte]: moment().add(1, 'days').format('YYYY-MM-DD', 'date')},
            }, 
          ]
        }
        console.log('filtro', filters);
      } else if (body.fseguimientonotificacion == '>') {
        filters = {
          fseguimientonotificacion: {
            [Op.gte]: moment().add(1, 'days').format('YYYY-MM-DD', 'date')
          }
        }
        console.log('filtro', filters);
      } else if (body.fseguimientonotificacion == '<') {
        filters = {
          fseguimientonotificacion: {
            [Op.lt]: moment().format('YYYY-MM-DD', 'date')
          }
        }
        console.log('filtro', filters);
      } else {
        filters = body
      }
      filters.bcerrado = false
      items = await Seguimentos.findAll({
        where: filters,
        attributes: ['cnotificacion','cseguimientonotificacion', 'xtiposeguimiento', 'xobservacion', 'ctiposeguimiento', 'cmotivoseguimiento', 'xmotivoseguimiento', 'bcerrado', 'fseguimientonotificacion'],
      });
    }
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
const getNotasById = async (id) => {
  try {
    let items = []
    items = await Notas.findAll({
      where: {
        cnotificacion: id
      },
      attributes: ['cnotificacion','cnotanotificacion', 'xrutaarchivo', 'xnotanotificacion', 'xnombrenota'],
    });
    const result = items.map((item) => item.get({ plain: true }));

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
  const keys = Object.keys(data).filter(key => key !== 'seguimientos' && key !== 'repuestos' && key !== 'serviceOrder' && key !== 'cnotificacion' && key !== 'notas' && key !== 'quotes');
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

    if (cnotificacion && data.seguimientos) {
      await Promise.all(data.seguimientos.map(async (seguimiento) => {
        seguimiento.cnotificacion = cnotificacion
        const seguimientoKeys = Object.keys(seguimiento).filter(key => 
          key !== 'xtiposeguimiento' && 
          key !== 'xmotivoseguimiento' && 
          key !== 'xfseguimientonotificacion' && 
          key !== 'ccontratoflota' && 
          key !== 'type'
        );
        const seguimientoValues = seguimientoKeys.map(key => seguimiento[key] === '' ? null : seguimiento[key]);
    
        const placeholdersSeguimiento = seguimientoKeys.map((_, i) => `@soparam${i + 1}`).join(',');

        const querySeguimiento = `INSERT INTO EVSEGUIMIENTONOTIFICACION (${seguimientoKeys.join(',')}) VALUES (${placeholdersSeguimiento});SELECT SCOPE_IDENTITY() AS cseguimientonotificacion`;
        
        const seguimientoRequest = pool.request();
        seguimientoKeys.forEach((key, index) => {
          seguimientoRequest.input(`soparam${index + 1}`, seguimientoValues[index]);
        });
    
        const response = await seguimientoRequest.query(querySeguimiento);
        if (response.recordset.length > 0) {
            if (seguimiento.bcerrado == false){
              seguimiento.cseguimientonotificacion = response.recordset[0].cseguimientonotificacion
              webSocket.addNotification(`AVISO: seguimiento #${seguimiento.cseguimientonotificacion} pendiente en esta notificación.`, 'admin/events/notifications/' + seguimiento.cnotificacion, 1, 2)
              // trackingController.recordTrackersInfo(seguimiento.ntiempoalerta, seguimiento)
            }
          }
      }))
    }

    if (cnotificacion && data.repuestos) {
      await Promise.all(data.repuestos.map(item => {
        const repuestoRequest = pool.request()
          .input('cnotificacion', sql.Int, cnotificacion)
          .input('crepuesto', sql.Int, parseInt(item.crepuesto))
          .input('ncantidad', sql.Int, item.ncantidad)
          .input('xniveldano', sql.NVarChar, item.xniveldano)
          .input('bactivo', sql.Bit, item.bactivo)
          .input('fcreacion', sql.DateTime, new Date())
          .input('cusuariocreacion', sql.Int, data.cusuario)
          .query(`
            INSERT INTO EVREPUESTONOTIFICACION (
              cnotificacion, crepuesto, ncantidad, xniveldano, bactivo, fcreacion, cusuariocreacion
            )
            VALUES (
              @cnotificacion, @crepuesto, @ncantidad, @xniveldano, @bactivo, @fcreacion, @cusuariocreacion
            );
          `);
        return repuestoRequest;
      }));
    } 

    // if (cnotificacion && Array.isArray(data.serviceOrder)) {
    //   await Promise.all(data.serviceOrder.map(async (serviceOrder) => {
    //     serviceOrder.cnotificacion = cnotificacion
    //     const filteredServiceOrder = Object.entries(serviceOrder).filter(([key]) => key !== 'type' && key !== 'cnotificacion' && key !== 'xestatusgeneral');
          
    //     const serviceOrderKeys = ['cnotificacion', ...filteredServiceOrder.map(([key]) => key)];
    //     const serviceOrderValues = [cnotificacion, ...filteredServiceOrder.map(([, value]) => value)];

    //     const placeholdersServiceOrder = serviceOrderKeys.map((_, i) => `@soparam${i + 1}`).join(',');
    //     const queryServiceOrder = `INSERT INTO EVORDENSERVICIO (${serviceOrderKeys.join(',')}) VALUES (${placeholdersServiceOrder})`;

    //     const serviceOrderRequest = pool.request();
    //     serviceOrderKeys.forEach((key, index) => {
    //       serviceOrderRequest.input(`soparam${index + 1}`, serviceOrderValues[index]);
    //     });

    //     await serviceOrderRequest.query(queryServiceOrder);
    //   }));
    // }

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

const updateEvents = async (data) => {
  let pool;
  try {
    pool = await sql.connect(sqlConfig);
    if(Array.isArray(data.seguimientos) && data.seguimientos.length > 0){
      await Promise.all(data.seguimientos.map(async (seguimiento) => {
        if (seguimiento.type == 'create') {
          const seguimientoKeys = Object.keys(seguimiento).filter(key => 
            key !== 'xtiposeguimiento' && 
            key !== 'xmotivoseguimiento' && 
            key !== 'xfseguimientonotificacion' && 
            key !== 'ccontratoflota' && 
            key !== 'type'
          );
          const seguimientoValues = seguimientoKeys.map(key => seguimiento[key] === '' ? null : seguimiento[key]);
      
          const placeholdersSeguimiento = seguimientoKeys.map((_, i) => `@soparam${i + 1}`).join(',');

          const querySeguimiento = `INSERT INTO EVSEGUIMIENTONOTIFICACION (${seguimientoKeys.join(',')}) VALUES (${placeholdersSeguimiento}); SELECT SCOPE_IDENTITY() AS cseguimientonotificacion`;
          
          const seguimientoRequest = pool.request();
          seguimientoKeys.forEach((key, index) => {
            seguimientoRequest.input(`soparam${index + 1}`, seguimientoValues[index]);
          });
      
          const response = await seguimientoRequest.query(querySeguimiento);
          if (response.recordset.length > 0) {
            if (seguimiento.bcerrado == false){
              seguimiento.cseguimientonotificacion = response.recordset[0].cseguimientonotificacion
              webSocket.addNotification(`AVISO: seguimiento #${seguimiento.cseguimientonotificacion} pendiente en esta notificación.`, 'admin/events/notifications/' + seguimiento.cnotificacion, 1, 2)
              // trackingController.recordTrackersInfo(seguimiento.ntiempoalerta, seguimiento)
            }
          }
        } else if (seguimiento.type == 'update') {
          const keys = Object.keys(seguimiento).filter(key => 
            key !== 'xtiposeguimiento' && 
            key !== 'xmotivoseguimiento' && 
            key !== 'xfseguimientonotificacion' && 
            key !== 'ccontratoflota' && 
            key !== 'cseguimientonotificacion' && 
            key !== 'type'
          );
          const setClause = keys.map((key, index) => `${key} = @param${index + 1}`).join(', ');
      
          const queryUpdate = `UPDATE EVSEGUIMIENTONOTIFICACION SET ${setClause} WHERE cnotificacion = @cnotificacion AND cseguimientonotificacion = @cseguimientonotificacion`;
      
          const updateRequest = pool.request();
          keys.forEach((key, index) => {
              const value = seguimiento[key] === '' ? null : seguimiento[key];
              updateRequest.input(`param${index + 1}`, value);
          });
          updateRequest.input('cnotificacion', seguimiento.cnotificacion);
          updateRequest.input('cseguimientonotificacion', seguimiento.cseguimientonotificacion);
          console.log(queryUpdate);
      
          await updateRequest.query(queryUpdate);
          if (seguimiento.bcerrado == true) {
            trackingController.stopRecordTrack(seguimiento.cseguimientonotificacion)
          }
        }
      }));
    }
    if(Array.isArray(data.serviceOrder) && data.serviceOrder.length > 0){
      await Promise.all(data.serviceOrder.map(async (serviceOrder) => {
        if (serviceOrder.type == 'create') {
          const serviceOrderKeys = Object.keys(serviceOrder).filter(key => key !== 'type');
          const xestatusIndex = serviceOrderKeys.findIndex(key=>key == 'xestatusgeneral')
          serviceOrderKeys.splice(xestatusIndex, 1)
          const serviceOrderValues = serviceOrderKeys.map(key => serviceOrder[key] === '' ? null : serviceOrder[key]);
      
          const placeholdersServiceOrder = serviceOrderKeys.map((_, i) => `@soparam${i + 1}`).join(',');

          
      
          const queryServiceOrder = `INSERT INTO EVORDENSERVICIO (${serviceOrderKeys.join(',')}) VALUES (${placeholdersServiceOrder})`;
          
          const serviceOrderRequest = pool.request();
          serviceOrderKeys.forEach((key, index) => {
              serviceOrderRequest.input(`soparam${index + 1}`, serviceOrderValues[index]);
          });
      
          await serviceOrderRequest.query(queryServiceOrder);
      }else if (serviceOrder.type == 'update') {
          const keys = Object.keys(serviceOrder).filter(key => 
              key !== 'seguimiento' && 
              key !== 'repuestos' && 
              key !== 'type' && 
              key !== 'xproveedor' &&
              key !== 'xdireccion_proveedor' &&
              key !== 'xidentidad_proveedor' &&
              key !== 'xcorreo_proveedor' &&
              key !== 'xtelefono_proveedor' &&
              key !== 'itiporeporte' &&
              key !== 'corden' &&
              key !== 'cnotificacion' &&
              key !== 'xestatusgeneral' &&
              key !== 'fsolicitud'
          );
          const setClause = keys.map((key, index) => `${key} = @param${index + 1}`).join(', ');
      
          const queryUpdate = `UPDATE EVORDENSERVICIO SET ${setClause} WHERE cnotificacion = @cnotificacion AND corden = @corden`;
      
          const updateRequest = pool.request();
          keys.forEach((key, index) => {
              const value = serviceOrder[key] === '' ? null : serviceOrder[key];
              updateRequest.input(`param${index + 1}`, value);
          });
          updateRequest.input('cnotificacion', serviceOrder.cnotificacion);
          updateRequest.input('corden', serviceOrder.corden);
      
          await updateRequest.query(queryUpdate);
        } 
      }));
    }
    if(Array.isArray(data.notas) && data.notas.length > 0){
      
      let notasKeys = Object.keys(data.notas[data.notas.length - 1])
      const notasValues = []

      const indexKey = notasKeys.findIndex(nota => nota == 'type')
      notasKeys.splice(indexKey, 1)
      await Promise.all(data.notas.map(async (nota) => {
        const notaValues = Object.values(nota)
        notaValues.splice(indexKey, 1)
        notasValues.push(notaValues)
        let valuesString = ''
        let index = 1
        
        for (let value of notaValues) {
          if(typeof value == 'string'){
            valuesString = valuesString + "'" + value + "'"
          } else { 
            valuesString = valuesString + value
          }
          if(index < notaValues.length) {
            valuesString = valuesString + ','
          }
          index++
        }
        if (nota.type == 'create') {
          let query = `INSERT INTO EVNOTANOTIFICACION (${notasKeys.join(',')}) VALUES (${valuesString})`
          let pool = await sql.connect(sqlConfig);
          let result = await pool.request().query(query)
          webSocket.addNotification(`Nuevas notas añadidas a la notificación #${data.cnotificacion}`, `admin/events/notifications/${data.cnotificacion}`, 1, 2)
        }
      }))
    }
    if(Array.isArray(data.repuestos) && data.repuestos.length > 0){
      await Promise.all(data.repuestos.map(async (repuestos) => {
        if (repuestos.type == 'create') {
          const repuestosKeys = Object.keys(repuestos).filter(key => key !== 'type');
          const repuestosValues = repuestosKeys.map(key => repuestos[key] === '' ? null : repuestos[key]);
      
          const placeholdersRepuestos = repuestosKeys.map((_, i) => `@soparam${i + 1}`).join(',');

          const queryRepuestos = `INSERT INTO EVREPUESTONOTIFICACION (${repuestosKeys.join(',')}) VALUES (${placeholdersRepuestos})`;
          
          const RepuestosRequest = pool.request();
          repuestosKeys.forEach((key, index) => {
              RepuestosRequest.input(`soparam${index + 1}`, repuestosValues[index]);
          });
      
          await RepuestosRequest.query(queryRepuestos);
      }else if (repuestos.type == 'update') {
          const keys = Object.keys(repuestos).filter(key => 
              key !== 'type' &&
              key !== 'xrepuesto' &&
              key !== 'bactivo'
          );
          const setClause = keys.map((key, index) => `${key} = @param${index + 1}`).join(', ');
      
          const queryUpdate = `UPDATE EVREPUESTONOTIFICACION SET ${setClause} WHERE cnotificacion = @cnotificacion AND crepuesto = @crepuesto`;
      
          const updateRequest = pool.request();
          keys.forEach((key, index) => {
              const value = repuestos[key] === '' ? null : repuestos[key];
              updateRequest.input(`param${index + 1}`, value);
          });
          updateRequest.input('cnotificacion', repuestos.cnotificacion);
          updateRequest.input('crepuesto', repuestos.crepuesto);
      
          await updateRequest.query(queryUpdate);
        }else if(repuestos.type == 'delete'){
          const keys = Object.keys(repuestos).filter(key => 
            key !== 'type' &&
            key !== 'xrepuesto'
          );
          const setClause = keys.map((key, index) => `${key} = @param${index + 1}`).join(', ');
      
          const queryUpdate = `UPDATE EVREPUESTONOTIFICACION SET ${setClause} WHERE cnotificacion = @cnotificacion AND crepuesto = @crepuesto`;
      
          const updateRequest = pool.request();
          keys.forEach((key, index) => {
              const value = repuestos[key] === '' ? null : repuestos[key];
              updateRequest.input(`param${index + 1}`, value);
          });
          updateRequest.input('cnotificacion', repuestos.cnotificacion);
          updateRequest.input('crepuesto', repuestos.crepuesto);
      
          await updateRequest.query(queryUpdate);
        }
      }));
    }
    
    if (Array.isArray(data.quotes) && data.quotes.length > 0) {
      let ccotizacion;

      // Aplicar "distinct" en quotes
      const distinctQuotes = data.quotes.reduce((acc, current) => {
        const cproveedor = current.cproveedor;
        if (!acc.find(item => item.cproveedor === cproveedor)) {
          acc.push(current);
        }
        return acc;
      }, []);
    
      await Promise.all(distinctQuotes.map(async (quotes) => {
        if (quotes.type == 'create') {
          const getLastCcotizacionQuery = `
            SELECT MAX(ccotizacion) as lastCcotizacion FROM EVCOTIZACIONNOTIFICACION;
          `;
          
          const lastCcotizacionRequest = pool.request();
          const result = await lastCcotizacionRequest.query(getLastCcotizacionQuery);
          
          const lastCcotizacion = result.recordset[0].lastCcotizacion || 0;
          const newCcotizacion = lastCcotizacion + 1;
        
          ccotizacion = newCcotizacion;
          quotes.ccotizacion = newCcotizacion;
        
          let quotesKeys = Object.keys(quotes).filter(key => 
            key !== 'type' && 
            key !== 'crepuesto' &&
            key !== 'ncantidad' &&
            key !== 'xniveldano');
        
          // Asegurarse de que 'ccotizacion' se añade una sola vez
          if (!quotesKeys.includes('ccotizacion')) {
            quotesKeys.push('ccotizacion');
          }
        
          // Generar valores de quotes incluyendo 'ccotizacion'
          const quotesValues = quotesKeys.map(key => quotes[key] === '' ? null : quotes[key]);
        
          const placeholdersquotes = quotesKeys.map((_, i) => `@soparam${i + 1}`).join(',');
        
          const queryquotes = `INSERT INTO EVCOTIZACIONNOTIFICACION (${quotesKeys.join(',')}) VALUES (${placeholdersquotes});`;
          
          const quotesRequest = pool.request(); 
          quotesKeys.forEach((key, index) => {
            quotesRequest.input(`soparam${index + 1}`, quotesValues[index]);
          });
        
          const cotizacion = await quotesRequest.query(queryquotes);
        
        }
        
        
      }));

      await Promise.all(data.quotes.map(async (quotese) => {
        if (quotese.type == 'create') {
          console.log(data.quotes)
          const filteredQuotes = Object.entries(quotese).filter(([key]) => 
            key !== 'type' && 
            key !== 'cnotificacion' &&
            key !== 'cproveedor' &&
            key !== 'xobservacion' &&
            key !== 'mtotalcotizacion' &&
            key !== 'mmontoiva' &&
            key !== 'mtotal' &&
            key !== 'cimpuesto' &&
            key !== 'pimpuesto' &&
            key !== 'cestatusgeneral');

            console.log(ccotizacion)

            const QuotesKeys = ['ccotizacion', ...filteredQuotes.map(([key]) => key)].filter((key, index, self) => self.indexOf(key) === index);
            const QuotesValues = [ccotizacion, ...filteredQuotes.map(([, value]) => value)];
    
            const placeholdersQuotes = QuotesKeys.map((_, i) => `@soparam${i + 1}`).join(',');
            const queryQuotes = `INSERT INTO EVREPUESTOCOTIZACION (${QuotesKeys.join(',')}) VALUES (${placeholdersQuotes})`;
    
            const QuotesRequest = pool.request();
            QuotesKeys.forEach((key, index) => {
              QuotesRequest.input(`soparam${index + 1}`, QuotesValues[index]);
            });
    
            await QuotesRequest.query(queryQuotes);
        }
      })); 
    }

    await pool.close();
    if(Array.isArray(data.seguimientos) && data.seguimientos.length > 0){
      data.seguimientos.forEach( async(seguimiento) => {
        if (seguimiento.type == 'update' && seguimiento.bcerrado == true) {
          await trackingController.quitAlerts(`AVISO: seguimiento #${seguimiento.cseguimientonotificacion} pendiente en esta notificación.`)
        }
      })
    }
    
    const update = 'Notificación Modificada Exitosamente'
    
    
    return update;
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
        'xobservacion', 'itiporeporte', 'cestatusgeneral',
        'xestatusgeneral', 'crepuesto', 'xrepuesto', 'xorigen_grua', 
        'xdestino_grua', 'mmonto_grua', 'cmoneda', 'xmoneda'
        
      ],
    });
    const ordenes = order.map((item) => item.get({ plain: true }));
    return ordenes;
  } catch (error) {
    return { error: error.message };
  }
};

const getServiceOrder = async (corden) => {
  try {
    const ordenes = await ServiceOrder2.findOne({
      where: {
        corden: corden
      },
      attributes: [
        'corden', 'cservicio', 'xservicio', 'cnotificacion', 
        'fsolicitud', 'fajuste', 'cproveedor', 'xproveedor', 
        'xdireccion_proveedor', 'xidentidad_proveedor', 
        'xcorreo_proveedor', 'xtelefono_proveedor', 
        'xobservacion', 'itiporeporte', 'xtelefonosiniestro',
        'xnombresiniestro', 'xmarca', 'xmodelo', 'xplaca',
        'xdescripcion', 'cestatusgeneral', 'xestatusgeneral', 
        'crepuesto', 'xrepuesto', 'xorigen_grua', 'xdestino_grua',
        'mmonto_grua', 'cmoneda', 'xmoneda', 'icedulasiniestro',
        'xcedulasiniestro', 'xdireccionsiniestro', 'xapellidosiniestro'
      ],
    });
    return ordenes ? ordenes.get({ plain: true }) : {};;
  } catch (error) {
    return { error: error.message };
  }
};

const getReplacementById = async (id) => {
  try {
    const repuestos = await Replacement.findAll({
      where: {
        cnotificacion: id,
        bactivo: 1
      },
      attributes: [
        'crepuesto', 'xrepuesto', 'ncantidad', 'xniveldano'    
      ],
    });
    const replacement = repuestos.map((item) => item.get({ plain: true }));
    return replacement;
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
    getNotasById,
    getServiceOrderById,
    getServiceOrder,
    updateEvents,
    getReplacementById
}