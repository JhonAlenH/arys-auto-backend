import { Sequelize, DataTypes, Op } from 'sequelize';
import sequelize from '../config/database.js';

const Trade = sequelize.define('maramos', {});
const Coin = sequelize.define('mamonedas', {});
const Pais = sequelize.define('mapais', {}, { tableName: 'mapais' });
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
const Plan = sequelize.define('MAPLANES', {});
const Accesories = sequelize.define('MAACCESORIOS', {});
const Payment = sequelize.define('MAMETODOLOGIAPAGO', {}, { tableName: 'MAMETODOLOGIAPAGO' });
const Takers = sequelize.define('MATOMADORES', {});
const TypeOfPayment = sequelize.define('MATIPOPAGO', {}, { tableName: 'MATIPOPAGO' });
const Bank = sequelize.define('MABANCO', {}, { tableName: 'MABANCO' });
const TargetBank = sequelize.define('MABANCO_DESTINO', {}, { tableName: 'MABANCO_DESTINO' });
const NotificationType = sequelize.define('MATIPONOTIFICACION', {}, { tableName: 'MATIPONOTIFICACION' });
const ClaimCause = sequelize.define('MACAUSASINIESTRO', {}, { tableName: 'MACAUSASINIESTRO' });
const TracingType = sequelize.define('MATIPOSEGUIMIENTO', {}, { tableName: 'MATIPOSEGUIMIENTO' });
const TracingMotive = sequelize.define('MAMOTIVOSEGUIMIENTO', {}, { tableName: 'MAMOTIVOSEGUIMIENTO' });
const Service = sequelize.define('suVserviciosContratados', {});
const AdditionalService = sequelize.define('maservicio', {}, { tableName: 'maservicio' });
const ProviderService = sequelize.define('prVproveedoresServicios', {});
const Status = sequelize.define('MAESTATUSGENERAL', {}, { tableName: 'MAESTATUSGENERAL' });
const ReplacementEvents = sequelize.define('evVrepuestos', {});
const Provider = sequelize.define('prVproveedoresServicios', {});


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
    const items = await Trade.findAll({
      where: {ccompania: getTrade.ccompania},
      attributes: ['cramo', 'xdescripcion_l'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

const getCoin = async (getCoin) => {
  console.log('epa')
  try {
    const items = await Coin.findAll({
      attributes: ['cmoneda', 'xdescripcion', 'xmoneda'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

const getClient = async (getClient) => {
  try {
    const items = await Client.findAll({
      where: {ccompania: getClient.ccompania},
      attributes: ['cci_rif', 'xnombre', 'xapellido'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

const getBrokers = async (getBrokers) => {
  try {
    const items = await Broker.findAll({
      where: {ccompania: getBrokers.ccompania},
      attributes: ['cproductor', 'xintermediario'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

const getDepartament = async (getDepartament) => {
  try {
    const items = await Departament.findAll({
      where: {ccompania: getDepartament.ccompania},
      attributes: ['cdepartamento', 'xdepartamento'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

const getRol = async (rolData) => {
  try {
    const items = await Rol.findAll({
      where: rolData,
      attributes: ['crol', 'xrol'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

const getMainMenu = async () => {
  try {
    const items = await MainMenu.findAll({
      attributes: ['cmenu_principal', 'xmenu'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

const getMenu = async (getMenu) => {
  try {
    const items = await Menu.findAll({
      where: getMenu,
      attributes: ['cmenu', 'xmenu'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

const getSubMenu = async (getSubMenu) => {
  try {
    const items = await SubMenu.findAll({
      where: getSubMenu,
      attributes: ['csubmenu', 'xsubmenu'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

const getUser = async () => {
  try {
    const items = await Users.findAll({
      attributes: ['cusuario', 'xusuario'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

const getPark = async () => {
  try {
    const items = await Park.findAll({
      attributes: ['plan_adquirido', 'xcompania'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

const getState = async (getState) => {
  console.log(getState)
  try {
    const items = await State.findAll({
      where: getState,
      attributes: ['cestado', 'xdescripcion_l'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

const getCity = async (getCity) => {
  try {
    const items = await City.findAll({
      where: getCity,
      attributes: ['cciudad', 'xdescripcion_l'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    console.log(error.message)
    return { error: error.message };
  }
};

const getBrand = async (getBrand) => {
  try {
    const items = await Brand.findAll({
      where: getBrand,
      attributes: [[sequelize.fn('DISTINCT', sequelize.col('xmarca')), 'xmarca']]
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

const getModel = async (getModel) => {
  try {
    const items = await Model.findAll({
      where: getModel,
      attributes: [[sequelize.fn('DISTINCT', sequelize.col('xmodelo')), 'xmodelo']]
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

const getVersion = async (getVersion) => {
  try {
    const items = await Version.findAll({
      where: getVersion,
      attributes: ['xversion', 'npasajero', 'xclasificacion', 'id', 'msum', 'ctarifa_exceso', 'xuso', 'npesovacio', 'ncapcarga'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

const getColor = async (getColor) => {
  try {
    const items = await Color.findAll({
      where: {cpais: getColor.cpais},
      attributes: ['ccolor', 'xcolor'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

const getRates = async (getRates) => {
  try {
    const items = await Rates.findAll({
      where: {ccompania: getRates.ccompania},
      attributes: ['ctarifa_exceso', 'xgrupo'],
    });
    const result = items.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

const getTypeVehicle = async (getTypeVehicle) => {
  try {
    const tipo = await TypeVehicle.findAll({
      attributes: ['cclase', 'xclase'],
    });
    const result = tipo.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

const getUtilityRechange = async (getUtilityRechange) => {
  try {
    const uso = await UtilityRecharge.findAll({
      attributes: ['cclase', 'xclase'],
    });
    const result = uso.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

const getUtility = async (getUtility) => {
  try {
    const uso = await Utility.findAll({
      attributes: ['cclase', 'xclase'],
    });
    const result = uso.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

const getClass = async (getClass) => {
  try {
    const clase = await Class.findAll({
      attributes: ['cclase', 'xclase'],
    });
    const result = clase.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

const getPlan = async (getPlan) => {
  try {
    const planes = await Plan.findAll({
      where: {ccompania: getPlan.ccompania},
      attributes: ['cplan', 'xplan', 'mcosto'],
    });
    const result = planes.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

const getAccesories = async () => {
  try {
    const accesorios = await Accesories.findAll({
      attributes: ['caccesorio', 'xaccesorio', 'mmontomax', 'ptasa'],
    });
    const result = accesorios.map((item) => item.get({ plain: true }));
    return result;
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
    const result = metodologia.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

const getTakers = async () => {
  try {
    const tomador = await Takers.findAll({
      attributes: ['ctomador', 'xtomador'],
    });
    const result = tomador.map((item) => item.get({ plain: true }));
    return result;
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
    const result = TipoPago.map((item) => item.get({ plain: true }));
    return result;
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
    const result = banco.map((item) => item.get({ plain: true }));
    return result;
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
    const result = destino.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

const getNotificationType = async (getNotificationType) => {
  try {
    const items = await NotificationType.findAll({
      where: {
        cpais: getNotificationType.cpais,
        ccompania: getNotificationType.ccompania
      },
      attributes: ['ctiponotificacion', 'xtiponotificacion'],
    });
    const notificationtype = items.map((item) => item.get({ plain: true }));
    return notificationtype;
  } catch (error) {
    return { error: error.message };
  }
};

const getClaimCause = async (getClaimCause) => {
  try {
    const items = await ClaimCause.findAll({
      where: {
        cpais: getClaimCause.cpais,
        ccompania: getClaimCause.ccompania
      },
      attributes: ['ccausasiniestro', 'xcausasiniestro'],
    });
    const claim = items.map((item) => item.get({ plain: true }));
    return claim;
  } catch (error) {
    return { error: error.message };
  }
};

const getTracingType = async (getTracingType) => {
  try {
    const resultado = await TracingType.findAll({
      where: {
        cpais: getTracingType.cpais,
        ccompania: getTracingType.ccompania
      },
      attributes: ['ctiposeguimiento', 'xtiposeguimiento'],
    });
    const result = resultado.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

const getTracingMotive = async (getTracingMotive) => {
  try {
    const resultado = await TracingMotive.findAll({
      where: {
        cpais: getTracingMotive.cpais,
        ccompania: getTracingMotive.ccompania
      },
      attributes: ['cmotivoseguimiento', 'xmotivoseguimiento'],
    });
    const result = resultado.map((item) => item.get({ plain: true }));
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

const getContractedService = async (ccontratoflota) => {
  try {
    const serv = await Service.findAll({
      where: {
        ccontratoflota: ccontratoflota,
        ncantidad: { [Op.gt]: 0 }
      },
      attributes: ['cservicio', 'xservicio', 'itiporeporte'],
    });
    const service = serv.map((item) => item.get({ plain: true }));
    return service;
  } catch (error) {
    return { error: error.message };
  }
};

const getAdditionalServices = async (getAdditionalServices) => {
  try {
    // Obtener los IDs de cservicio de getAdditionalServices
    const cservicioIds = getAdditionalServices.cservicio.map(item => item.id);

    // Buscar servicios adicionales donde cservicio no esté en la lista de IDs
    const serv = await AdditionalService.findAll({
      where: { 
        cservicio: { [Op.notIn]: cservicioIds }, // Utilizar Op.notIn para excluir los IDs
        cpais: getAdditionalServices.cpais,  
      },
      attributes: ['cservicio', 'xservicio', 'itiporeporte'],
    }); 

    // Mapear los servicios adicionales a objetos planos
    const serviceList = serv.map(item => item.get({ plain: true }));

    return serviceList;
  } catch (error) {
    console.log(error.message);
    return { error: error.message };
  }
};

const getProviderService = async (getProviderService) => {
  try {
    const proveedores = await ProviderService.findAll({
      where: {
        cservicio: getProviderService.cservicio,
        cpais: getProviderService.cpais,
        ccompania: getProviderService.ccompania,
      },
      attributes: ['cproveedor', 'xnombre'],
    });
    const provider = proveedores.map((item) => item.get({ plain: true }));
    return provider;
  } catch (error) {
    return { error: error.message };
  }
};

const getStatus = async (getStatus) => {
  try {
    const proveedores = await Status.findAll({
      where: {
        cpais: getStatus.cpais,
        ccompania: getStatus.ccompania,
      },
      attributes: ['cestatusgeneral', 'xestatusgeneral'],
    });
    const provider = proveedores.map((item) => item.get({ plain: true }));
    return provider;
  } catch (error) {
    return { error: error.message };
  }
};

const getReplacementEvents = async (getReplacementEvents) => {
  try {
    const repuestos = await ReplacementEvents.findAll({
      where: {
        cnotificacion: getReplacementEvents.cnotificacion,
      },
      attributes: ['crepuesto', 'xrepuesto'],
    });
    const replacement = repuestos.map((item) => item.get({ plain: true }));
    return replacement;
  } catch (error) {
    return { error: error.message };
  }
};

const getProvider = async (getProvider) => {
  try {
    const proveedores = await Provider.findAll({
      where: {
        cpais: getProvider.cpais,
        ccompania: getProvider.ccompania,
        cservicio: getProvider.cservicio
      },
      attributes: ['cproveedor', 'xnombre'],
    });
    const provider = proveedores.map((item) => item.get({ plain: true }));
    return provider;
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
  getTargetBank,
  getNotificationType,
  getClaimCause,
  getTracingType,
  getTracingMotive,
  getContractedService,
  getAdditionalServices,
  getProviderService,
  getStatus,
  getReplacementEvents,
  getProvider
};