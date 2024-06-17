import Bancos from '../db/Bancos.js';

const searchBancos = async (req, res) => {
  try {
    const bancos = await Bancos.searchBancos();
    if (bancos.error) {
      return res.status(bancos.code).send({
        status: false,
        message: bancos.error
      });
      
    }
    res.status(201).send({
      status: true, 
      message: 'Bancos Obtenidos',
      data: bancos
    });
  } catch (error){

  }
}
const searchBancosMaestros = async (req, res) => {
  try {
    const bancos = await Bancos.searchBancosMaestros(req.params.cpais);
    if (bancos.error) {
      return res.status(bancos.code).send({
        status: false,
        message: bancos.error
      });
      
    }
    const formatData = bancos.map(item => {
      return{
        text: item.xbanco,
        value: `${item.cbanco}`
      }
    })
    res.status(201).send({
      status: true, 
      message: 'Bancos Obtenidos',
      data: formatData
    });
  } catch (error){

  }
}

const createBancos = async (req, res) => {
  try {
    const createdBancos = await Bancos.createBancos(req.body);
    if (createdBancos.error) {
      return res.status(createdBancos.code).send({
        status: false,
        message: createdBancos.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Banco Creado',
      data: createdBancos
    });
    
  } catch (error) {
    
  }
}
const searchBanco = async (req, res) => {
  try {
    const findedBancos = await Bancos.searchBancosById(req.params.id);
    if (findedBancos.error) {
      return res.status(findedBancos.code).send({
        status: false,
        message: findedBancos.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Banco Obtenido',
      data: findedBancos
    });
    
  } catch (error) {
    
  }
}
const updateBancos = async (req, res) => {
  try {
    const updatedBancos = await Bancos.updateBancos(req.params.id, req.body);
    if (updatedBancos.error) {
      return res.status(updatedBancos.code).send({
        status: false,
        message: updatedBancos.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Banco Actualizado',
      data: updatedBancos
    });
    
  } catch (error) {
    
  }
}

export default {
  createBancos,
  searchBancos,
  searchBanco,
  updateBancos,
  searchBancosMaestros,
}