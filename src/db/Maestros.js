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
    let result = await pool.request().query('SELECT * from MAMONEDAS')
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const getMaCompania = async() => {
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
const getMaPais = async() => {
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
const getMaMetPago = async() => {
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
  getMaCompania,
  getMaPais,
  getMaMetPago,
  getServicios,
  getAseguradoras
}