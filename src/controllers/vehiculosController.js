import Vehiculos from '../db/Vehiculos.js';

const searchVehiculos = async (req, res) => {
  try {
    const vehiculos = await Vehiculos.searchVehiculos();
    if (vehiculos.error) {
      return res.status(vehiculos.code).send({
        status: false,
        message: vehiculos.error
      });
      
    }
    res.status(201).send({
      status: true, 
      message: 'Vehículos Obtenidos',
      data: vehiculos
    });
  } catch (error){

  }
}

const searchVehiculo = async (req, res) => {
  try {
    const findedVehiculos = await Vehiculos.searchVehiculosById(req.params.id);
    if (findedVehiculos.error) {
      return res.status(findedVehiculos.code).send({
        status: false,
        message: findedVehiculos.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Vehículo Obtenido',
      data: findedVehiculos
    });
    
  } catch (error) {
    
  }
}

const updateVehiculos = async (req, res) => {
  try {
    const updatedVehiculos = await Vehiculos.updateVehiculos(req.params.id, req.body);
    if (updatedVehiculos.error) {
      return res.status(updatedVehiculos.code).send({
        status: false,
        message: updatedVehiculos.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Vehículo Actualizado',
      data: updatedVehiculos
    });
    
  } catch (error) {
    
  }
}

export default {
  searchVehiculos,
  searchVehiculo,
  updateVehiculos
}