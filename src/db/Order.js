import sql from "mssql";
import sequelize from '../config/database.js';

const Search = sequelize.define('evVordenServicio', {}, {tableName: 'evVordenServicio'});

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

const getOrders = async() => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    SELECT id, corden, xobservacion, fcreacion, xdanos, xdesde, xhacia, mmontototal FROM EVORDENSERVICIO`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const getOrdersByUser = async(body) => {
  try {
    const items = await Search.findAll({
      where: {
        ccontratoflota: body
      },
      attributes: ['corden','cservicio','xservicio','cnotificacion','fsolicitud','fajuste','cproveedor','xproveedor','xdireccion_proveedor','xidentidad_proveedor','xcorreo_proveedor','xtelefono_proveedor','xobservacion','ireporte','xnombresiniestro','xtelefono_siniestro','xmarca','xmodelo','xplaca','ccontratoflota','xdescripcion', 'cestatusgeneral','xestatusgeneral'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
  
}

const getDetailedOrder = async () => {

}

export default {
  getOrders,
  getDetailedOrder,
  getOrdersByUser
}

