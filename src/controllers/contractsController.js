import contractsService from '../service/contractsService.js';

const searchContracts = async (req, res) => {
    let contractList = []
    const contracts = await contractsService.searchContracts(req.body.ccompania);
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
            xplaca: item.xplaca,
            xmarca: item.xmarca,
            xmodelo: item.xmodelo,
            xversion: item.xversion,
            ccompania: item.ccompania,
            xcompania: item.xcompania,
            xestatusgeneral: item.xestatusgeneral[0],
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

const searchPropietary = async (req, res) => {
    const propietary = await contractsService.searchPropietary(req.body);
    if (!propietary) {
        return res.status(200).send({
          status: true,
        });
    }else{
        return res
        .status(200)
        .send({
            status: true,
            data: {
                xnombre: propietary.xnombre,
                xapellido: propietary.xapellido,
                xtelefono: propietary.xtelefonocasa,
                xcorreo: propietary.xemail,
                cestado: propietary.cestado,
                cciudad: propietary.cciudad,
                xdireccion: propietary.xdireccion,
            }
        });
    }
}

const typeServicePlan = async (req, res) => {
    const type = await contractsService.typeServicePlan(req.body);
    if (type.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: type.permissionError
            });
    }
    if (type.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: type.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            data: {
                type: type
            }
        });
}

const createMembership = async (req, res) => {
    const create = await contractsService.createMembership(req.body);
    if (create.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: create.permissionError
            });
    }
    if (create.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: create.error
            });
    }
    const contract = await contractsService.searchContractIndividual();

    return res
        .status(200)
        .send({
            status: true,
            message: 'La Membresía ha sido creada exitosamente!',
            data: {
                ccontratoflota: contract.ccontratoflota,
            }
        });
}

const searchVehicle = async (req, res) => {
    const vehicle = await contractsService.searchVehicle(req.body);
    if (vehicle.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: vehicle.permissionError
            });
    }
    if (vehicle.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: vehicle.error
            });
    }
    if (vehicle[0]) {
        return res.status(200).send({
          status: true,
          message: `Lo sentimos, la placa ingresada ya se encuentra registrada al contrato N° ${vehicle[0].ccontratoflota}`,
        });
    }
    return res
        .status(200)
        .send({
            status: false
        });
}

const detailMembership = async (req, res) => {
    const detail = await contractsService.detailMembership(req.body);
    if (detail.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: detail.permissionError
            });
    }
    if (detail.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: detail.error
            });
    }
    const service = await contractsService.detailMembershipService(detail.cplan);
    return res
        .status(200)
        .send({
            status: true,
            detail: detail,
            service: service
        });
}

export default {
    searchContracts,
    searchPropietary,
    searchVehicle,
    typeServicePlan,
    createMembership,
    detailMembership
}