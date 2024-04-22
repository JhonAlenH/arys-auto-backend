import Maestros from '../db/Maestros.js';

const getMaMonedas = async (req, res) => {
  try {
    const gettedMonedas = await Maestros.getMaMonedas();
    // console.log(gettedMonedas.result.recordset)
    if (gettedMonedas.error) {
      return res.status(gettedMonedas.code).send({
        status: false,
        message: gettedMonedas.error
      });
    }
    const formatData = gettedMonedas.result.recordset.map(item => {
      return{
        text: item.xdescripcion,
        value: `${item.cmoneda}`
      }
    })
    res.status(201).send({
      status: true, 
      message: 'Monedas Obtenidas',
      data: [...formatData]
    });
    
  } catch (error) {
    
  }
}
const getMaCompania = async (req, res) => {
  try {
    const gettedCompanias = await Maestros.getMaCompania();
    // console.log(gettedCompanias.result)
    if (gettedCompanias.error) {
      return res.status(gettedCompanias.code).send({
        status: false,
        message: gettedCompanias.error
      });
    }
    const formatData = gettedCompanias.result.recordset.map(item => {
      return{
        text: item.xcompania,
        value: `${item.ccompania}`
      }
    })
    res.status(201).send({
      status: true, 
      message: 'Compañias Obtenidas',
      data: [...formatData]
    });
    
  } catch (error) {
    
  }
}
const getMaPais = async (req, res) => {
  try {
    const gettedPaises = await Maestros.getMaPais();
    // console.log(gettedPaises.result)
    if (gettedPaises.error) {
      return res.status(gettedPaises.code).send({
        status: false,
        message: gettedPaises.error
      });
    }
    const formatData = gettedPaises.result.recordset.map(item => {
      return{
        text: item.xpais,
        value: `${item.cpais}`
      }
    })
    res.status(201).send({
      status: true, 
      message: 'Países Obtenidas',
      data: [...formatData]
    });
    
  } catch (error) {
    
  }
}
const getMaMetPago = async (req, res) => {
  try {
    const gettedMetsPago = await Maestros.getMaMetPago();
    // console.log(gettedMetsPago.result)
    if (gettedMetsPago.error) {
      return res.status(gettedMetsPago.code).send({
        status: false,
        message: gettedMetsPago.error
      });
    }
    const formatData = gettedMetsPago.result.recordset.map(item => {
      return{
        text: item.xmetodologiapago,
        value: `${item.cmetodologiapago}`
      }
    })
    res.status(201).send({
      status: true, 
      message: 'Metodologías de Pago Obtenidas',
      data: [...formatData]
    });
    
  } catch (error) {
    
  }
}
const getServicios = async (req, res) => {
  try {
    const gettedServicios = await Maestros.getServicios(58, 1);
    // console.log(gettedServicios.result)
    if (gettedServicios.error) {
      return res.status(gettedServicios.code).send({
        status: false,
        message: gettedServicios.error
      });
    }
    const formatData = gettedServicios.result.recordset.map(item => {
      return{
        text: item.xservicio,
        value: `${item.cservicio}`
      }
    })
    res.status(201).send({
      status: true, 
      message: 'Servicios Obtenidos',
      data: [...formatData]
    });
    
  } catch (error) {
    
  }
}
const getAseguradoras = async (req, res) => {
  try {
    const gettedAseguradoras = await Maestros.getAseguradoras(58, 1);
    // console.log(gettedAseguradoras.result)
    if (gettedAseguradoras.error) {
      return res.status(gettedAseguradoras.code).send({
        status: false,
        message: gettedAseguradoras.error
      });
    }
    const formatData = gettedAseguradoras.result.recordset.map(item => {
      return{
        text: item.xaseguradora,
        value: `${item.caseguradora}`
      }
    })
    res.status(201).send({
      status: true, 
      message: 'Aseguradoras Obtenidas',
      data: [...formatData]
    });
    
  } catch (error) {
    
  }
}

export default {
  getMaMonedas,
  getMaCompania,
  getMaPais,
  getMaMetPago,
  getServicios,
  getAseguradoras
}