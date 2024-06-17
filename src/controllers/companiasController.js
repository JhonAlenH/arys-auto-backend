import Companias from '../db/Companias.js';

const searchCompanias = async (req, res) => {
  try {
    const companias = await Companias.searchCompanias();
    if (companias.error) {
      return res.status(companias.code).send({
        status: false,
        message: companias.error
      });
      
    }
    res.status(201).send({
      status: true, 
      message: 'Compañías Obtenidas',
      data: companias
    });
  } catch (error){

  }
}

const searchCompania = async (req, res) => {
    try {
      const findedCompanias = await Companias.searchCompaniasById(req.params.id);
      if (findedCompanias.error) {
        return res.status(findedCompanias.code).send({
          status: false,
          message: findedCompanias.error
        });
      }
      res.status(201).send({
        status: true, 
        message: 'Campañía Obtenida',
        data: findedCompanias
      });
      
    } catch (error) {
      
    }
  }

const createCompanias = async (req, res) => {
  try {
    const createdCompanias = await Companias.createCompanias(req.body);
    if (createdCompanias.error) {
      return res.status(createdCompanias.code).send({
        status: false,
        message: createdCompanias.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Compañía Creada',
      data: createdCompanias
    });
    
  } catch (error) {
    
  }
}

const updateCompanias = async (req, res) => {
  try {
    const updatedCompanias = await Companias.updateCompanias(req.params.id, req.body);
    if (updatedCompanias.error) {
      return res.status(updatedCompanias.code).send({
        status: false,
        message: updatedCompanias.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Compañía Actualizada',
      data: updatedCompanias
    });
    
  } catch (error) {
    
  }
}

export default {
  createCompanias,
  searchCompanias,
  searchCompania,
  updateCompanias
}