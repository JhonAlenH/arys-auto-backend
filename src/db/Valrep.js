import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Trade = sequelize.define('maramos', {});
const Coin = sequelize.define('mamonedas', {});
const Client = sequelize.define('maclient', {}, { tableName: 'maclient' });
const Broker = sequelize.define('MACORREDORES_WEB', {}, { tableName: 'MACORREDORES_WEB' });
const Departament = sequelize.define('sedepartamento', {}, { tableName: 'sedepartamento' });
const Users = sequelize.define('seusuariosweb', {}, { tableName: 'seusuariosweb' });
const MainMenu = sequelize.define('semenuprincipal', {}, { tableName: 'semenuprincipal' });
const Park = sequelize.define('np_parques', {});
const Color = sequelize.define('MACOLOR', {}, { tableName: 'MACOLOR' });
const Rates = sequelize.define('PRTARIFA_EXCESO', {}, { tableName: 'PRTARIFA_EXCESO' });
const TypeVehicle = sequelize.define('MACLASES', {}, { tableName: 'MACLASES' });
const UtilityRecharge = sequelize.define('MACLASES', {}, { tableName: 'MACLASES' });
const Utility = sequelize.define('MACLASES', {}, { tableName: 'MACLASES' });
const Class = sequelize.define('MACLASES', {}, { tableName: 'MACLASES' });
const Plan = sequelize.define('POPLAN', {}, { tableName: 'POPLAN' });
const Accesories = sequelize.define('MAACCESORIOS', {});
const Payment = sequelize.define('MAMETODOLOGIAPAGO', {}, { tableName: 'MAMETODOLOGIAPAGO' });
const Takers = sequelize.define('MATOMADORES', {});
const TypeOfPayment = sequelize.define('MATIPOPAGO', {}, { tableName: 'MATIPOPAGO' });
const Bank = sequelize.define('MABANCO', {}, { tableName: 'MABANCO' });
const TargetBank = sequelize.define('MABANCO_DESTINO', {}, { tableName: 'MABANCO_DESTINO' });

