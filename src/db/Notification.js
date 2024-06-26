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

const getNotifications = async () => {

    try {
        let pool = await sql.connect(sqlConfig);
        let result = await pool.request()
           .query(`select * FROM evVseguimientoNotificacion`)
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
export default {
    getNotifications
}