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

const getTypeServices = async(ccompania) => {
  try {
    let pool = await sql.connect(sqlConfig)
    let result = await pool.request().query(`SELECT ctiposervicio, xtiposervicio from MATIPOSERVICIOS WHERE ccompania = ${ccompania}`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}

const getServicesByType = async(ctiposervicio) => {
  const table = new sql.Table();
  table.columns.add('cplan', sql.Int);
  table.columns.add('ctiposervicio', sql.VarChar(20));
  table.columns.add('cservicio', sql.VarChar(20));
  try {
    let pool = await sql.connect(sqlConfig)
    let result = await pool.request().query(`SELECT ctiposervicio, xtiposervicio from MATIPOSERVICIOS WHERE ctiposervicio = ${ctiposervicio}`)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}


const createServicio = async() => {

}

const linkServicios = async(services) => {

  try {
    let pool = await sql.connect(sqlConfig);
    const table = new sql.Table();
    table.columns.add('cplan', sql.Int);
    table.columns.add('ctiposervicio', sql.VarChar(20));
    table.columns.add('cservicio', sql.VarChar(20));
    let result = await pool.request()
       .input('id', sql.NVarChar, id)
       .query('select cpropietario, icedula, xcedula, cestado, cciudad, xdireccion, cpais, xzona_postal from TRPROPIETARIO where cpropietario = @id')
    if (result.rowsAffected < 1) {
        return false;
    }
    await pool.close();
    return result;
}
catch (error) {
    console.log(error.message)
    return { error: error.message };
}
}

export default {
  createServicio,
  linkServicios,
  getTypeServices,
  getServicesByType
}

