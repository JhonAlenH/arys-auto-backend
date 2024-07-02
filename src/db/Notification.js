import dayjs from "dayjs";
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

const getAdminNotifications = async () => {
    try {
        
        let pool = await sql.connect(sqlConfig);
        let result = await pool.request()
           .query(`select * FROM SUALERTAS WHERE ctipo_sistema = 2 AND bactivo = 1`)
        if (result.rowsAffected < 1) {
            return false;
        }
        console.log('de pana pa ver');
        
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
        return result.recordset;
    }
    catch (error) {
        console.log(error.message)
        return { error: error.message };
    }
}
const getClubNotifications = async () => {

    try {
        let pool = await sql.connect(sqlConfig);
        let result = await pool.request()
           .query(`select * FROM SUALERTAS WHERE ctipo_sistema = 1 AND bactivo = 1`)
        if (result.rowsAffected < 1) {
            return false;
        }
        
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
        return result.recordset;
    }
    catch (error) {
        console.log(error.message)
        return { error: error.message };
    }
}
const addNotification = async (data) => {
    
    try {
        let pool = await sql.connect(sqlConfig);
        const query = `INSERT INTO SUALERTAS (XMENSAJE, XURL, BACTIVO, CTIPO_SISTEMA, FCREACION, CUSUARIOCREACION, FMODIFICACION, CUSUARIOMODIFICACION) VALUES ('${data.xmensaje}', '${data.xurl}', 1, ${data.ctipo_sistema}, '${data.date}', ${data.cusuario}, '${data.date}', ${data.cusuario}); SELECT SCOPE_IDENTITY() AS calerta`
        
        let result = await pool.request().query(query)
        
        await pool.close();
        return result;
    }
    catch (error) {
        console.log(error.message)
        return { error: error.message };
    }
}
const editNotification = async (id) => {

    try {
        let pool = await sql.connect(sqlConfig);
        let result = await pool.request()
           .query(`UPDATE SUALERTAS SET BACTIVO = 0 WHERE CALERTA = ${id}`)
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
    getAdminNotifications,
    getClubNotifications,
    addNotification,
    editNotification
}