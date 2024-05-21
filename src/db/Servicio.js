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


const createService = async() => {

}

const searchPlanServices = async(cplan) => {
  try {

    let pool = await sql.connect(sqlConfig)
    let result = await pool.request().query(`SELECT * from MAPLANES_SERVICIOS WHERE cplan = ${cplan};`)
    await pool.close();
    console.log(result.recordset.length);

    if(result.recordset.length > 0){
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
        result.recordset[j] = resultLowerCase
        j++ 
      };
    }

    
    
    if (result.rowsAffected < 1) {
        return false;
    }
    await pool.close();
    return result.recordset;
  }
  catch (error) {
      console.log(error.message)
      return { error: error.message };
  }
}
const getServicesAndTypes = async(ccompania) => {
  try {

    let pool = await sql.connect(sqlConfig)
    let result = await pool.request().query(`SELECT * from suVServicioTipos WHERE ccompania = ${ccompania};`)

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
      result.recordset[j] = resultLowerCase
      j++ 
    };

    await pool.close();
    
    if (result.rowsAffected < 1) {
        return false;
    }
    await pool.close();
    return result.recordset;
  }
  catch (error) {
      console.log(error.message)
      return { error: error.message };
  }
}

const linkServicios = async(services, cplan) => {
  
  try {
    let pool = await sql.connect(sqlConfig);
    const servicesSplittedString = services.split('[]')[0].split(',')

    if(servicesSplittedString.length > 0) {
      
    } 
    
    const servicios = await pool.request().query(`
    DELETE FROM MAPLANES_SERVICIOS WHERE cplan = ${parseInt(cplan)}
    `)

    console.log(servicios);

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
  createService,
  linkServicios,
  getTypeServices,
  getServicesByType,
  searchPlanServices,
  getServicesAndTypes
}

