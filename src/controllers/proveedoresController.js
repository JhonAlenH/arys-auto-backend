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
    const proveedor = await Proveedores.searchProveedoresById(req.params.id);
    if (proveedor.error) {
      return res.status(proveedor.code).send({
        status: false,
        message: proveedor.error
      });
    }

    const serviciosProveedor = await Servicio.searchProveedorServices(proveedor.result.cproveedor)

    if (serviciosProveedor.error) {
      return res.status(serviciosProveedor.code).send({
        status: false,
        message: serviciosProveedor.error
      });
      
    }

    let i = 0
    proveedor.result.cservicio = ''
    if(serviciosProveedor.length> 0){
      for (const service of serviciosProveedor) {     
        if(typeof service.cservicio == 'number'){
          proveedor.result.cservicio += `${service.cservicio}?${service.ctiposervicio}`
          i++
          if(i < serviciosProveedor.length) {
            proveedor.result.cservicio += `,`
          }
        } else {
          i++
        }
      }
    }

    // const providerList = serviciosProveedor
    proveedor.result.ctiposervicio = serviciosProveedor

    res.status(201).send({
      status: true, 
      message: 'Proveedor Obtenido2',
      data: proveedor
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

    const linkServiciosProveedor = await Servicio.linkServiciosProveedor(req.body.cservicio, req.params.id)

    if (linkServiciosProveedor.error) {
      return res.status(linkServiciosProveedor.code).send({
        status: false,
        message: linkServiciosProveedor.error
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