import Propietarios from '../db/Propietarios.js';

const searchPropietarios = async (req, res) => {
  try {
    const propietarios = await Propietarios.searchPropietarios();
    if (propietarios.error) {
      return res.status(propietarios.code).send({
        status: false,
        message: propietarios.error
      });
      
    }
    res.status(201).send({
      status: true, 
      message: 'Propietarios Obtenidos',
      data: propietarios
    });
  } catch (error){

  }
}

const searchPropietario = async (req, res) => {
    try {
      const findedPropietarios = await Propietarios.searchPropietariosById(req.params.id);
      if (findedPropietarios.error) {
        return res.status(findedPropietarios.code).send({
          status: false,
          message: findedPropietarios.error
        });
      }
      res.status(201).send({
        status: true, 
        message: 'Propietario Obtenido 222',
        data: findedPropietarios
      });
      
    } catch (error) {
      
    }
  }

const updatePropietarios = async (req, res) => {
  try {
    const updatedPropietarios = await Propietarios.updatePropietarios(req.params.id, req.body);
    if (updatedPropietarios.error) {
      return res.status(updatedPropietarios.code).send({
        status: false,
        message: updatedPropietarios.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Propietario Actualizado',
      data: updatedPropietarios
    });
    
  } catch (error) {
    
  }
}

export default {
  searchPropietarios,
  searchPropietario,
  updatePropietarios
}