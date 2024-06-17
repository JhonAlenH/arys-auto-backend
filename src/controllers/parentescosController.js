import Parentescos from '../db/Parentescos.js';

const searchParentescos = async (req, res) => {
  try {
    const parentescos = await Parentescos.searchParentescos();
    if (parentescos.error) {
      return res.status(parentescos.code).send({
        status: false,
        message: parentescos.error
      });
      
    }
    res.status(201).send({
      status: true, 
      message: 'Parentescos Obtenidos',
      data: parentescos
    });
  } catch (error){

  }
}

const createParentesco = async (req, res) => {
    try {
      const createdParentesco = await Parentescos.createParentescos(req.body);
      if (createdParentesco.error) {
        return res.status(createdParentesco.code).send({
          status: false,
          message: createdParentesco.error
        });
      }
      res.status(201).send({
        status: true, 
        message: 'Parentesco Creado',
        data: createdParentesco
      });
      
    } catch (error) {
      
    }
  }

const createParentescos = async (req, res) => {
  try {
    const createdParentescos = await Parentescos.createParentescos(req.body);
    if (createdParentescos.error) {
      return res.status(createdParentescos.code).send({
        status: false,
        message: createdParentescos.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Parentesco Creado',
      data: createdParentescos
    });
    
  } catch (error) {
    
  }
}
const searchParentesco = async (req, res) => {
  try {
    const findedParentescos = await Parentescos.searchParentescosById(req.params.id);
    if (findedParentescos.error) {
      return res.status(findedParentescos.code).send({
        status: false,
        message: findedParentescos.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Parentesco Obtenido',
      data: findedParentescos
    });
    
  } catch (error) {
    
  }
}

const updateParentescos = async (req, res) => {
  try {
    const updatedParentescos = await Parentescos.updateParentescos(req.params.id, req.body);
    if (updatedParentescos.error) {
      return res.status(updatedParentescos.code).send({
        status: false,
        message: updatedParentescos.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Parentesco Actualizado',
      data: updatedParentescos
    });
    
  } catch (error) {
    
  }
}

export default {
  createParentescos,
  searchParentescos,
  searchParentesco,
  updateParentescos
}