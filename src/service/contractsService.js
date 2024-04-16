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

export default {
    searchContracts,
}