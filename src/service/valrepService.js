import Valrep from '../db/Valrep.js';

const getTrade = async (getTrade) => {
    const trades = await Valrep.getTrade(getTrade);
    if (trades.error) {
        return {
            error: trades.error
        }
    }
    return trades;
}

const getCoin = async (getCoin) => {
    const coins = await Valrep.getCoin(getCoin);
    if (coins.error) {
        return {
            error: coins.error
        }
    }
    return coins;
}

const getClient = async (getClient) => {
    const clients = await Valrep.getClient(getClient);
    if (clients.error) {
        return {
            error: clients.error
        }
    }
    return clients;
}

const getBrokers = async (getBrokers) => {
    const brokers = await Valrep.getBrokers(getBrokers);
    if (brokers.error) {
        return {
            error: brokers.error
        }
    }
    return brokers;
}

const getDepartament = async (getDepartament) => {
    const departaments = await Valrep.getDepartament(getDepartament);
    if (departaments.error) {
        return {
            error: departaments.error
        }
    }
    return departaments;
}

const getRol = async (rolData) => {
    const rols = await Valrep.getRol(rolData);
    if (rols.error) {
        return {
            error: rols.error
        }
    }
    return rols;
}

const getMainMenu = async () => {
    const mainMenu = await Valrep.getMainMenu();
    if (mainMenu.error) {
        return {
            error: mainMenu.error
        }
    }
    return mainMenu;
}

const getMenu = async (getMenu) => {
    const menuResult = await Valrep.getMenu(getMenu);
    if (menuResult.error) {
        return {
            error: menuResult.error
        }
    }
    return menuResult;
}

const getSubMenu = async (getSubMenu) => {
    const subMenuResult = await Valrep.getSubMenu(getSubMenu);
    if (subMenuResult.error) {
        return {
            error: subMenuResult.error
        }
    }
    return subMenuResult;
}

const getUser = async () => {
    const users = await Valrep.getUser();
    if (users.error) {
        return {
            error: users.error
        }
    }
    return users;
}

const getPark = async () => {
    const parks = await Valrep.getPark();
    if (parks.error) {
        return {
            error: parks.error
        }
    }
    return parks;
}

const getState = async (getState) => {
    const state = await Valrep.getState(getState);
    if (state.error) {
        return {
            error: state.error
        }
    }
    return state;
}

const getCity = async (getCity) => {
    const city = await Valrep.getCity(getCity);
    if (city.error) {
        return {
            error: city.error
        }
    }
    return city;
}

const getBrand = async (getBrand) => {
    const brand = await Valrep.getBrand(getBrand);
    if (brand.error) {
        return {
            error: brand.error
        }
    }
    return brand;
}

const getModel = async (getModel) => {
    const model = await Valrep.getModel(getModel);
    if (model.error) {
        return {
            error: model.error
        }
    }
    return model;
}

const getVersion = async (getVersion) => {
    const version = await Valrep.getVersion(getVersion);
    if (version.error) {
        return {
            error: version.error
        }
    }
    return version;
}

const getColor = async (getColor) => {
    const color = await Valrep.getColor(getColor);
    if (color.error) {
        return {
            error: color.error
        }
    }
    return color;
}

const getRates = async (getRates) => {
    const rates = await Valrep.getRates(getRates);
    if (rates.error) {
        return {
            error: rates.error
        }
    }
    return rates;
}

const getTypeVehicle = async (getTypeVehicle) => {
    const type = await Valrep.getTypeVehicle(getTypeVehicle);
    if (type.error) {
        return {
            error: type.error
        }
    }
    return type;
}

const getUtilityRechange = async (getUtilityRechange) => {
    const utilityR = await Valrep.getUtilityRechange(getUtilityRechange);
    if (utilityR.error) {
        return {
            error: utilityR.error
        }
    }
    return utilityR;
}

const getUtility = async (getUtility) => {
    const utility = await Valrep.getUtility(getUtility);
    if (utility.error) {
        return {
            error: utility.error
        }
    }
    return utility;
}

const getClass = async (getClass) => {
    const classV = await Valrep.getClass(getClass);
    if (classV.error) {
        return {
            error: classV.error
        }
    }
    return classV;
}

const getPlan = async (getPlan) => {
    const plan = await Valrep.getPlan(getPlan);
    if (plan.error) {
        return {
            error: plan.error
        }
    }
    return plan;
}

const getAccesories = async () => {
    const accesories = await Valrep.getAccesories();
    if (accesories.error) {
        return {
            error: accesories.error
        }
    }
    return accesories;
}

const getMethodOfPayment = async (getMethodOfPayment) => {
    const payment = await Valrep.getMethodOfPayment(getMethodOfPayment);
    if (payment.error) {
        return {
            error: payment.error
        }
    }
    return payment;
}

const getTakers = async () => {
    const takers = await Valrep.getTakers();
    if (takers.error) {
        return {
            error: takers.error
        }
    }
    return takers;
}

const getTypeOfPayment = async (getTypeOfPayment) => {
    const typePayment = await Valrep.getTypeOfPayment(getTypeOfPayment);
    if (typePayment.error) {
        return {
            error: typePayment.error
        }
    }
    return typePayment;
}

const getBank = async (getBank) => {
    const bank = await Valrep.getBank(getBank);
    if (bank.error) {
        return {
            error: bank.error
        }
    }
    return bank;
}

const getTargetBank = async (getTargetBank) => {
    const targetBank = await Valrep.getTargetBank(getTargetBank);
    if (targetBank.error) {
        return {
            error: targetBank.error
        }
    }
    return targetBank;
}

const getNotificationType = async (getNotificationType) => {
    const notificationtype = await Valrep.getNotificationType(getNotificationType);
    if (notificationtype.error) {
        return {
            error: notificationtype.error
        }
    }
    return notificationtype;
}

const getClaimCause = async (getClaimCause) => {
    const claim = await Valrep.getClaimCause(getClaimCause);
    if (claim.error) {
        return {
            error: claim.error
        }
    }
    return claim;
}

const getTracingType = async (getTracingType) => {
    const claim = await Valrep.getTracingType(getTracingType);
    if (claim.error) {
        return {
            error: claim.error
        }
    }
    return claim;
}

const getTracingMotive = async (getTracingMotive) => {
    const claim = await Valrep.getTracingMotive(getTracingMotive);
    if (claim.error) {
        return {
            error: claim.error
        }
    }
    return claim;
}

const getContractedService = async (ccontratoflota) => {
    const service = await Valrep.getContractedService(ccontratoflota);
    if (service.error) {
        return {
            error: service.error
        }
    }
    return service;
}

const getAdditionalServices = async (getAdditionalServices) => {
    const service = await Valrep.getAdditionalServices(getAdditionalServices);
    if (service.error) {
        return {
            error: service.error
        }
    }
    return service;
}

const getProviderService = async (getProviderService) => {
    const provider = await Valrep.getProviderService(getProviderService);
    if (provider.error) {
        return {
            error: provider.error
        }
    }
    return provider;
}

const getStatus = async (getStatus) => {
    const status = await Valrep.getStatus(getStatus);
    if (status.error) {
        return {
            error: status.error
        }
    }
    return status;
}

const getReplacementEvents = async (getReplacementEvents) => {
    const replacement = await Valrep.getReplacementEvents(getReplacementEvents);
    if (replacement.error) {
        return {
            error: replacement.error
        }
    }
    return replacement;
}

const getProvider = async (getProvider) => {
    const provider = await Valrep.getProvider(getProvider);
    if (provider.error) {
        return {
            error: provider.error
        }
    }
    return provider;
}

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
}