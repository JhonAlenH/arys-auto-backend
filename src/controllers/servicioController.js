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
    
    let finalData = []
    const formatData = serviceTypes.result.recordset.map(item => {
      return{
        text: item.xtiposervicio,
        value: `${item.ctiposervicio}`
      }
    })
    if(serviceTypes.result.recordset.length > 0) {
      finalData = formatData
    } else {
      res.status(201).send({
        status: true, 
        message: 'No hay servicios disponibles para esta empresa',
        notFinded: true,
        data: {}
      });
      return
    }

    const servicesByType = await Servicio.getServicesByType(formatData, ccompania)
    if (servicesByType.error) {
      return res.status(servicesByType.code).send({
        status: false,
        message: servicesByType.error
      });
    }
    const formatData2 = servicesByType.result.recordset.map(item => {
      return{
        text: item.xservicio,
        value: `${item.cservicio}`,
        key: `${item.ctiposervicio}`
      }
    })
    finalData = formatData.map(item => {
      const services = formatData2.filter(service => service.key == item.value)
      item.values = services
      return item
    })
    res.status(201).send({
      status: true, 
      message: 'Servicios Obtenidos',
      data: [...finalData]
    });
    
  } catch (error) {
    
  }
}
const getServicesByType = async(req, res) => {
  const ccompania = req.params.id
  try {
    const serviceTypes = await Servicio.getServicesAndTypes(ccompania);
    if (serviceTypes.error) {
      return res.status(serviceTypes.code).send({
        status: false,
        message: serviceTypes.error
      });
    }
    
    let finalData = []
    serviceTypes.map(item => {
      if(finalData.length > 0) {
        const findedTypeIndex = finalData.findIndex(itemData => itemData.value == item.ctiposervicio)
        if(findedTypeIndex != -1) {
          finalData[findedTypeIndex].values.push({text: item.xservicio.toUpperCase(), value: item.cservicio, key: item.ctiposervicio})
        } else {
          finalData.push({text: item.xtiposervicio, value: item.ctiposervicio, values: [{text: item.xservicio.toUpperCase(),value: item.cservicio, key: item.ctiposervicio}]})
        }
      } else {
        
        finalData.push({text: item.xtiposervicio, value: item.ctiposervicio, values: [{text: item.xservicio.toUpperCase(), value: item.cservicio, key: item.ctiposervicio}]})
      }
    })

    res.status(201).send({
      status: true, 
      message: 'Servicios Obtenidos',
      data: [...finalData]
    });
    
  } catch (error) {
    
  }
}

export default {
  getTypeServices,
  getServicesByType
}