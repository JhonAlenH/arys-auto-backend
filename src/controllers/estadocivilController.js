import Estadocivil from '../db/Estadocivil.js';

const searchEstadocivil = async (req, res) => {
  try {
    const estadocivil = await Estadocivil.searchEstadocivil();
    if (estadocivil.error) {
      return res.status(estadocivil.code).send({
        status: false,
        message: estadocivil.error
      });
      
    }
    res.status(201).send({
      status: true, 
      message: 'Estado Civil Obtenidos',
      data: estadocivil
    });
  } catch (error){

  }
}

const createEstadocivil = async (req, res) => {
    try {
      const createdEstadocivil = await Estadocivil.createEstadocivil(req.body);
      if (createdEstadocivil.error) {
        return res.status(createdEstadocivil.code).send({
          status: false,
          message: createdEstadocivil.error
        });
      }
      res.status(201).send({
        status: true, 
        message: 'Estado Civil Creado',
        data: createdEstadocivil
      });
      
    } catch (error) {
      
    }
  }

const searchEstadocivil1 = async (req, res) => {
  try {
    const findedEstadocivil = await Estadocivil.searchEstadocivilById(req.params.id);
    if (findedEstadocivil.error) {
      return res.status(findedEstadocivil.code).send({
        status: false,
        message: findedEstadocivil.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Estado Civil Obtenido',
      data: findedEstadocivil
    });
    
  } catch (error) {
    
  }
}

const updateEstadocivil = async (req, res) => {
  try {
    const updatedEstadocivil = await Estadocivil.updateEstadocivil(req.params.id, req.body);
    if (updatedEstadocivil.error) {
      return res.status(updatedEstadocivil.code).send({
        status: false,
        message: updatedEstadocivil.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Estado Civil Actualizado',
      data: updatedEstadocivil
    });
    
  } catch (error) {
    
  }
}

export default {
  createEstadocivil,
  searchEstadocivil,
  searchEstadocivil1,
  updateEstadocivil
}