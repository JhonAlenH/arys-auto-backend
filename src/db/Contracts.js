import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
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

const Search = sequelize.define('suVcontratos', {});
const Contract = sequelize.define('sucontratoflota', {}, { tableName: 'sucontratoflota' });
const Detail = sequelize.define('suVcontratos', {
  ccontratoflota: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: true,
  },
});
const TypeService = sequelize.define('maVtiposerpl', {}, { tableName: 'maVtiposerpl' });
const Propietary = sequelize.define('suVpropietario', {  
  ccontratoflota: {
  type: Sequelize.INTEGER,
  primaryKey: true,
  allowNull: true,
},}, { tableName: 'suVpropietario' });
const Vehicle = sequelize.define('suVpropietario', {  
  ccontratoflota: {
  type: Sequelize.INTEGER,
  primaryKey: true,
  allowNull: true,
},}, { tableName: 'suVpropietario' });


const searchContracts = async () => {
    try {
      const contract = await Search.findAll({
        attributes: ['ccontratoflota', 'xnombre', 'xapellido', 'xplaca', 'xmarca', 'xmodelo', 'xversion'],
      });
      const contracts = contract.map((item) => item.get({ plain: true }));
      return contracts;
    } catch (error) {
      return { error: error.message };
    }
};

const searchPropietary = async (searchPropietary) => {
  try {
    const propietary = await Propietary.findOne({
      where: {
        xcedula: searchPropietary.xrif_cliente
      },
      attributes: ['xnombre', 'xapellido', 'xtelefonocasa', 'xemail', 'cestado', 'cciudad', 'xdireccion'],
    });

    return propietary ? propietary.get({ plain: true }) : null;
  } catch (error) {
    return { error: error.message };
  }
};

const searchVehicle = async (searchVehicle) => {
  try {
    const vehiculo = await Vehicle.findAll({
      where: {
          xplaca: searchVehicle.xplaca,
          cestatusgeneral: {
            [Sequelize.Op.ne]: 3,
          },
        },
      attributes: ['ccontratoflota'],
    });
    const vehicle = vehiculo.map((item) => item.get({ plain: true }));
    return vehicle;
  } catch (error) {
    return { error: error.message };
  }
};

const typeServicePlan = async (typeServicePlan) => {
  try {
    const service = await TypeService.findAll({
      where: {
        cplan: typeServicePlan.cplan
      },
      attributes: ['cplan', 'ctiposervicio', 'xtiposervicio'],
    });
    const type = service.map((item) => item.get({ plain: true }));
    return type;
  } catch (error) {
    return { error: error.message };
  }
};

const createMembership = async (createMembership) => {
  try {
      let xcliente = createMembership.xnombre + ' ' + createMembership.xapellido
      let pool = await sql.connect(sqlConfig);
      let result = await pool.request()
        .input('icedula', sql.NVarChar, createMembership.icedula)
        .input('xcedula', sql.NVarChar, createMembership.xcedula)
        .input('xnombre', sql.NVarChar, createMembership.xnombre)
        .input('xapellido', sql.NVarChar, createMembership.xapellido)
        .input('xcliente', sql.NVarChar, xcliente)
        .input('irif_cliente', sql.NVarChar, createMembership.icedula)
        .input('xrif_cliente', sql.NVarChar, createMembership.xcedula)
        .input('xtelefono1', sql.NVarChar, createMembership.xtelefono_emp)
        .input('email', sql.NVarChar, createMembership.email)
        .input('cestado', sql.Int, createMembership.cestado)
        .input('cciudad', sql.Int, createMembership.cciudad)
        .input('xdireccionfiscal', sql.NVarChar, createMembership.xdireccion)
        .input('xplaca', sql.NVarChar, createMembership.xplaca)
        .input('id_inma', sql.Int, createMembership.id_inma)
        .input('ccolor', sql.Int, createMembership.ccolor)
        .input('xserialcarroceria', sql.NVarChar, createMembership.xserialcarroceria)
        .input('xserialmotor', sql.NVarChar, createMembership.xserialmotor)
        .input('fdesde', sql.DateTime, createMembership.fdesde)
        .input('fhasta', sql.DateTime, createMembership.fhasta)
        .input('cplan', sql.Int, createMembership.cplan)
        .input('cmetodologiapago', sql.Int, createMembership.cmetodologiapago)
        // .input('cuso', sql.Int, createMembership.cuso)
        .input('cpais', sql.Int, createMembership.cpais)
        .input('cestatusgeneral', sql.Int, 13)
        .input('ccompania', sql.Int, createMembership.ccompania)
        .input('cusuario', sql.Int, createMembership.cusuario)
        .query(`
            INSERT INTO TMSUSCRIPCION_SERVICIOS (
                icedula, xcedula, xnombre, xapellido, xcliente, xtelefono1, irif_cliente, email, cestado,
                xrif_cliente, cciudad, xdireccionfiscal, xplaca, id_inma, ccolor, xserialcarroceria,
                xserialmotor, cplan, cmetodologiapago, cpais, fdesde, fhasta
                ccompania, cestatusgeneral, cusuariocreacion
            )
            VALUES (
                @icedula, @xcedula, @xnombre, @xapellido, @xcliente, @xtelefono1, @irif_cliente, @email, @cestado,
                @xrif_cliente, @cciudad, @xdireccionfiscal, @xplaca, @id_inma, @ccolor, @xserialcarroceria,
                @xserialmotor,  @cplan, @cmetodologiapago, @cpais, @fdesde, @fhasta
                @ccompania, @cestatusgeneral, @cusuario
            );
        `);
          await pool.close();
      return { result: result };
  }
  catch (error) {
      console.log(error.message)
      return { error: error.message };
  }
}

const searchContractIndividual = async () => {
  try {
    const maxContract = await Contract.findOne({
      attributes: ['ccontratoflota'],
      order: [['ccontratoflota', 'DESC']],
      limit: 1,
    });

    return maxContract ? maxContract.get({ plain: true }) : null;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

const detailMembership = async (detailMembership) => {
  try {
    const contract = await Detail.findOne({
      where: {
        ccontratoflota: detailMembership.ccontratoflota,
        cpais: detailMembership.cpais,
        ccompania: detailMembership.ccompania,
      },
      attributes: [
        'cpropietario',
        'cvehiculopropietario',
        'xnombre',
        'xapellido',
        'xplaca',
        'xmarca',
        'xmodelo',
        'xversion',
        'ccontratoflota',
        'fano',
        'xcolor',
        'xserialcarroceria',
        'xserialmotor',
        'fdesde',
        'fhasta',
        'xmoneda',
        'cplan',
        'xplan',
      ],
    });

    return contract ? contract.get({ plain: true }) : null;;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

const detailMembershipService = async (detailMembershipService) => {
  console.log(detailMembershipService)
  try {
    const service = await TypeService.findAll({
      where: {
        cplan: detailMembershipService
      },
      attributes: ['cplan', 'ctiposervicio', 'xtiposervicio'],
    });
    const type = service.map((item) => item.get({ plain: true }));
    return type;
  } catch (error) {
    return { error: error.message };
  }
};

export default {
    searchContracts,
    searchPropietary,
    searchVehicle,
    typeServicePlan,
    createMembership,
    searchContractIndividual,
    detailMembership,
    detailMembershipService
}