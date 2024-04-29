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
const getMaMonedas = async() => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query('SELECT cmoneda, xdescripcion from MAMONEDAS')
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const getMaCompanias = async() => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query('SELECT ccompania, xcompania from MACOMPANIA')
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const getMaCompania = async(id) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT ccompania, xcompania from MACOMPANIA where ccompania = ${id.toString()}`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const getMaPaises = async() => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query('SELECT cpais, xpais from MAPAIS')
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const getMaCiudades = async(pais, estado) => {
  try {
    let pool = await sql.connect(sqlConfig);
    // console.log(pais)
    let result = await pool.request().query(`SELECT cciudad, xdescripcion_l from MACIUDADES where cpais = ${pais.toString()} and cestado = ${estado.toString()}`)
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
const getMaMetsPago = async() => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query('SELECT cmetodologiapago, xmetodologiapago from MAMETODOLOGIAPAGO')
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const getMaMetPago = async(cmetodologiapago) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT cmetodologiapago, xmetodologiapago from MAMETODOLOGIAPAGO where cmetodologiapago = ${cmetodologiapago}`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const getServicios = async(cpais, ccompania) => {
  try {
    let pool = await sql.connect(sqlConfig)
    let result = await pool.request().query(`SELECT cservicio, xservicio from MASERVICIO WHERE cpais = ${cpais} AND ccompania = ${ccompania}`)
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

export default {
  getMaMonedas,
  getMaCompanias,
  getMaCompania,
  getMaPaises,
  getMaMetsPago,
  getMaMetPago,
  getServicios,
  getAseguradoras,
  getMaCiudades,
  getMaEstados,
  getStatus
}