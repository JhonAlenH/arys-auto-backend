import Metodologiapago from '../db/Metodologiapago.js';

const searchMetodologiapago = async (req, res) => {
  try {
  const paises = await Metodologiapago.searchMetodologiapago();
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

const searchMetodologiapago1 = async (req, res) => {
  try {
    const findedMetodologiapago = await Metodologiapago.searchMetodologiapagoById(req.params.id);
    if (findedMetodologiapago.error) {
      return res.status(findedMetodologiapago.code).send({
        status: false,
        message: findedMetodologiapago.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Metodologia de Pago Obtenido',
      data: findedMetodologiapago
    });
    
  } catch (error) {
    
  }
}

const createMetodologiapago = async (req, res) => {
  try {
    const createdMetodologiapago = await Metodologiapago.createMetodologiapago(req.body);
    if (createdMetodologiapago.error) {
      return res.status(createdMetodologiapago.code).send({
        status: false,
        message: createdMetodologiapago.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Metodología de Pago Creada Satisfactoriamente',
      data: createdPaises
    });
    
  } catch (error) {
    
  }
}

const updateMetodologiapago = async (req, res) => {
  try {
    const updatedMetodologiapago = await Metodologiapago.updateMetodologiapago(req.params.id, req.body);
    if (updatedMetodologiapago.error) {
      return res.status(updatedMetodologiapago.code).send({
        status: false,
        message: updatedMetodologiapago.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Metodologia de pago Actualizada',
      data: updatedMetodologiapago
    });
    
  } catch (error) {
    
  }
}

export default {
  createMetodologiapago,
  searchMetodologiapago,
  searchMetodologiapago1,
  updateMetodologiapago
}