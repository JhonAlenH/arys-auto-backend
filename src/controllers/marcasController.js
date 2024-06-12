import Marcas from '../db/Marcas.js';

const searchMarcas = async (req, res) => {
  try {
    const marcas = await Marcas.searchMarcas();
    if (marcas.error) {
      return res.status(marcas.code).send({
        status: false,
        message: marcas.error
      });
      
    }
    res.status(201).send({
      status: true, 
      message: 'Marcas Obtenidas',
      data: marcas
    });
  } catch (error){

  }
}

const createMarcas = async (req, res) => {
  try {
    const createdMarcas = await Marcas.createMarcas(req.body);
    if (createdMarcas.error) {
      return res.status(createdMarcas.code).send({
        status: false,
        message: createdMarcas.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Marca Creada',
      data: createdMarcas
    });
    
  } catch (error) {
    
  }
}
const searchMarca = async (req, res) => {
  try {
    const findedMarcas = await Marcas.searchMarcasById(req.params.id);
    if (findedMarcas.error) {
      return res.status(findedMarcas.code).send({
        status: false,
        message: findedMarcas.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Marca Obtenida',
      data: findedMarcas
    });
    
  } catch (error) {
    
  }
}
const updateMarcas = async (req, res) => {
  try {
    const updatedMarcas = await Marcas.updateMarcas(req.params.id, req.body);
    if (updatedMarcas.error) {
      return res.status(updatedMarcas.code).send({
        status: false,
        message: updatedMarcas.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Marca Actualizada',
      data: updatedMarcas
    });
    
  } catch (error) {
    
  }
}

export default {
  createMarcas,
  searchMarcas,
  searchMarca,
  updateMarcas
}