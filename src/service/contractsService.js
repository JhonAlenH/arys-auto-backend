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

const searchVehicle = async (searchVehicle) => {
    const vehicle = await Contracts.searchVehicle(searchVehicle);
    if (vehicle.error) {
        return {
            error: vehicle.error
        }
    }
    return vehicle;
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

const createMembership = async (createMembership) => {
    const create = await Contracts.createMembership(createMembership);
    if (create.error) {
        return {
            error: create.error
        }
    }
    return create;
}

export default {
    searchContracts,
    searchPropietary,
    searchVehicle,
    typeServicePlan,
    createMembership
}