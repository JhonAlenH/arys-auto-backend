import eventsService from '../service/eventsService.js';
import Events from '../db/Events.js';

const searchEvents = async (req, res) => {
    let eventsList = []
    const events = await eventsService.searchEvents(req.body, req.params.ccompania, req.params.cpais);
    if (events.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: events.permissionError
            });
    }
    if (events.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: events.error
            });
    }

    events.forEach((item) => {
        eventsList.push({
            cnotificacion: item.cnotificacion,
            xnombre: item.xnombre + ' ' + item.xapellido,
            xvehiculo: item.xmarca + ' ' + item.xmodelo,
            xplaca: item.xplaca,
            xcausasiniestro: item.xcausasiniestro,
            xcompania: item.xcompania,
            ccompania: item.ccompania,
        });
    });

    return res
        .status(200)
        .send({
            status: true,
            data: {
                events: eventsList
            }
        });
}
const getEvent = async (req, res) => {
    const event = await eventsService.getEvent(req.params.id);
    if (event.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: event.permissionError
            });
    }
    if (event.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: event.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            data: event
        });
}
const getSeguimientosById = async (req, res) => {
    const seguimientos = await Events.getSeguimientosById(req.params.id);
    if (seguimientos.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: seguimientos.permissionError
            });
    }
    if (seguimientos.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: seguimientos.error
            });
    }
    if (seguimientos.result.length <= 0) {
        return res
            .status(500)
            .send({
                status: false,
                message: 'No hay Seguimentos para esta notificacion'
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            data: seguimientos
        });
}
const getSeguimientos = async (req, res) => {
    const seguimientos = await Events.getSeguimientos(req.params.body);
    if (seguimientos.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: seguimientos.permissionError
            });
    }
    if (seguimientos.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: seguimientos.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            data: seguimientos
        });
}

const createEvents = async (req, res) => {
    const event = await eventsService.createEvents(req.body);
    if (event.error) {
        return res.status(event.code).send({
          status: false,
          message: event.error
        });
      }
      res.status(201).send({
        status: true, 
        message: 'La notificación ha sido creada exitosamente!',
        data: event
      });
}

const getServiceOrderById = async (req, res) => {
    const ordenes = await Events.getServiceOrderById(req.params.id);
    if (ordenes.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: ordenes.permissionError
            });
    }
    if (ordenes.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: ordenes.error
            });
    }
    if (ordenes.length <= 0) {
        return res
            .status(500)
            .send({
                status: false,
                message: 'No hay Ordenes de Servicios para esta notificacion'
            });
    }
    const formattedList = ordenes.map((item) => ({
        ...item,
        fsolicitud: item.fsolicitud ? new Date(item.fsolicitud).toLocaleDateString('es-ES') : null,
        fajuste: item.fajuste ? new Date(item.fajuste).toLocaleDateString('es-ES') : null,
    }));
    return res
        .status(200)
        .send({
            status: true,
            data: formattedList
        });
}

const getServiceOrder = async (req, res) => {
    const ordenes = await Events.getServiceOrder(req.params.corden);
    if (ordenes.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: ordenes.permissionError
            });
    }
    if (ordenes.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: ordenes.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            data: ordenes
        });
}

export default {
    searchEvents,
    getEvent,
    getSeguimientosById,
    getSeguimientos,
    createEvents,
    getServiceOrderById,
    getServiceOrder
}