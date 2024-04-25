import Servicio from '../db/Servicio.js';

const getTypeServices = async (req, res) => {
  const ccompania = req.params.id
  try {
    const serviceTypes = await Servicio.getTypeServices(ccompania);
    if (serviceTypes.error) {
      return res.status(serviceTypes.code).send({
        status: false,
        message: serviceTypes.error
      });
    }
    
    let formatData = []
    if(serviceTypes.result.recordset.length > 0) {
      formatData = serviceTypes.result.recordset.map(item => {
        return{
          text: item.xtiposervicio,
          value: `${item.ctiposervicio}`
        }
      })
    } else {
      res.status(201).send({
        status: true, 
        message: 'No hay servicios disponibles para esta empresa',
        notFinded: true,
        data: {}
      });
    }

    const servicesByType = await Servicio.getServicesByType(formatData)
    if (servicesByType.error) {
      return res.status(servicesByType.code).send({
        status: false,
        message: servicesByType.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Servicios Obtenidos',
      data: [...formatData]
    });
    
  } catch (error) {
    
  }
}

export default {
  getTypeServices,
}