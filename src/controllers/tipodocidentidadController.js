import Tipodocidentidad from '../db/Tipodocidentidad.js';

const searchTipodocidentidad = async (req, res) => {
  try {
    const tipodocidentidad = await Tipodocidentidad.searchTipodocidentidad();
    if (tipodocidentidad.error) {
      return res.status(tipodocidentidad.code).send({
        status: false,
        message: tipodocidentidad.error
      });
      
    }
    res.status(201).send({
      status: true, 
      message: 'Tipo de Documentos Obtenidos',
      data: tipodocidentidad
    });
  } catch (error){

  }
}

const createTipodocidentidad = async (req, res) => {
  try {
    const createdTipodocidentidad = await Tipodocidentidad.createTipodocidentidad(req.body);
    if (createdTipodocidentidad.error) {
      return res.status(createdTipodocidentidad.code).send({
        status: false,
        message: createdTipodocidentidad.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Tipo de Documento Creado',
      data: createdTipodocidentidad
    });
    
  } catch (error) {
    
  }
}
const searchTipodocidentidad1 = async (req, res) => {
  try {
    const findedTipodocidentidad = await Tipodocidentidad.searchTipodocidentidadById(req.params.id);
    if (findedTipodocidentidad.error) {
      return res.status(findedTipodocidentidad.code).send({
        status: false,
        message: findedTipodocidentidad.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Tipo de Documento Obtenido',
      data: findedTipodocidentidad
    });
    
  } catch (error) {
    
  }
}
const updateTipodocidentidad = async (req, res) => {
  try {
    const updatedTipodocidentidad = await Tipodocidentidad.updateTipodocidentidad(req.params.id, req.body);
    if (updatedTipodocidentidad.error) {
      return res.status(updatedTipodocidentidad.code).send({
        status: false,
        message: updatedTipodocidentidad.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Tipo de Documento Actualizado',
      data: updatedTipodocidentidad
    });
    
  } catch (error) {
    
  }
}

export default {
  createTipodocidentidad,
  searchTipodocidentidad,
  searchTipodocidentidad1,
  updateTipodocidentidad
}