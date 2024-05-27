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
    let result = await pool.request().query('SELECT cmoneda, xdescripcion, xmoneda from MAMONEDAS')
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const getCuentasMaestros = async() => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query('SELECT ctipocuentabancaria, xtipocuentabancaria from MATIPOCUENTABANCARIA')
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
const getMaEstatuses = async() => {
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
const getMaCiudades = async(estado) => {
  try {
    let pool = await sql.connect(sqlConfig);
    // console.log(pais)
    let result = await pool.request().query(`SELECT cciudad, xdescripcion_l from MACIUDADES where cestado = ${estado.toString()}`)
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
const getMoneda = async(id) => {
  try {
    let pool = await sql.connect(sqlConfig)
    let result = await pool.request().query(`SELECT * from MAMONEDAS WHERE cmoneda = ${parseInt(id)}`)

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
    
    await pool.close();
    return { 
      result: result.recordset[0]
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
const getMaBancos = async(getMaBancos) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT cbanco, xbanco from MABANCO where cbanco = ${getMaBancos.cbanco}`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const getMaProveedores = async() => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query('SELECT cproveedor, xnombre from MAPROVEEDORES')
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const getMaPropietarios = async(id) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT cpropietario, xnombre,xapellido,cestadocivil,csexo,fnacimiento,icedula,xcedula,xdireccion,xemail from TRPROPIETARIO where cpropietario = ${id.toString()}`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}
const getMaParentescos = async(id) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT cparentesco, xparentesco,cpais from MAPARENTESCO where cparentesco = ${id.toString()}`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}

const getMaEstadocivil = async(id) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT cestadocivil, xestadocivil,cpais from MAESTADOCIVIL where cestadocivil = ${id.toString()}`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}

const getMaMarcas = async(id) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT id, cmarca,xmarca, cmodelo,xmodelo,cversion, xversion,xtrans,xmotor,qano, npasajero from MAINMA where id = ${id.toString()}`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}

const getMaVehiculos = async(id) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT cvehiculopropietario, ccompania, cmarca,cmodelo,cversion, xmarca,xmodelo,xversion,xplaca,xclase,fano,ccolor,nkilometraje,xserialcarroceria,xserialmotor,cpais,cmoneda,xcolor from TRVEHICULOPROPIETARIO where cvehiculopropietario = ${id.toString()}`)
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
  getStatus,
  getMaPropietarios,
  getMaProveedores,
  getMaParentescos,
  getMaEstadocivil,
  getMaVehiculos,
  getMaMarcas,
  getMoneda,
  getMaRepuestos,
  getMaEstatus,
  getMaEstatuses,
  getCuentasMaestros
}