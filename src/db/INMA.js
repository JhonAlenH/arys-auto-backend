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

const getINMAInfo = async(id) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request()
       .input('id', sql.NVarChar, id)
       .query('select * FROM TRVEHICULOPROPIETARIO where cvehiculopropietario = @id')
    if (result.rowsAffected < 1) {
        return false;
    }
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
    return result.recordset[0];
  }
  catch (error) {
      console.log(error.message)
      return { error: error.message };
  }
}
const getColor = async(ccolor) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request()
       .input('ccolor', sql.NVarChar, ccolor)
       .query('select ccolor, xcolor FROM MACOLOR where ccolor = @ccolor')
    if (result.rowsAffected < 1) {
        return false;
    }
    await pool.close();
    return result.recordset[0];
  }
  catch (error) {
      console.log(error.message)
      return { error: error.message };
  }
}

export default {
  getINMAInfo,
  getColor
}