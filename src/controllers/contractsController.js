import contractsService from '../service/contractsService.js';

const searchContracts = async (req, res) => {
    let contractList = []
    const contracts = await contractsService.searchContracts();
    if (contracts.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: contracts.permissionError
            });
    }
    if (contracts.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: contracts.error
            });
    }

    contracts.forEach((item) => {
        contractList.push({
            ccontratoflota: item.ccontratoflota,
            xnombre: item.xnombre + ' ' + item.xapellido,
            xvehiculo: item.xmarca,
            xplaca: item.xplaca
        });
    });

    return res
        .status(200)
        .send({
            status: true,
            data: {
                contracts: contractList
            }
        });
}

export default {
    searchContracts,
}