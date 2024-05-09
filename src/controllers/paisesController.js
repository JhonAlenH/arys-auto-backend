import Paises from '../db/Pais.js';

const searchPaises = async (req, res) => {
  const result = {}
  result.recordset = await Paises.searchPaises(req.body);
  if (result.recordset.permissionError) {
    return res
        .status(403)
        .send({
            status: false,
            message: result.recordset.permissionError
        });
  }
  if (result.recordset.error) {
      return res
          .status(500)
          .send({
              status: false,
              message: result.recordset.error
          });
  }
  console.log(result)
  return res
      .status(200)
      .send({
          status: true,
          data: {
              result
          }
      });    
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