const Rol = sequelize.define('serol', {
  crol: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  cdepartamento: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  xrol: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, { tableName: 'serol' });
const Menu = sequelize.define('semenu', {
  cmenu: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  cmenu_principal: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  xmenu: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, { tableName: 'semenu' });
const SubMenu = sequelize.define('sesubmenu', {
  csubmenu: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  cmenu_principal: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  cmenu: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  xsubmenu: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, { tableName: 'sesubmenu' });
const State = sequelize.define('maestados', {
  cestado: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  cpais: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  xdescripcion_l: {
    type: Sequelize.STRING,
    allowNull: false,
  },
},);
const City = sequelize.define('maciudades', {
  cciudad: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  cpais: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  cestado: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  xdescripcion_l: {
    type: Sequelize.STRING,
    allowNull: false,
  },
},);

const Brand = sequelize.define('mainma', {  
  qano: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  xmarca: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, { tableName: 'mainma' });

const Model = sequelize.define('mainma', {
  qano: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  xmarca: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  xmodelo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, { tableName: 'mainma' });

const Version = sequelize.define('mainma', {
  qano: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  xmarca: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  xmodelo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  xversion: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  npasajero: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, { tableName: 'mainma' });



const getTrade = async (getTrade) => {
  try {
    const trade = await Trade.findAll({
      where: {ccompania: getTrade.ccompania},
      attributes: ['cramo', 'xdescripcion_l'],
    });
    const trades = trade.map((item) => item.get({ plain: true }));
    return trades;
  } catch (error) {
    return { error: error.message };
  }
};

const getCoin = async (getCoin) => {
  try {
    const coin = await Coin.findAll({
      where: {ccompania: getCoin.ccompania},
      attributes: ['cmoneda', 'xdescripcion_l'],
    });
    const coins = coin.map((item) => item.get({ plain: true }));
    return coins;
  } catch (error) {
    return { error: error.message };
  }
};

const getClient = async (getClient) => {
  try {
    const client = await Client.findAll({
      where: {ccompania: getClient.ccompania},
      attributes: ['cci_rif', 'xnombre', 'xapellido'],
    });
    const clients = client.map((item) => item.get({ plain: true }));
    return clients;
  } catch (error) {
    return { error: error.message };
  }
};

const getBrokers = async (getBrokers) => {
  try {
    const broker = await Broker.findAll({
      where: {ccompania: getBrokers.ccompania},
      attributes: ['cproductor', 'xintermediario'],
    });
    const brokers = broker.map((item) => item.get({ plain: true }));
    return brokers;
  } catch (error) {
    return { error: error.message };
  }
};

const getDepartament = async (getDepartament) => {
  try {
    const departament = await Departament.findAll({
      where: {ccompania: getDepartament.ccompania},
      attributes: ['cdepartamento', 'xdepartamento'],
    });
    const departaments = departament.map((item) => item.get({ plain: true }));
    return departaments;
  } catch (error) {
    return { error: error.message };
  }
};

const getRol = async (rolData) => {
  try {
    const rol = await Rol.findAll({
      where: rolData,
      attributes: ['crol', 'xrol'],
    });
    const rols = rol.map((item) => item.get({ plain: true }));
    return rols;
  } catch (error) {
    return { error: error.message };
  }
};

const getMainMenu = async () => {
  try {
    const menu = await MainMenu.findAll({
      attributes: ['cmenu_principal', 'xmenu'],
    });
    const mainMenu = menu.map((item) => item.get({ plain: true }));
    return mainMenu;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

const getMenu = async (getMenu) => {
  try {
    const menu = await Menu.findAll({
      where: getMenu,
      attributes: ['cmenu', 'xmenu'],
    });
    const menuResult = menu.map((item) => item.get({ plain: true }));
    return menuResult;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

const getSubMenu = async (getSubMenu) => {
  try {
    const submenu = await SubMenu.findAll({
      where: getSubMenu,
      attributes: ['csubmenu', 'xsubmenu'],
    });
    const subMenuResult = submenu.map((item) => item.get({ plain: true }));
    return subMenuResult;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

const getUser = async () => {
  try {
    const user = await Users.findAll({
      attributes: ['cusuario', 'xusuario'],
    });
    const users = user.map((item) => item.get({ plain: true }));
    return users;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

const getPark = async () => {
  try {
    const park = await Park.findAll({
      attributes: ['plan_adquirido', 'xcompania'],
    });
    const parks = park.map((item) => item.get({ plain: true }));
    return parks;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

const getState = async (getState) => {
  console.log(getState)
  try {
    const estado = await State.findAll({
      where: getState,
      attributes: ['cestado', 'xdescripcion_l'],
    });
    const state = estado.map((item) => item.get({ plain: true }));
    return state;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

const getCity = async (getCity) => {
  try {
    const ciudad = await City.findAll({
      where: getCity,
      attributes: ['cciudad', 'xdescripcion_l'],
    });
    const city = ciudad.map((item) => item.get({ plain: true }));
    return city;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

const getBrand = async (getBrand) => {
  try {
    const marca = await Brand.findAll({
      where: getBrand,
      attributes: [[sequelize.fn('DISTINCT', sequelize.col('xmarca')), 'xmarca']]
    });
    const brand = marca.map((item) => item.get({ plain: true }));
    return brand;
  } catch (error) {
    return { error: error.message };
  }
};

const getModel = async (getModel) => {
  try {
    const modelo = await Model.findAll({
      where: getModel,
      attributes: [[sequelize.fn('DISTINCT', sequelize.col('xmodelo')), 'xmodelo']]
    });
    const model = modelo.map((item) => item.get({ plain: true }));
    return model;
  } catch (error) {
    return { error: error.message };
  }
};

const getVersion = async (getVersion) => {
  try {
    const versions = await Version.findAll({
      where: getVersion,
      attributes: ['xversion', 'npasajero', 'xclasificacion', 'id', 'xclase_rcv', 'msum', 'ctarifa_exceso', 'xuso', 'npesovacio', 'ncapcarga'],
    });
    const version = versions.map((item) => item.get({ plain: true }));
    return version;
  } catch (error) {
    return { error: error.message };
  }
};

const getColor = async (getColor) => {
  try {
    const colores = await Color.findAll({
      where: {cpais: getColor.cpais},
      attributes: ['ccolor', 'xcolor'],
    });
    const color = colores.map((item) => item.get({ plain: true }));
    return color;
  } catch (error) {
    return { error: error.message };
  }
};

const getRates = async (getRates) => {
  try {
    const tarifa = await Rates.findAll({
      where: {ccompania: getRates.ccompania},
      attributes: ['ctarifa_exceso', 'xgrupo'],
    });
    const rates = tarifa.map((item) => item.get({ plain: true }));
    return rates;
  } catch (error) {
    return { error: error.message };
  }
};

const getTypeVehicle = async (getTypeVehicle) => {
  try {
    const tipo = await TypeVehicle.findAll({
      attributes: ['cclase', 'xclase'],
    });
    const type = tipo.map((item) => item.get({ plain: true }));
    return type;
  } catch (error) {
    return { error: error.message };
  }
};

const getUtilityRechange = async (getUtilityRechange) => {
  try {
    const uso = await UtilityRecharge.findAll({
      attributes: ['cclase', 'xclase'],
    });
    const utilityR = uso.map((item) => item.get({ plain: true }));
    return utilityR;
  } catch (error) {
    return { error: error.message };
  }
};

const getUtility = async (getUtility) => {
  try {
    const uso = await Utility.findAll({
      attributes: ['cclase', 'xclase'],
    });
    const utility = uso.map((item) => item.get({ plain: true }));
    return utility;
  } catch (error) {
    return { error: error.message };
  }
};

const getClass = async (getClass) => {
  try {
    const clase = await Class.findAll({
      attributes: ['cclase', 'xclase'],
    });
    const classV = clase.map((item) => item.get({ plain: true }));
    return classV;
  } catch (error) {
    return { error: error.message };
  }
};

const getPlan = async (getPlan) => {
  try {
    const planes = await Plan.findAll({
      where: {ccompania: getPlan.ccompania},
      attributes: ['cplan', 'xplan'],
    });
    const plan = planes.map((item) => item.get({ plain: true }));
    console.log(plan)
    return plan;
  } catch (error) {
    return { error: error.message };
  }
};

const getAccesories = async () => {
  try {
    const accesorios = await Accesories.findAll({
      attributes: ['caccesorio', 'xaccesorio', 'mmontomax', 'ptasa'],
    });
    const accesories = accesorios.map((item) => item.get({ plain: true }));
    return accesories;
  } catch (error) {
    return { error: error.message };
  }
};

const getMethodOfPayment = async (getMethodOfPayment) => {
  try {
    const metodologia = await Payment.findAll({
      where: {ccompania: getMethodOfPayment.ccompania},
      attributes: ['cmetodologiapago', 'xmetodologiapago'],
    });
    const payment = metodologia.map((item) => item.get({ plain: true }));
    return payment;
  } catch (error) {
    return { error: error.message };
  }
};

const getTakers = async () => {
  try {
    const tomador = await Takers.findAll({
      attributes: ['ctomador', 'xtomador'],
    });
    const takers = tomador.map((item) => item.get({ plain: true }));
    return takers;
  } catch (error) {
    return { error: error.message };
  }
};
  
const getTypeOfPayment = async (getTypeOfPayment) => {
  try {
    const TipoPago = await TypeOfPayment.findAll({
      where: {ccompania: getTypeOfPayment.ccompania},
      attributes: ['ctipopago', 'xtipopago'],
    });
    const typePayment = TipoPago.map((item) => item.get({ plain: true }));
    return typePayment;
  } catch (error) {
    return { error: error.message };
  }
};

const getBank = async (getBank) => {
  try {
    const banco = await Bank.findAll({
      where: {itipo: getBank.itipo, ccompania: getBank.ccompania},
      attributes: ['cbanco', 'xbanco'],
    });
    const bank = banco.map((item) => item.get({ plain: true }));
    return bank;
  } catch (error) {
    return { error: error.message };
  }
};

const getTargetBank = async (getTargetBank) => {
  try {
    const destino = await TargetBank.findAll({
      where: getTargetBank,
      attributes: ['cbanco_destino', 'xbanco'],
    });
    const targetBank = destino.map((item) => item.get({ plain: true }));
    return targetBank;
  } catch (error) {
    return { error: error.message };
  }
};

export default {
  getTrade,
  getCoin,
  getClient,
  getBrokers,
  getDepartament,
  getRol,
  getMainMenu,
  getMenu,
  getUser,
  getSubMenu,
  getPark,
  getState,
  getCity,
  getBrand,
  getModel,
  getVersion,
  getColor,
  getRates,
  getTypeVehicle,
  getUtilityRechange,
  getUtility,
  getClass,
  getPlan,
  getAccesories,
  getMethodOfPayment,
  getTakers,
  getTypeOfPayment,
  getBank,
  getTargetBank
};