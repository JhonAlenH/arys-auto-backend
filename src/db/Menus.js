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

const getMenus = async(rol) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    SELECT cmodulo, xmodulo, xicono, xruta FROM SEMODULO WHERE crol = ${rol}`)
    await pool.close();
    return { 
      result: result.recordset
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
}


export default {
  getMenus,
}

