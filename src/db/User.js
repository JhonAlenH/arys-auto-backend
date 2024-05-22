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

const verifyIfUsernameExists = async (xlogin) => {
    try {
        let pool = await sql.connect(sqlConfig);
        let result = await pool.request()
            .input('xemail', sql.NVarChar, xlogin)
            .query('select CUSUARIO, XEMAIL, XNOMBRE from SEUSUARIO where xemail = @xemail')
            await pool.close();
        return { 
            result: result 
        };
    }
    catch (error) {
        console.log(error.message)
        return { error: error.message }
    }
}

const verifyIfPasswordMatchs = async (xlogin, xcontrasena) => {
    try {
        let pool = await sql.connect(sqlConfig);
        let result = await pool.request()
            .input('xemail', sql.NVarChar, xlogin)
            .input('xcontrasena', sql.NVarChar, xcontrasena)
            .query('select CUSUARIO from SEUSUARIO where xemail = @xemail and xcontrasena = @xcontrasena')
            await pool.close();
        return { result: result };
    }
    catch (error) {
        console.log(error.message)
        return { error: error.message };
    }
}

const getOneUser = async (xlogin) => {
    try {
        let pool = await sql.connect(sqlConfig);
        let result = await pool.request()
           .input('xemail', sql.NVarChar, xlogin)
           .query('select * from SEUSUARIO where xemail = @xemail')
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

const getOneUserById = async (id) => {
    try {
        let pool = await sql.connect(sqlConfig);
        let result = await pool.request()
           .input('id', sql.NVarChar, id)
           .query('select cusuario, xnombre, xapellido, xemail, cpropietario, xtelefono, ctipo_sistema, ccompania, ximagen1, ximagen2 from SEUSUARIO where cusuario = @id')
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

const getOwnerInfo = async (id) => {

    try {
        let pool = await sql.connect(sqlConfig);
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

const getUserSubscription = async (cpropietario) => {

    try {
        let pool = await sql.connect(sqlConfig);
        let result = await pool.request()
           .query(`select * FROM suVcontratos WHERE cpropietario = ${cpropietario}`)
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
        return result;
    }
    catch (error) {
        console.log(error.message)
        return { error: error.message };
    }
}

export default {
    verifyIfUsernameExists,
    verifyIfPasswordMatchs,
    getOneUser,
    getOneUserById,
    getOwnerInfo,
    getUserSubscription
}