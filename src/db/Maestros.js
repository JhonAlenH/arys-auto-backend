import sql from "mssql";
import sequelize from '../config/database.js';
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

const Monedas = sequelize.define('maVmonedas', {});
const Paises = sequelize.define('maVpais', {});
const Metodologiapago = sequelize.define('MAVMETODOLOGIAPAGO', {},{tableName: 'MAVMETODOLOGIAPAGO'});
const Proveedores = sequelize.define('MAPROVEEDORES', {});
const Bancos = sequelize.define('MAVBANCO', {},{tableName: 'MAVBANCO'});
const Companias = sequelize.define('MAVCOMPANIA', {},{tableName: 'MAVCOMPANIA'});
const Clientes = sequelize.define('CLVCLIENTE', {},{tableName: 'CLVCLIENTE'});
const Propietarios = sequelize.define('TRPROPIETARIO', {},{tableName: 'TRPROPIETARIO'});
const Parentescos = sequelize.define('MAVPARENTESCO', {},{tableName: 'MAVPARENTESCO'});
const Estadocivil = sequelize.define('MAVESTADOCIVIL', {},{tableName: 'MAVESTADOCIVIL'});
const Tipodocidentidad = sequelize.define('MAVTIPODOCIDENTIDAD', {},{tableName: 'MAVTIPODOCIDENTIDAD'});
const Tiposervicios = sequelize.define('MAVTIPOSERVICIOS', {},{tableName: 'MAVTIPOSERVICIOS'});
const Servicios = sequelize.define('MAVSERVICIO', {},{tableName: 'MAVSERVICIO'});
const Vehiculos = sequelize.define('TRVVEHICULOPROPIETARIO', {},{tableName: 'TRVVEHICULOPROPIETARIO'});
const Marcas = sequelize.define('MAINMA', {},{tableName: 'MAINMA'});

