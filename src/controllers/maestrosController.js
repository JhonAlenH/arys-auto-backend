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
const getMaCompanias = async (req, res) => {
  try {
    const gettedCompanias = await Maestros.getMaCompanias();
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
const getMaEstatuses = async (req, res) => {
  try {
    const gettedEstatus = await Maestros.getMaEstatuses();
    // console.log(gettedEstatus.result)
    if (gettedEstatus.error) {
      return res.status(gettedEstatus.code).send({
        status: false,
        message: gettedEstatus.error
      });
    }
    const formatData = gettedEstatus.result.recordset.map(item => {
      return{
        text: item.xestatusgeneral,
        value: `${item.cestatusgeneral}`
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
const getMaEstatus = async (req, res) => {
  try {
    const gettedEstatuses = await Maestros.getMaEstatus();
    // console.log(gettedEstatuses.result)
    if (gettedEstatuses.error) {
      return res.status(gettedEstatuses.code).send({
        status: false,
        message: gettedEstatuses.error
      });
    }
    const formatData = gettedEstatuses.result.recordset.map(item => {
      return{
        text: item.xestatusgeneral,
        value: `${item.cestatusgeneral}`
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
const getMaCompania = async (req, res) => {
  try {
    const gettedCompania = await Maestros.getMaCompania(req.params.id);
    // console.log(gettedCompanias.result)
    if (gettedCompania.error) {
      return res.status(gettedCompania.code).send({
        status: false,
        message: gettedCompania.error
      });
    }
    const formatData = gettedCompania.result.recordset.map(item => {
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
const getMaPaises = async (req, res) => {
  try {
    const gettedPaises = await Maestros.getMaPaises();
    // console.log(gettedPaises.result)
    if (gettedPaises.error) {
      return res.status(gettedPaises.code).send({
        status: false,
        message: gettedPaises.error
      });
    }
    const formatData = gettedPaises.result.recordset.map(item => {
      return{
        text: item.xpais.toLowerCase(),
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
const getMaCiudades = async (req, res) => {
  try {
    const gettedCiudades = await Maestros.getMaCiudades(req.params.estado);
    // console.log(gettedCiudades.result)
    if (gettedCiudades.error) {
      return res.status(gettedCiudades.code).send({
        status: false,
        message: gettedCiudades.error
      });
    }
    const formatData = gettedCiudades.result.recordset.map(item => {
      return{
        text: item.xdescripcion_l,
        value: `${item.cciudad}`
      }
    })
    res.status(201).send({
      status: true, 
      message: 'Ciudades Obtenidas',
      data: [...formatData]
    });
    
  } catch (error) {
    
  }
}
const getMaEstados = async (req, res) => {
  try {
    const gettedCiudades = await Maestros.getMaEstados(req.params.pais);
    // console.log(gettedCiudades.result)
    if (gettedCiudades.error) {
      return res.status(gettedCiudades.code).send({
        status: false,
        message: gettedCiudades.error
      });
    }
    const formatData = gettedCiudades.result.recordset.map(item => {
      return{
        text: item.xdescripcion_l,
        value: `${item.cestado}`
      }
    })
    res.status(201).send({
      status: true, 
      message: 'Estados Obtenidos',
      data: [...formatData]
    });
    
  } catch (error) {
    
  }
}
const getMaMetsPago = async (req, res) => {
  try {
    const gettedMetsPago = await Maestros.getMaMetsPago();
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
const getMoneda = async (req, res) => {
  try {
    const gettedMoneda = await Maestros.getMoneda(req.params.id);
    console.log(gettedMoneda)
    if (gettedMoneda.error) {
      return res.status(gettedMoneda.code).send({
        status: false,
        message: gettedMoneda.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Moneda Obtenida',
      data: gettedMoneda
    });
    
  } catch (error) {
    
  }
}
const getMaRepuestos = async (req, res) => {
  try {
    const gettedRepuestos = await Maestros.getMaRepuestos(req.body);
    // console.log(gettedPaises.result)
    if (gettedRepuestos.error) {
      return res.status(gettedPaises.code).send({
        status: false,
        message: gettedPaises.error
      });
    }
    const formatData = gettedRepuestos.result.recordset.map(item => {
      return{
        text: item.xrepuesto,
        value: `${item.crepuesto}`
      }
    })
    res.status(201).send({
      status: true, 
      message: 'Repuestos Obtenidas',
      data: [...formatData]
    });
    
  } catch (error) {
    
  }
}
const getMaBancos = async (req, res) => {
  try {
    const gettedRepuestos = await Maestros.getMaBancos(req.body);
    // console.log(gettedPaises.result)
    if (gettedRepuestos.error) {
      return res.status(gettedPaises.code).send({
        status: false,
        message: gettedPaises.error
      });
    }
    const formatData = gettedRepuestos.result.recordset.map(item => {
      return{
        text: item.xrepuesto,
        value: `${item.crepuesto}`
      }
    })
    res.status(201).send({
      status: true, 
      message: 'Repuestos Obtenidas',
      data: [...formatData]
    });
    
  } catch (error) {
    
  }
}
const getMaProveedores = async (req, res) => {
  try {
    const gettedProveedores = await Maestros.getMaProveedores(req.body);
    // console.log(gettedProveedores.result)
    if (gettedProveedores.error) {
      return res.status(gettedProveedores.code).send({
        status: false,
        message: gettedProveedores.error
      });
    }
    const formatData = gettedProveedores.result.recordset.map(item => {
      return{
        text: item.xnombre,
        value: `${item.cproveedor}`
      }
    })
    res.status(201).send({
      status: true, 
      message: 'Proveedores Obtenidos',
      data: [...formatData]
    });
    
  } catch (error) {
    
  }
}
const getMaPropietarios = async (req, res) => {
  try {
    const gettedProveedores = await Maestros.getMaPropietarios(req.body);
    // console.log(gettedProveedores.result)
    if (gettedProveedores.error) {
      return res.status(gettedProveedores.code).send({
        status: false,
        message: gettedProveedores.error
      });
    }
    const formatData = gettedProveedores.result.recordset.map(item => {
      return{
        text: item.xnombre,
        value: `${item.cproveedor}`
      }
    })
    res.status(201).send({
      status: true, 
      message: 'Proveedores Obtenidos',
      data: [...formatData]
    });
    
  } catch (error) {
    
  }
}

const getMaParentescos = async (req, res) => {
  try {
    const gettedParentescos = await Maestros.getMaParentescos(req.body);
    // console.log(gettedProveedores.result)
    if (gettedParentescos.error) {
      return res.status(gettedParentescos.code).send({
        status: false,
        message: gettedParentescos.error
      });
    }
    const formatData = gettedParentescos.result.recordset.map(item => {
      return{
        text: item.xparentesco,
        value: `${item.cparentesco}`
      }
    })
    res.status(201).send({
      status: true, 
      message: 'Proveedores Obtenidos',
      data: [...formatData]
    });
    
  } catch (error) {
    
  }
}

const getMaEstadocivil = async (req, res) => {
  try {
    const gettedEstadocivil = await Maestros.getMaEstadocivil(req.body);
    // console.log(gettedProveedores.result)
    if (gettedEstadocivil.error) {
      return res.status(gettedEstadocivil.code).send({
        status: false,
        message: gettedEstadocivil.error
      });
    }
    const formatData = gettedEstadocivil.result.recordset.map(item => {
      return{
        text: item.ctipodocidentidad,
        value: `${item.ctipodocidentidad}`
      }
    })
    res.status(201).send({
      status: true, 
      message: 'Tipo de Documentos Obtenidos',
      data: [...formatData]
    });
    
  } catch (error) {
    
  }
}

const getMaTipodocidentidad = async (req, res) => {
  try {
    const gettedTipodocidentidad = await Maestros.getMaTipodocidentidad(req.body);
    // console.log(gettedProveedores.result)
    if (gettedTipodocidentidad.error) {
      return res.status(gettedTipodocidentidad.code).send({
        status: false,
        message: gettedTipodocidentidad.error
      });
    }
    const formatData = gettedTipodocidentidad.result.recordset.map(item => {
      return{
        text: item.xtipodocidentidad,
        value: `${item.ctipodocidentidad}`
      }
    })
    res.status(201).send({
      status: true, 
      message: 'Tipo de Documentos Obtenidos',
      data: [...formatData]
    });
    
  } catch (error) {
    
  }
}

const getMaMarcas = async (req, res) => {
  try {
    const gettedMarcas = await Maestros.getMaMarcas(req.body);
    // console.log(gettedProveedores.result)
    if (gettedMarcas.error) {
      return res.status(gettedMarcas.code).send({
        status: false,
        message: gettedMarcas.error
      });
    }
    const formatData = gettedMarcas.result.recordset.map(item => {
      return{
        text: item.xmarca,
        value: `${item.id}`
      }
    })
    res.status(201).send({
      status: true, 
      message: 'Marcas Obtenidas',
      data: [...formatData]
    });
    
  } catch (error) {
    
  }
}

const getMaVehiculos = async (req, res) => {
  try {
    const gettedVehiculos = await Maestros.getMaVehiculos(req.body);
    // console.log(gettedProveedores.result)
    if (gettedVehiculos.error) {
      return res.status(gettedVehiculos.code).send({
        status: false,
        message: gettedVehiculos.error
      });
    }
    const formatData = gettedVehiculos.result.recordset.map(item => {
      return{
        text: item.cvehiculopropietario,
        value: `${item.id}`
      }
    })
    res.status(201).send({
      status: true, 
      message: 'Vehículos Obtenidos',
      data: [...formatData]
    });
    
  } catch (error) {
    
  }
}
 
export default {
  getMaMonedas,
  getMaEstatus,
  getMaCompanias,
  getMaCompania,
  getMaPaises,
  getMaMetsPago,
  getServicios,
  getAseguradoras,
  getMaCiudades,
  getMaEstados,
  getMoneda,
  getMaRepuestos,
  getMaBancos,
  getMaMarcas,
  getMaProveedores,
  getMaPropietarios,
  getMaParentescos,
  getMaEstadocivil,
  getMaVehiculos,
  getMaTipodocidentidad,
  getMaProveedores,
  getMaPropietarios,
  getMaEstatuses,
}