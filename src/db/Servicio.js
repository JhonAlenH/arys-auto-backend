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

const getServicesByType = async(ctiposervicio, ccompania) => {
  
  try {
    let pool = await sql.connect(sqlConfig)
    let result = await pool.request().query(`SELECT cservicio, xservicio, ctiposervicio from MASERVICIO WHERE ccompania = ${ccompania};`)
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

const linkServicios = async(services, cplan) => {
  
  try {
    let pool = await sql.connect(sqlConfig);
    const servicesSplittedString = services.split('[]')

    let servicesGetted = await pool.request().query(`SELECT cservicio, ctiposervicio FROM MASERVICIO WHERE ctiposervicio in (${servicesSplittedString[0]});`)
    console.log(cplan);

    const table = new sql.Table('MASERVICIOPLAN');
    table.columns.add('cplan', sql.Int, {nullable: false});
    table.columns.add('cservicio', sql.Int, {nullable: false});
    table.columns.add('ctiposervicio', sql.Int, {nullable: true});

    for (const service of servicesGetted.recordset) {
      table.rows.add(cplan, service.cservicio, service.ctiposervicio);
    }
    
    let result = await pool.request().bulk(table)
    
    if (servicesGetted.rowsAffected < 1) {
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

