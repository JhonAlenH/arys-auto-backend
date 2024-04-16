import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Search = sequelize.define('estemporalestohayqueborrarlo', {}, { tableName: 'estemporalestohayqueborrarlo' });

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

export default {
    searchContracts,
}