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

export default {
    searchContracts,
    searchPropietary,
    typeServicePlan
}