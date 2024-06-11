import express from 'express';

import maestrosController from '../../src/controllers/maestrosController.js';

const router = express.Router();

router
    .post("/monedas/search/:ccompania", maestrosController.searchMonedas)
    .post("/monedas/create", maestrosController.createMonedas)
    .get("/monedas/get/:id", maestrosController.searchMoneda)
    .post("/monedas/edit/:id", maestrosController.updateMonedas)

    .post("/paises/search/:ccompania", maestrosController.searchPaises)
    .post("/paises/create", maestrosController.createPaises)
    .get("/paises/get/:id", maestrosController.searchPais)
    .post("/paises/edit/:id", maestrosController.updatePaises)
    .get("/paises/searchMaestros", maestrosController.searchPaisesMaestros)

    .post("/metodologiapago/search/:ccompania", maestrosController.searchMetodologiapago)
    .post("/metodologiapago/create", maestrosController.createMetodologiapago)
    .get("/metodologiapago/get/:id", maestrosController.searchMetodologiapago1)
    .post("/metodologiapago/edit/:id", maestrosController.updateMetodologiapago)

    .post("/proveedores/search/:ccompania", maestrosController.searchProveedores)
    .post("/proveedores/create", maestrosController.createProveedores)
    .get("/proveedores/get/:id", maestrosController.searchProveedor)
    .post("/proveedores/edit/:id", maestrosController.updateProveedores)

    .post("/bancos/search/:ccompania", maestrosController.searchBancos)
    .post("/bancos/create", maestrosController.createBancos)
    .get("/bancos/get/:id", maestrosController.searchBanco)
    .post("/bancos/edit/:id", maestrosController.updateBancos)

    .post("/companias/search/:ccompania", maestrosController.searchCompanias)
    .post("/companias/create", maestrosController.createCompanias)
    .get("/companias/get/:id", maestrosController.searchCompania)
    .post("/companias/edit/:id", maestrosController.updateCompanias)
    .get("/companias/searchMaestros", maestrosController.searchCompaniasMaestros)

    .post("/clientes/search/:ccompania", maestrosController.searchClientes)
    .post("/clientes/create", maestrosController.createClientes)
    .get("/clientes/get/:id", maestrosController.searchCliente)
    .post("/clientes/edit/:id", maestrosController.updateClientes)
    .get("/clientes/searchMaestros", maestrosController.searchClientesMaestros)

    .post("/propietarios/search/:ccompania", maestrosController.searchPropietarios)
    .post("/propietarios/create", maestrosController.createPropietarios)
    .get("/propietarios/get/:id", maestrosController.searchPropietario)
    .post("/propietarios/edit/:id", maestrosController.updatePropietarios)

    .post("/parentescos/search/:ccompania", maestrosController.searchParentescos)
    .post("/parentescos/create", maestrosController.createParentescos)
    .get("/parentescos/get/:id", maestrosController.searchParentesco)
    .post("/parentescos/edit/:id", maestrosController.updateParentescos)

    .post("/estadocivil/search/:ccompania", maestrosController.searchEstadocivil)
    .post("/estadocivil/create", maestrosController.createEstadocivil)
    .get("/estadocivil/get/:id", maestrosController.searchEstadocivil1)
    .post("/estadocivil/edit/:id", maestrosController.updateEstadocivil)

    .post("/tipodocidentidad/search/:ccompania", maestrosController.searchTipodocidentidad)
    .post("/tipodocidentidad/create", maestrosController.createTipodocidentidad)
    .get("/tipodocidentidad/get/:id", maestrosController.searchTipodocidentidad1)
    .post("/tipodocidentidad/edit/:id", maestrosController.updateTipodocidentidad)

    .post("/tiposervicios/search/:ccompania", maestrosController.searchTiposervicios)
    .post("/tiposervicios/create", maestrosController.createTiposervicios)
    .get("/tiposervicios/get/:id", maestrosController.searchTiposervicio)
    .post("/tiposervicios/edit/:id", maestrosController.updateTiposervicios)

    .post("/servicios/search/:ccompania", maestrosController.searchServicios)
    .post("/servicios/create", maestrosController.createServicios)
    .get("/servicios/get/:id", maestrosController.searchServicio)
    .post("/servicios/edit/:id", maestrosController.updateServicios)

    .post("/marcas/search/:ccompania", maestrosController.searchMarcas)
    .post("/marcas/create", maestrosController.createMarcas)
    .get("/marcas/get/:id", maestrosController.searchMarca)
    .post("/marcas/edit/:id", maestrosController.updateMarcas)

    .post("/vehiculos/search/:ccompania", maestrosController.searchVehiculos)
    .get("/vehiculos/get/:id", maestrosController.searchVehiculo)
    .post("/vehiculos/edit/:id", maestrosController.updateVehiculos)


    .get("/estatus", maestrosController.getMaEstatus)
    .get("/aseguradoras", maestrosController.getAseguradoras)
    .get("/ciudades/:estado", maestrosController.getMaCiudades)
    .get("/ciudades/:estado", maestrosController.getMaCiudades)
    .get("/estados/:pais", maestrosController.getMaEstados)
    .post("/replacement", maestrosController.getMaRepuestos)
    
export default router;