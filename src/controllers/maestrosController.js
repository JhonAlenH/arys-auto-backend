import Maestros from '../db/Maestros.js';

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
      message: 'Ciudades Obtenidas',
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

// Nuevo Modelo

const searchMonedas = async (req, res) => {
  console.log('Nada')
  try {
    const monedas = await Maestros.searchMonedas();
    if (monedas.error) {
      return res.status(monedas.code).send({
        status: false,
        message: monedas.error
      });
      
    }
    res.status(201).send({
      status: true, 
      message: 'Monedas Obtenidas',
      data: monedas
    });
  } catch (error){

  }
}

const createMonedas = async (req, res) => {
  try {
    const createdMonedas = await Maestros.createMonedas(req.body);
    if (createdMonedas.error) {
      return res.status(createdMonedas.code).send({
        status: false,
        message: createdMonedas.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Moneda Creada',
      data: createdMonedas
    });
    
  } catch (error) {
    
  }
}
const searchMoneda = async (req, res) => {
  try {
    const findedMonedas = await Maestros.searchMonedasById(req.params.id);
    if (findedMonedas.error) {
      return res.status(findedMonedas.code).send({
        status: false,
        message: findedMonedas.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Moneda Obtenida',
      data: findedMonedas
    });
    
  } catch (error) {
    
  }
}
const updateMonedas = async (req, res) => {
  try {
    const updatedMonedas = await Maestros.updateMonedas(req.params.id, req.body);
    if (updatedMonedas.error) {
      return res.status(updatedMonedas.code).send({
        status: false,
        message: updatedMonedas.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Moneda Actualizada',
      data: updatedMonedas
    });
    
  } catch (error) {
    
  }
}
const searchPaises = async (req, res) => {
  try {
    const paises = await Maestros.searchPaises();
    if (paises.error) {
      return res.status(paises.code).send({
        status: false,
        message: paises.error
      });
      
    }
    res.status(201).send({
      status: true, 
      message: 'Paises Obtenidos',
      data: paises
    });
  } catch (error){

  }
}

const createPaises = async (req, res) => {
  try {
    const createdPaises = await Maestros.createPaises(req.body);
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
    const findedPaises = await Maestros.searchPaisesById(req.params.id);
  
    if (findedPaises.error) {
      return res.status(findedPaises.code).send({
        status: false,
        message: findedPaises.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Pais Obtenido',
      data: findedPaises
    });
    
  } catch (error) {
    
  }
}
const updatePaises = async (req, res) => {
  try {
    const updatedPaises = await Maestros.updatePaises(req.params.id, req.body);
    if (updatedPaises.error) {
      return res.status(updatedPaises.code).send({
        status: false,
        message: updatedPaises.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Pais Actualizado',
      data: updatedPaises
    });
    
  } catch (error) {
    
  }
}
const searchPaisesMaestros = async (req, res) => {
  try {
    const paises = await Maestros.searchPaises();
    if (paises.error) {
      return res.status(paises.code).send({
        status: false,
        message: paises.error
      });
      
    }
    const formData = paises.map(item => {
      return {
        text: item.xpais,
        value: item.cpais
      }
    })
    res.status(201).send({
      status: true, 
      message: 'Pais Obtenidos',
      data: formData
    });
  } catch (error){

  }
}

const searchMetodologiapago = async (req, res) => {
  try {
  const metodologiapago = await Maestros.searchMetodologiapago();
  if (metodologiapago.error) {
      return res.status(metodologiapago.code).send({
      status: false,
      message: metodologiapago.error
      });
      
  }
  res.status(201).send({
      status: true, 
      message: 'Metodologia de Pago Obtenida',
      data: metodologiapago
  });
  } catch (error){

  } 
}

const searchMetodologiapago1 = async (req, res) => {
  try {
    const findedMetodologiapago = await Maestros.searchMetodologiapagoById(req.params.id);
    if (findedMetodologiapago.error) {
      return res.status(findedMetodologiapago.code).send({
        status: false,
        message: findedMetodologiapago.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Metodologia de Pago Obtenido',
      data: findedMetodologiapago
    });
    
  } catch (error) {
    
  }
}

const createMetodologiapago = async (req, res) => {
  try {
    const createdMetodologiapago = await Maestros.createMetodologiapago(req.body);
    if (createdMetodologiapago.error) {
      return res.status(createdMetodologiapago.code).send({
        status: false,
        message: createdMetodologiapago.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Metodología de Pago Creada Satisfactoriamente',
      data: createdMetodologiapago
    });
    
  } catch (error) {
    
  }
}

const updateMetodologiapago = async (req, res) => {
  try {
    const updatedMetodologiapago = await Maestros.updateMetodologiapago(req.params.id, req.body);
    if (updatedMetodologiapago.error) {
      return res.status(updatedMetodologiapago.code).send({
        status: false,
        message: updatedMetodologiapago.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Metodologia de pago Actualizada',
      data: updatedMetodologiapago
    });
    
  } catch (error) {
    
  }
}
const searchProveedores = async (req, res) => {
  try {
    const proveedores = await Maestros.searchProveedores(req.body);
    if (proveedores.error) {
      return res.status(proveedores.code).send({
        status: false,
        message: proveedores.error
      });
      
    }
    res.status(201).send({
      status: true, 
      message: 'Proveedores Obtenidos',
      data: proveedores
    });
  } catch (error){

  }
}

const createProveedores = async (req, res) => {
  try {
    const createdProveedores = await Maestros.createProveedores(req.body);
    if (createdProveedores.error) {
      return res.status(createdProveedores.code).send({
        status: false,
        message: createdProveedores.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Proveedor Creado',
      data: createdProveedores
    });
    
  } catch (error) {
    
  }
}
const searchProveedor = async (req, res) => {
  try {
    const findedProveedores = await Maestros.searchProveedoresById(req.params.id);
    if (findedProveedores.error) {
      return res.status(findedProveedores.code).send({
        status: false,
        message: findedProveedores.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Proveedor Obtenido',
      data: findedProveedores
    });
    
  } catch (error) {
    
  }
}
const updateProveedores = async (req, res) => {
  console.log('Atualiza Proveedor')
  try {
    const updatedProveedores = await Maestros.updateProveedores(req.params.id, req.body);
    if (updatedProveedores.error) {
      return res.status(updatedProveedores.code).send({
        status: false,
        message: updatedProveedores.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Proveedor Actualizado',
      data: updatedProveedores
    });
    
  } catch (error) {
    
  }
}
const searchBancos = async (req, res) => {
  console.log('Buasca Bancos 1')
  try {
    const bancos = await Maestros.searchBancos(req.body);
    if (bancos.error) {
      return res.status(bancos.code).send({
        status: false,
        message: bancos.error
      });
      
    }
    res.status(201).send({
      status: true, 
      message: 'Bancos Obtenidos',
      data: bancos
    });
  } catch (error){

  }
}

const createBancos = async (req, res) => {
  try {
    const createdBancos = await Maestros.createBancos(req.body);
    if (createdBancos.error) {
      return res.status(createdBancos.code).send({
        status: false,
        message: createdBancos.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Banco Creado',
      data: createdBancos
    });
    
  } catch (error) {
    
  }
}
const searchBanco = async (req, res) => {
  console.log('Buasca Banco')
  try {
    const findedBancos = await Maestros.searchBancosById(req.params.id);
    if (findedBancos.error) {
      return res.status(findedBancos.code).send({
        status: false,
        message: findedBancos.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Banco Obtenido',
      data: findedBancos
    });
    
  } catch (error) {
    
  }
}
const updateBancos = async (req, res) => {
  console.log('Actualiza Banco')
  try {
    const updatedBancos = await Maestros.updateBancos(req.params.id, req.body);
    if (updatedBancos.error) {
      return res.status(updatedBancos.code).send({
        status: false,
        message: updatedBancos.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Banco Actualizado',
      data: updatedBancos
    });
    
  } catch (error) {
    
  }
}
const searchCompanias = async (req, res) => {
  try {
    const companias = await Maestros.searchCompanias(req.body);
    if (companias.error) {
      return res.status(companias.code).send({
        status: false,
        message: companias.error
      });
      
    }
    res.status(201).send({
      status: true, 
      message: 'Compañías Obtenidos',
      data: companias
    });
  } catch (error){

  }
}

const createCompanias = async (req, res) => {
  try {
    const createdCompanias = await Maestros.createCompanias(req.body);
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
const searchCompania = async (req, res) => {
  try {
    const findedCompanias = await Maestros.searchCompaniasById(req.params.id);
    if (findedCompanias.error) {
      return res.status(findedCompanias.code).send({
        status: false,
        message: findedCompanias.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Compania Obtenida',
      data: findedCompanias
    });
    
  } catch (error) {
    
  }
}
const updateCompanias = async (req, res) => {
  console.log('Actualiza Compañías')
  try {
    const updatedCompanias = await Maestros.updateCompanias(req.params.id, req.body);
    console.log(updatedCompanias)
    if (updatedCompanias.error) {
      return res.status(updatedCompanias.code).send({
        status: false,
        message: updatedCompanias.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Compania Actualizada',
      data: updatedCompanias
    });
    
  } catch (error) {
    
  }
}
const searchCompaniasMaestros = async (req, res) => {
  try {
    const companias = await Maestros.searchCompanias();
    if (companias.error) {
      return res.status(companias.code).send({
        status: false,
        message: companias.error
      });      
    }
    const formData = companias.map(item => {
      return {
        text: item.xcompania,
        value: item.ccompania
      }
    })
    res.status(201).send({
      status: true, 
      message: 'Compañía Obtenida',
      data: formData
    });
  } catch (error){

  }
}
const searchClientes = async (req, res) => {
  console.log('busca cliente')
  try {
    const clientes = await Maestros.searchClientes(req.body);
    if (clientes.error) {
      return res.status(clientes.code).send({
        status: false,
        message: clientes.error
      });
      
    }
    res.status(201).send({
      status: true, 
      message: 'Clientes Obtenidos',
      data: clientes
    });
  } catch (error){

  }
}

const createClientes = async (req, res) => {
  try {
    const createdClientes = await Maestros.createClientes(req.body);
    if (createdClientes.error) {
      return res.status(createdClientes.code).send({
        status: false,
        message: createdClientes.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Cliente Creado',
      data: createdClientes
    });
    
  } catch (error) {
    
  }
}
const searchCliente = async (req, res) => {
  try {
    const findedClientes = await Maestros.searchClientesById(req.params.id);
    if (findedClientes.error) {
      return res.status(findedClientes.code).send({
        status: false,
        message: findedClientes.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Cliente Obtenido',
      data: findedClientes
    });
    
  } catch (error) {
    
  }
}
const updateClientes = async (req, res) => {
  console.log('Actualiza Clientes aaa')
  try {
    const updatedClientes = await Maestros.updateClientes(req.params.id, req.body);
    console.log(updatedClientes)
    if (updatedClientes.error) {
      return res.status(updatedClientes.code).send({
        status: false,
        message: updatedClientes.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Cliente Actualizado',
      data: updatedClientes
    });
    
  } catch (error) {
    
  }
}
const searchClientesMaestros = async (req, res) => {
  try {
    const clientes = await Maestros.searchClientes();
    if (clientes.error) {
      return res.status(clientes.code).send({
        status: false,
        message: clientes.error
      });
      
    }
    const formData = clientes.map(item => {
      return {
        text: item.xcliente,
        value: item.ccliente
      }
    })
    res.status(201).send({
      status: true, 
      message: 'Clientes Obtenidos',
      data: formData
    });
  } catch (error){

  }
}
const searchPropietarios = async (req, res) => {
  console.log('busca propietario')
  try {
    const propietarios = await Maestros.searchPropietarios(req.body);
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

const createPropietarios = async (req, res) => {
  try {
    const createdPropietarios = await Maestros.createPropietarios(req.body);
    if (createdPropietarios.error) {
      return res.status(createdPropietarios.code).send({
        status: false,
        message: createdPropietarios.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Propietario Creado',
      data: createdPropietarios
    });
    
  } catch (error) {
    
  }
}
const searchPropietario = async (req, res) => {
  try {
    const findedPropietarios = await Maestros.searchPropietariosById(req.params.id);
    if (findedPropietarios.error) {
      return res.status(findedPropietarios.code).send({
        status: false,
        message: findedPropietarios.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Propietario Obtenido',
      data: findedPropietarios
    });
    
  } catch (error) {
    
  }
}
const updatePropietarios = async (req, res) => {
  console.log('Actualiza Propietario')
  try {
    const updatedPropietarios = await Maestros.updatePropietarios(req.params.id, req.body);
    console.log(updatedPropietarios)
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
const searchParentescos = async (req, res) => {
  console.log('busca parentesco')
  try {
    const parentescos = await Maestros.searchParentescos(req.body);
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

const createParentescos = async (req, res) => {
  try {
    const createdParentescos = await Maestros.createParentescos(req.body);
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
    const findedParentescos = await Maestros.searchParentescosById(req.params.id);
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
  console.log('Actualiza Parentesco')
  try {
    const updatedParentescos = await Maestros.updateParentescos(req.params.id, req.body);
    console.log(updatedParentescos)
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
const searchEstadocivil = async (req, res) => {
  try {
    const estadocivil = await Maestros.searchEstadocivil(req.body);
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
    const createdEstadocivil = await Maestros.createEstadocivil(req.body);
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
    const findedEstadocivil = await Maestros.searchEstadocivilById(req.params.id);
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
  console.log('Actualiza Parentesco')
  try {
    const updatedEstadocivil = await Maestros.updateEstadocivil(req.params.id, req.body);
    console.log(updatedEstadocivil)
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
const searchTipodocidentidad = async (req, res) => {
  try {
    const tipodocidentidad = await Maestros.searchTipodocidentidad(req.body);
    if (tipodocidentidad.error) {
      return res.status(tipodocidentidad.code).send({
        status: false,
        message: tipodocidentidad.error
      });
      
    }
    res.status(201).send({
      status: true, 
      message: 'Tipo de Doc. de Identidad Obtenidos',
      data: tipodocidentidad
    });
  } catch (error){

  }
}
const createTipodocidentidad = async (req, res) => {
  try {
    const createdTipodocidentidad  = await Maestros.createTipodocidentidad (req.body);
    if (createdTipodocidentidad .error) {
      return res.status(createdTipodocidentidad .code).send({
        status: false,
        message: createdTipodocidentidad .error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Tipo de doc. de Identidad Creado',
      data: createdTipodocidentidad 
    });
    
  } catch (error) {
    
  }
}
const searchTipodocidentidad1 = async (req, res) => {
  try {
    const findedTipodocidentidad = await Maestros.searchTipodocidentidadById(req.params.id);
    if (findedTipodocidentidad.error) {
      return res.status(findedTipodocidentidad.code).send({
        status: false,
        message: findedTipodocidentidad.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Tipo Doc. de Identidad Obtenido',
      data: findedTipodocidentidad
    });
    
  } catch (error) {
    
  }
}
const updateTipodocidentidad = async (req, res) => {

  try {
    const updatedTipodocidentidad = await Maestros.updateTipodocidentidad(req.params.id, req.body);
    console.log(updatedTipodocidentidad)
    if (updatedTipodocidentidad.error) {
      return res.status(updatedTipodocidentidad.code).send({
        status: false,
        message: updatedTipodocidentidad.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Tipo de Doc. de Identidad Actualizado',
      data: updatedTipodocidentidad
    });
    
  } catch (error) {
    
  }
}
const searchTiposervicios = async (req, res) => {
  console.log('Buscar Tipo Servicios')
  try {
    const tiposervicio = await Maestros.searchTiposervicios(req.body);
    if (tiposervicio.error) {
      return res.status(tiposervicio.code).send({
        status: false,
        message: tiposervicio.error
      });
      
    }
    res.status(201).send({
      status: true, 
      message: 'Tipo de Servicios Obtenidos',
      data: tiposervicio
    });
  } catch (error){

  }
}
const createTiposervicios = async (req, res) => {
  try {
    const createdTiposervicios  = await Maestros.createTiposervicios (req.body);
    if (createdTiposervicios .error) {
      return res.status(createdTiposervicios .code).send({
        status: false,
        message: createdTiposervicios.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Tipo de Servicio Creado',
      data: createdTiposervicios 
    });
    
  } catch (error) {
    
  }
}
const searchTiposervicio = async (req, res) => {
  try {
    const findedTiposervicios = await Maestros.searchTiposerviciosById(req.params.id);
    if (findedTiposervicios.error) {
      return res.status(findedTiposervicios.code).send({
        status: false,
        message: findedTiposervicios.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Tipo de Servicio Obtenido',
      data: findedTiposervicios
    });
    
  } catch (error) {
    
  }
}
const updateTiposervicios = async (req, res) => {

  try {
    const updateTiposervicios = await Maestros.updateTiposervicios(req.params.id, req.body);
    console.log(updateTiposervicios)
    if (updateTiposervicios.error) {
      return res.status(updateTiposervicios.code).send({
        status: false,
        message: updateTiposervicios.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Tipo de Servicio Actualizado',
      data: updateTiposervicios
    });
    
  } catch (error) {
    
  }
}
const searchServicios = async (req, res) => {
  console.log('Buscar Servicios')
  try {
    const servicio = await Maestros.searchServicios(req.body);
    if (servicio.error) {
      return res.status(servicio.code).send({
        status: false,
        message: servicio.error
      });
      
    }
    res.status(201).send({
      status: true, 
      message: 'Servicios Obtenidos',
      data: servicio
    });
  } catch (error){

  }
}
const createServicios = async (req, res) => {
  try {
    const createdServicios  = await Maestros.createServicios (req.body);
    if (createdServicios .error) {
      return res.status(createdServicios .code).send({
        status: false,
        message: createdServicios.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Servicio Creado',
      data: createdServicios 
    });
    
  } catch (error) {
    
  }
}
const searchServicio = async (req, res) => {
  try {
    const findedServicios = await Maestros.searchServiciosById(req.params.id);
    if (findedServicios.error) {
      return res.status(findedServicios.code).send({
        status: false,
        message: findedServicios.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Servicio Obtenido',
      data: findedServicios
    });
    
  } catch (error) {
    
  }
}
const updateServicios = async (req, res) => {

  try {
    const updateServicios = await Maestros.updateServicios(req.params.id, req.body);
    console.log(updateServicios)
    if (updateServicios.error) {
      return res.status(updateServicios.code).send({
        status: false,
        message: updateServicios.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Servicio Actualizado',
      data: updateServicios
    });
    
  } catch (error) {
    
  }
}
const searchVehiculos = async (req, res) => {

  try {
    const vehiculo = await Maestros.searchVehiculos(req.body);
    if (vehiculo.error) {
      return res.status(vehiculo.code).send({
        status: false,
        message: vehiculo.error
      });
      
    }
    res.status(201).send({
      status: true, 
      message: 'Vehículos Obtenidos',
      data: vehiculo
    });
  } catch (error){

  }
}
const searchVehiculo = async (req, res) => {
  try {
    const findedVehiculos = await Maestros.searchVehiculosById(req.params.id);
    if (findedVehiculos.error) {
      return res.status(findedVehiculos.code).send({
        status: false,
        message: findedVehiculos.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Vehiculo Obtenido',
      data: findedVehiculos
    });
    
  } catch (error) {
    
  }
}
const updateVehiculos = async (req, res) => {
console.log('Actualizacion Vehiculo')
  try {
    const updateVehiculos = await Maestros.updateVehiculos(req.params.id, req.body);
    if (updateVehiculos.error) {
      return res.status(updateVehiculos.code).send({
        status: false,
        message: updateVehiculos.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Vehiculo Actualizado',
      data: updateVehiculos
    });
    
  } catch (error) {
    
  }
}
const searchMarcas = async (req, res) => {
  console.log('Buscar Marca')
  try {
    const marcas = await Maestros.searchMarcas(req.body);
    if (marcas.error) {
      return res.status(marcas.code).send({
        status: false,
        message: marcas.error
      });
      
    }
    res.status(201).send({
      status: true, 
      message: 'Marcas Obtenidas',
      data: marcas
    });
  } catch (error){

  }
}
const createMarcas = async (req, res) => {
  try {
    const createdMarcas  = await Maestros.createMarcas (req.body);
    if (createdMarcas .error) {
      return res.status(createdMarcas.code).send({
        status: false,
        message: createdMarcas.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Marca Creada',
      data: createdMarcas 
    });
    
  } catch (error) {
    
  }
}
const searchMarca = async (req, res) => {
  try {
    const findedMarcas = await Maestros.searchMarcasById(req.params.id);
    if (findedMarcas.error) {
      return res.status(findedMarcas.code).send({
        status: false,
        message: findedMarcas.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Marcas Obtenidas',
      data: findedMarcas
    });
    
  } catch (error) {
    
  }
}
const updateMarcas = async (req, res) => {

  try {
    const updateMarcas = await Maestros.updateMarcas(req.params.id, req.body);
    console.log(updateMarcas)
    if (updateMarcas.error) {
      return res.status(updateMarcas.code).send({
        status: false,
        message: updateMarcas.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Marca Actualizada',
      data: updateMarcas
    });
    
  } catch (error) {
    
  }
}
export default {
  getMaEstatus,
  getAseguradoras,
  getMaCiudades,
  getMaEstados,
  getMaRepuestos,
  getMaPropietarios,
  getMaPropietarios,

  createMonedas,
  searchMonedas,
  searchMoneda,
  updateMonedas,
  createPaises,
  searchPaises,
  searchPais,
  updatePaises,
  searchPaisesMaestros,
  createMetodologiapago,
  searchMetodologiapago,
  searchMetodologiapago1,
  updateMetodologiapago,
  createProveedores,
  searchProveedores,
  searchProveedor,
  updateProveedores,
  createBancos,
  searchBancos,
  searchBanco,
  updateBancos,
  createCompanias,
  searchCompanias,
  searchCompania,
  updateCompanias,
  searchCompaniasMaestros,
  createClientes,
  searchClientes,
  searchCliente,
  updateClientes,
  searchClientesMaestros,
  createPropietarios,
  searchPropietarios,
  searchPropietario,
  updatePropietarios,
  createParentescos,
  searchParentescos,
  searchParentesco,
  updateParentescos,
  createEstadocivil,
  searchEstadocivil,
  searchEstadocivil1,
  updateEstadocivil,
  createTipodocidentidad,
  searchTipodocidentidad,
  searchTipodocidentidad1,
  updateTipodocidentidad,
  createTiposervicios,
  searchTiposervicios,
  searchTiposervicio,
  updateTiposervicios,
  createServicios,
  searchServicios,
  searchServicio,
  updateServicios,
  searchVehiculos,
  searchVehiculo,
  updateVehiculos,
  createMarcas,
  searchMarcas,
  searchMarca,
  updateMarcas,
}