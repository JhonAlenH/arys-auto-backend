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
    const servicesSplittedString = services.split('[]')[0].split(',')

    const table = new sql.Table('MAPLANES_SERVICIOS');
    table.columns.add('cplan', sql.Int, {nullable: true});
    table.columns.add('cservicio', sql.Int, {nullable: true});
    table.columns.add('ctiposervicio', sql.Int, {nullable: true});

    for (const service of servicesSplittedString) {
      const splittedServiceInfo =  service.split('?')
      table.rows.add(cplan, parseInt(splittedServiceInfo[0]), parseInt(splittedServiceInfo[1]));
    }
    
    let result = await pool.request().bulk(table)

    await pool.close();
    
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

