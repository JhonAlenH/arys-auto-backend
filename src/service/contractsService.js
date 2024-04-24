import Contracts from '../db/Contracts.js';

const searchContracts = async () => {
    const contracts = await Contracts.searchContracts();
    if (contracts.error) {
        return {
            error: contracts.error
        }
    }
    return contracts;
}

const searchPropietary = async (searchPropietary) => {
    const propietary = await Contracts.searchPropietary(searchPropietary);
    return propietary;
}

const typeServicePlan = async (typeServicePlan) => {
    const type = await Contracts.typeServicePlan(typeServicePlan);
    if (type.error) {
        return {
            error: type.error
        }
    }
    return type;
}

export default {
    searchContracts,
    searchPropietary,
    typeServicePlan
}