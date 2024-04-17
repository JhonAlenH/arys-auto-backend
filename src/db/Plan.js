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

const createPlan = async(data) => {
  var keys = Object.keys(data)
  var valuesAndTypes = Object.values(data)
  var values = []
  var i = 0

  for (const value of valuesAndTypes) {
    const valueSplited = value.split('[]')
    const type = valueSplited[1].split('=')[1]
    if(type == 'extern') {
      keys.splice(i, 1)
      i--
    } else if(valueSplited[0] == '') {
      values.push('null')
    }else if(type == 'text'){
      values.push(`'${valueSplited[0]}'`)
    } else if(type == 'number' || type == 'boolean') {
      values.push(valueSplited[0])
    }
    i++
  }

  keys = keys.join(',')
  values = values.join(',')
  console.log(keys)
  console.log(values)

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    INSERT INTO POPLAN (${keys}) values (${values});
    `)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }

}

const searchPlans = async (ccompania) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`
    SELECT xplan, cplan, mcosto FROM POPLAN WHERE ccompania = ${ccompania};
    `)
    await pool.close();
    return { 
      result: result
    };
  } catch (error) {
    return { error: error.message };
  }
};

export default {
  createPlan,
  searchPlans
}