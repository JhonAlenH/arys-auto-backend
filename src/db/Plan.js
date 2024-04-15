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

const createPlan = async() => {

  // try {
  //   let pool = await sql.connect(sqlConfig);
  //   let result = await pool.request().query(`INSERT INTO POPLAN (${}, ${})`)
  //   await pool.close();
  //   return { 
  //     result: result
  //   };
  // } catch (error) {
    
  // }

}

export default {
  createPlan
}