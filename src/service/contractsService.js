import Contracts from '../db/Contracts.js';

const searchContracts = async (filters, id) => {
    const contracts = await Contracts.searchContracts(filters, id);
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

const searchContractIndividual = async () => {
    const contract = await Contracts.searchContractIndividual();
    if (contract.error) {
        return {
            error: contract.error
        }
    }
    return contract;
}

const detailMembership = async (detailMembership) => {
    const detail = await Contracts.detailMembership(detailMembership);
    if(detail){

        if (detail.error) {
            return {
                error: detail.error
            }
        }
        return detail;
    }
}

const detailMembershipService = async (detailMembershipService) => {
    const service = await Contracts.detailMembershipService(detailMembershipService);
    if (service.error) {
        return {
            error: service.error
        }
    }
    return service;
}

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