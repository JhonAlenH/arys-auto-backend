import Proveedores from '../db/Proveedores.js';
import Servicio from '../db/Servicio.js';

const searchProveedores = async (req, res) => {
  try {
    const proveedores = await Proveedores.searchProveedores(req.body);
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
    const createdProveedor = await Proveedores.createProveedores(req.body);
    if (createdProveedor.error) {
      return res.status(createdProveedor.code).send({
        status: false,
        message: createdProveedor.error
      });
    }
    
    const linkServiciosProveedor = await Servicio.linkServiciosProveedor(req.body.cservicio, createdProveedor.result.recordset[0].cproveedor)

    if (linkServiciosProveedor.error) {
      return res.status(linkServiciosProveedor.code).send({
        status: false,
        message: linkServiciosProveedor.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Proveedor Creado',
      data: createdProveedor
    });
    
  } catch (error) {
    
  }
}
const searchProveedor = async (req, res) => {
  try {
    const findedProveedores = await Proveedores.searchProveedoresById(req.params.id);
    if (findedProveedores.error) {
      return res.status(findedProveedores.code).send({
        status: false,
        message: findedProveedores.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Proveedor Obtenido2',
      data: findedProveedores
    });
    
  } catch (error) {
    
  }
}
const updateProveedores = async (req, res) => {
  try {
    const updatedProveedores = await Proveedores.updateProveedores(req.params.id, req.body);
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

export default {
  createProveedores,
  searchProveedores,
  searchProveedor,
  updateProveedores
}