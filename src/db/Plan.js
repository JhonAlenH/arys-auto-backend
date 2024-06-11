// import sql from "mssql";
// import insert from "../utilities/insert.js";

// const sqlConfig = {
//   user: process.env.USER_BD,
//   password: process.env.PASSWORD_BD,
//   server: process.env.SERVER_BD,
//   database: process.env.NAME_BD,
//   requestTimeout: 60000,
//   options: {
//       encrypt: true,
//       trustServerCertificate: true
//   }
// }

// const createPlan = async(data) => {
//   const rData = insert.formatCreateData(data)
//   try {
//     let pool = await sql.connect(sqlConfig);
//     let result = await pool.request().query(`
//     INSERT INTO MAPLANES (${rData.keys}) values (${rData.values});SELECT SCOPE_IDENTITY() AS cplan
//     `)
//     await pool.close();
//     return { 
//       result: result
//     };
//   } catch (error) {
//     console.log(error.message)
//     return { error: error.message };
//   }

// }
// const editPlan = async(id,data) => {
//   const rData = insert.formatEditData(data)
//   try {
//     let pool = await sql.connect(sqlConfig);
//     let result = await pool.request().query(`
//     UPDATE MAPLANES SET ${rData} where cplan = ${id}`)
//     await pool.close();
//     return { 
//       result: result
//     };
//   } catch (error) {
//     console.log(error.message)
//     return { error: error.message };
//   }

// }

// const searchPlanInfo = async (id) => {
//   try {
//     let pool = await sql.connect(sqlConfig);
//     let result = await pool.request().query(`
//     SELECT * FROM MAPLANES WHERE id = ${parseInt(id)};
//     `)
//     await pool.close();
//     const keys = Object.keys(result.recordset[0])
//     const values = Object.values(result.recordset[0])
//     let resultLowerCase = {}
//     let i = 0
//     for (const key of keys) {
//       const lowerKey = key.toLowerCase()
//       resultLowerCase[lowerKey] = values[i]
//       i++
//     }
//     result.recordset[0] = resultLowerCase
//     return { 
//       result: result.recordset[0]
//     };
//   } catch (error) {
//     console.log(error.message)
//     return { error: error.message };
//   }
// }
// const searchPlans = async (ccompania) => {
//   try {
//     let pool = await sql.connect(sqlConfig);
//     let result
//     if(ccompania == 1){
//       result = await pool.request().query(`
//       SELECT id, xplan, cplan, mcosto, cmoneda FROM MAPLANES;
//       `)
//     } else {
//       result = await pool.request().query(`
//       SELECT id, xplan, cplan, mcosto, cmoneda FROM MAPLANES WHERE ccompania = ${ccompania};
//       `)
      
//     }
//     await pool.close();
//     return result.recordset;
//   } catch (error) {
//     console.log(error.message)
//     return { error: error.message };
//   }
// };

// export default {
//   createPlan,
//   searchPlans,
//   searchPlanInfo,
//   editPlan
// }