import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Search = sequelize.define('estemporalestohayqueborrarlo', {}, { tableName: 'estemporalestohayqueborrarlo' });
const TypeService = sequelize.define('maVtiposerpl', {}, { tableName: 'maVtiposerpl' });
const Propietary = sequelize.define('suVpropietario', {  
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

export default {
    searchContracts,
    searchPropietary,
    typeServicePlan
}