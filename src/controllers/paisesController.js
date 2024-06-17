import Paises from '../db/Pais.js';

const searchPaises = async (req, res) => {
  try {
    const paises = await Paises.searchPaises();
    if (paises.error) {
      return res.status(paises.code).send({
        status: false,
        message: paises.error
      });
      
    }
    res.status(201).send({
      status: true, 
      message: 'Paises Obtenidos',
      data: paises
    });
  } catch (error){

  }
}

const createPais = async (req, res) => {
  try {
    const createdPaises = await Paises.createPais(req.body);
    if (createdPaises.error) {
      return res.status(createdPaises.code).send({
        status: false,
        message: createdPaises.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Pais Creado',
      data: createdPaises
    });
    
  } catch (error) {
    
  }
}
const searchPais = async (req, res) => {
  try {
    const findedPais = await Paises.searchPaisById(req.params.id);
    if (findedPais.error) {
      return res.status(findedPais.code).send({
        status: false,
        message: findedPais.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Pais Obtenido',
      data: findedPais
    });
    
  } catch (error) {
    
  }
}
const updatePais = async (req, res) => {
  try {
    const updatedPais = await Paises.updatePais(req.params.id, req.body);
    if (updatedPais.error) {
      return res.status(updatedPais.code).send({
        status: false,
        message: updatedPais.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Pais Actualizado',
      data: updatedPais
    });
    
  } catch (error) {
    
  }
}

export default {
  createPais,
  searchPaises,
  searchPais,
  updatePais
}