const getMaEstatus = async() => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query('SELECT cestatusgeneral, xestatusgeneral from MAESTATUSGENERAL')
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const getMaCiudades = async(estado) => {
  try {
    let pool = await sql.connect(sqlConfig);
    // console.log(pais)
    let result = await pool.request().query(`SELECT cciudad, xdescripcion_l from MACIUDADES where cestado = ${estado}`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const getMaEstados = async(pais) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT cestado, xdescripcion_l from MAESTADOS where cpais = ${pais.toString()}`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const getStatus = async(cestatusgeneral) => {
  try {
    let pool = await sql.connect(sqlConfig)
    let result = await pool.request().query(`SELECT cestatusgeneral, xestatusgeneral from MAESTATUSGENERAL WHERE cestatusgeneral = ${cestatusgeneral}`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const getAseguradoras = async() => {
  try {
    let pool = await sql.connect(sqlConfig)
    let result = await pool.request().query(`SELECT caseguradora, xaseguradora from MAASEGURADORAS`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const getMaRepuestos = async(getMaRepuestos) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT crepuesto, xrepuesto from MAREPUESTO where cpais = ${getMaRepuestos.cpais} and ccompania = ${getMaRepuestos.ccompania}`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}

//  Nuevos
const searchMonedas = async () => {

  try {
    const items = await Monedas.findAll({
      attributes: ['cmoneda', 'xmoneda', 'xdescripcion','xactivo'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    console.log(error.messagec)
    return { error: error.message };
  }
};

const searchMonedasById = async (id) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT cmoneda, xmoneda, xdescripcion, bactivo from MAMONEDAS WHERE bactivo=1 AND cmoneda = ${parseInt(id)}`)
    await pool.close();
    return { 
      result: result.recordset[0]
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

const createMonedas = async(data) => {

  const rData = insert.formatCreateData(data)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    INSERT INTO MAMONEDAS (${rData.keys}) VALUES (${rData.values})`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}

const updateMonedas = async(id, data) => {

  const rData = insert.formatEditData(data)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    UPDATE MAMONEDAS SET ${rData} where cmoneda = ${id}`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const searchPaises = async () => {

  try {
    const items = await Paises.findAll({
      attributes: ['cpais', 'xpais'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    console.log(error.messagec)
    return { error: error.message };
  }
};

const searchPaisesById = async (id) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT cpais, xpais from MAPAIS WHERE cpais = ${parseInt(id)}`)
    await pool.close();
    return { 
      result: result.recordset[0]
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

const createPaises = async(data) => {

  const rData = insert.formatCreateData(data)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    INSERT INTO MAPAIS (${rData.keys}) VALUES (${rData.values})`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}

const updatePaises = async(id, data) => {

  const rData = insert.formatEditData(data)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    UPDATE MAPAIS SET ${rData} where cpais = ${id}`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const searchMetodologiapago = async () => {
  try {
    const items = await Metodologiapago.findAll({
      attributes: ['cmetodologiapago', 'xmetodologiapago'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    console.log(result)
    return result;
  } catch (error) {
    console.log(error.messagec)
    return { error: error.message };
  }
};

const searchMetodologiapagoById = async (id) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT cmetodologiapago, xmetodologiapago from MAMETODOLOGIAPAGO WHERE cmetodologiapago = ${parseInt(id)}`)
    await pool.close();
    return { 
      result: result.recordset[0]
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

const createMetodologiapago = async(data) => {

  const rData = insert.formatCreateData(data)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    INSERT INTO MAMETODOLOGIAPAGO (${rData.keys}) VALUES (${rData.values})`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}

const updateMetodologiapago = async(id, data) => {

  const rData = insert.formatEditData(data)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    UPDATE MAMETODOLOGIAPAGO SET ${rData} where cmetodologiapago = ${id}`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const searchProveedores = async () => {
  try {
    const items = await Proveedores.findAll({
      attributes: ['cproveedor', 'xnombre','xdocidentidad','cpais','xtelefonocelular'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    console.log(error.messagec)
    return { error: error.message };
  }
};

const searchProveedoresById = async (id) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT cproveedor, xnombre,xdocidentidad,cpais,xtelefonocelular,bactivo from MAPROVEEDORES WHERE cproveedor = ${parseInt(id)}`)
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
  console.log(rData)
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
const searchBancos = async () => {
  try {
    const items = await Bancos.findAll({
      attributes: ['cbanco', 'xbanco','cpais','xpais'],
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
    let result = await pool.request().query(`SELECT cbanco, xbanco, cpais, bactivo from MABANCO WHERE cbanco = ${parseInt(id)}`)
    if(result.recordset[0].bactivo == true) {
      result.recordset[0].bactivo = 1
    } else {
      result.recordset[0].bactivo = 0
    }
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
  console.log(rData)
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
const searchCompanias = async () => {
  try {
    const items = await Companias.findAll({
      attributes: ['ccompania', 'xcompania','xrif','xtelefono','xpaginaweb','bactivo'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    console.log(error.messagec)
    return { error: error.message };
  }
};

const searchCompaniasById = async (id) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT ccompania,xcompania,xrif,xpaginaweb,xdireccionfiscal,xrepresentantelegal,xdocidentidad,xtelefono,bactivo from MACOMPANIA WHERE ccompania = ${parseInt(id)}`)
    if(result.recordset[0].bactivo == true) {
      result.recordset[0].bactivo = 1
    } else {
      result.recordset[0].bactivo = 0
    }
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
  console.log(rData)
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
const searchClientes = async () => {
  try {
    const items = await Clientes.findAll({
      attributes: ['ccliente', 'xcliente','xcontrato','xemail','xtelefono'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    console.log('HOLA')
    console.log(error.messagec)
    return { error: error.message };
  }
};
const searchClientesById = async (id) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT ccliente,itipocliente,xcliente,xcontrato,xrepresentante,ccompania,icedula,xcedula,cpais,cestado,cciudad,xdireccionfiscal,xemail,fanomaximo,finicio,xtelefono,bactivo from CLCLIENTE WHERE ccliente = ${parseInt(id)}`)
    if(result.recordset[0].bactivo == true) {
      result.recordset[0].bactivo = 1
    } else {
      result.recordset[0].bactivo = 0
    }
    await pool.close();
    return { 
      result: result.recordset[0]
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

const createClientes = async(data) => {

  const rData = insert.formatCreateData(data)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    INSERT INTO CLCLIENTE (${rData.keys}) VALUES (${rData.values})`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}

const updateClientes = async(id, data) => {

  const rData = insert.formatEditData(data)
  console.log(rData)
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    UPDATE CLCLIENTE SET ${rData} where ccliente = ${id}`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const searchPropietarios = async () => {
  try {
    const items = await Propietarios.findAll({
      attributes: ['cpropietario', 'xnombre','xapellido','xemail','xtelefonocasa','xcedula','cestadocivil'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    return { error: error.message };
  }
};
const searchPropietariosById = async (id) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT cpropietario,xnombre,xapellido,cestadocivil,fnacimiento,xprofesion,xocupacion,xzona_postal,icedula,xrif_cliente, xcedula, cpais,cestado,cciudad,xdireccion,xtelefonocasa,xtelefonocelular,xemail, cparentesco, ccompania,xnacionalidad,bactivo from TRPROPIETARIO where cpropietario = ${parseInt(id)}`)
    if(result.recordset[0].bactivo == true) {
      result.recordset[0].bactivo = 1
    } else {
      result.recordset[0].bactivo = 0
    }
    await pool.close();
    return { 
      result: result.recordset[0]
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

const createPropietarios = async(data) => {

  const rData = insert.formatCreateData(data)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    INSERT INTO TRPROPIETARIO (${rData.keys}) VALUES (${rData.values})`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}

const updatePropietarios = async(id, data) => {

  const rData = insert.formatEditData(data)
  console.log(rData)
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
const searchParentescos = async () => {
  try {
    const items = await Parentescos.findAll({
      attributes: ['cparentesco', 'xparentesco','cpais','xpais','bactivo'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    return { error: error.message };
  }
};
const searchParentescosById = async (id) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT cparentesco,xparentesco,cpais,bactivo from MAPARENTESCO where cparentesco = ${parseInt(id)}`)
    if(result.recordset[0].bactivo == true) {
      result.recordset[0].bactivo = 1
    } else {
      result.recordset[0].bactivo = 0
    }
    await pool.close();
    return { 
      result: result.recordset[0]
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

const createParentescos = async(data) => {

  const rData = insert.formatCreateData(data)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    INSERT INTO MAPARENTESCO (${rData.keys}) VALUES (${rData.values})`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const updateParentescos = async(id, data) => {

  const rData = insert.formatEditData(data)
  console.log(rData)
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    UPDATE MAPARENTESCO SET ${rData} where cparentesco = ${id}`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const searchEstadocivil = async () => {
  try {
    const items = await Estadocivil.findAll({
      attributes: ['cestadocivil','xestadocivil','cpais','xpais','ccompania','xcompania','bactivo'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    return { error: error.message };
  }
};
const searchEstadocivilById = async (id) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT cestadocivil,xestadocivil,cpais,ccompania,bactivo from MAESTADOCIVIL where cestadocivil = ${parseInt(id)}`)
    if(result.recordset[0].bactivo == true) {
      result.recordset[0].bactivo = 1
    } else {
      result.recordset[0].bactivo = 0
    }
    await pool.close();
    return { 
      result: result.recordset[0]
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

const createEstadocivil = async(data) => {

  const rData = insert.formatCreateData(data)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    INSERT INTO MAESTADOCIVIL (${rData.keys}) VALUES (${rData.values})`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const updateEstadocivil = async(id, data) => {

  const rData = insert.formatEditData(data)
  console.log(rData)
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    UPDATE MAESTADOCIVIL SET ${rData} where cestadocivil = ${id}`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const searchTipodocidentidad = async () => {
  try {
    const items = await Tipodocidentidad.findAll({
      attributes: ['ctipodocidentidad','xdescripcion','cpais','xpais','bactivo'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    return { error: error.message };
  }
};
const searchTipodocidentidadById = async (id) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT ctipodocidentidad,xdescripcion,cpais,bactivo from MATIPODOCIDENTIDAD where ctipodocidentidad = ${parseInt(id)}`)
    if(result.recordset[0].bactivo == true) {
      result.recordset[0].bactivo = 1
    } else {
      result.recordset[0].bactivo = 0
    }
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
  console.log(rData)
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
const searchTiposervicios = async () => {
  try {
    const items = await Tiposervicios.findAll({
      attributes: ['ctiposervicio','xtiposervicio','ccompania','xcompania','bactivo'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    return { error: error.message };
  }
};
const searchTiposerviciosById = async (id) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT ctiposervicio,xtiposervicio,ccompania,bactivo from MATIPOSERVICIOS where ctiposervicio = ${parseInt(id)}`)
    if(result.recordset[0].bactivo == true) {
      result.recordset[0].bactivo = 1
    } else {
      result.recordset[0].bactivo = 0
    }
    await pool.close();
    return { 
      result: result.recordset[0]
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};
const createTiposervicios = async(data) => {

  const rData = insert.formatCreateData(data)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    INSERT INTO MATIPOSERVICIOS (${rData.keys}) VALUES (${rData.values})`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const updateTiposervicios = async(id, data) => {

  const rData = insert.formatEditData(data)
  console.log(rData)
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    UPDATE MATIPOSERVICIOS SET ${rData} where ctiposervicio = ${id}`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const searchServicios = async () => {
  console.log('Buscar servicio')
  try {
    const items = await Servicios.findAll({
      attributes: ['cservicio','xservicio','ccompania','xcompania','cpais','xpais','bactivo'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    return { error: error.message };
  }
};
const searchServiciosById = async (id) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT cservicio,xservicio,ctiposervicio,cpais,ccompania,bcantidad,bactivo from MASERVICIO where cservicio = ${parseInt(id)}`)
    if(result.recordset[0].bactivo == true) {
      result.recordset[0].bactivo = 1
    } else {
      result.recordset[0].bactivo = 0
    }
    await pool.close();
    return { 
      result: result.recordset[0]
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};
const createServicios = async(data) => {

  const rData = insert.formatCreateData(data)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    INSERT INTO MASERVICIO (${rData.keys}) VALUES (${rData.values})`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const updateServicios = async(id, data) => {

  const rData = insert.formatEditData(data)
  console.log(rData)
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    UPDATE MASERVICIO SET ${rData} where cservicio = ${id}`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const searchVehiculos = async () => {

  try {
    const items = await Vehiculos.findAll({
      attributes: ['cvehiculopropietario','xnombrec','xcedula','xcompania','qano','xplaca'],
    });
    const result = items.map((item) => item.get({ plain: true }));

    return result;
  } catch (error) {
    return { error: error.message };
  }
};
const searchVehiculosById = async (id) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT cpropietario,cvehiculopropietario,xrif_cliente, xcedula,ccompania,id_inma,xplaca,fano,bactivo,xserialcarroceria, xserialmotor,cpais from TRVEHICULOPROPIETARIO where cvehiculopropietario = ${parseInt(id)}`)
    if(result.recordset[0].bactivo == true) {
      result.recordset[0].bactivo = 1
    } else {
      result.recordset[0].bactivo = 0
    }
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
  console.log(rData)
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
const searchMarcas = async () => {
  console.log('Buscar Marcas')
  try {
    const items = await Marcas.findAll({
      attributes: ['id','xmarca','xmodelo','xversion','qano'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    return { error: error.message };
  }
};
const searchMarcasById = async (id) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT id,cmarca,xmarca,cmodelo,xmodelo,cversion,xversion,ccodtrans,xtrans, xmotor, ncov, qano, ntipoveh,npasajero,ctarifa_exceso, xuso, xclase_casco, msum,
ncapcarga, npesovacio,ntamano, ntipovehespecial,xclasificacion from MAINMA where id = ${parseInt(id)}`)
    if(result.recordset[0].bactivo == true) {
      result.recordset[0].bactivo = 1
    } else {
      result.recordset[0].bactivo = 0
    }
    await pool.close();
    return { 
      result: result.recordset[0]
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};
const createMarcas = async(data) => {

  const rData = insert.formatCreateData(data)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    INSERT INTO MAINMA (${rData.keys}) VALUES (${rData.values})`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const updateMarcas = async(id, data) => {

  const rData = insert.formatEditData(data)
  console.log(rData)
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    UPDATE MAINMA SET ${rData} where id = ${id}`)
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
  getAseguradoras,
  getMaCiudades,
  getMaEstados,
  getStatus,
  getMaRepuestos,
  getMaEstatus,

  createMonedas,
  searchMonedas,
  updateMonedas,
  searchMonedasById,
  createPaises,
  searchPaises,
  updatePaises,
  searchPaisesById,
  createMetodologiapago,
  searchMetodologiapago,
  updateMetodologiapago,
  searchMetodologiapagoById,
  createProveedores,
  searchProveedores,
  updateProveedores,
  searchProveedoresById,
  createBancos,
  searchBancos,
  updateBancos,
  searchBancosById,
  createCompanias,
  searchCompanias,
  updateCompanias,
  searchCompaniasById,
  createClientes,
  searchClientes,
  updateClientes,
  searchClientesById,
  createPropietarios,
  searchPropietarios,
  updatePropietarios,
  searchPropietariosById,
  createParentescos,
  searchParentescos,
  updateParentescos,
  searchParentescosById,
  createEstadocivil,
  searchEstadocivil,
  updateEstadocivil,
  searchEstadocivilById,
  createTipodocidentidad,
  searchTipodocidentidad,
  updateTipodocidentidad,
  searchTipodocidentidadById,
  createTiposervicios,
  searchTiposervicios,
  updateTiposervicios,
  searchTiposerviciosById,
  createServicios,
  searchServicios,
  updateServicios,
  searchServiciosById,
  searchVehiculos,
  updateVehiculos,
  searchVehiculosById,
  createMarcas,
  searchMarcas,
  updateMarcas,
  searchMarcasById,
}