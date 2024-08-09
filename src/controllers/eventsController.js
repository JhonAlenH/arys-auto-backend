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
    const seguimientos = await Events.getSeguimientos(req.body);
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

    const ordenesM = ordenes.map(orden => {
        const ordenNew = orden
        ordenNew.type = 'info'
        return ordenNew
    })
    return res
        .status(200)
        .send({
            status: true,
            data: ordenesM
        });
}
const getNotasById = async (req, res) => {
    const notas = await Events.getNotasById(req.params.id);
    if (notas.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: notas.permissionError
            });
    }
    if (notas.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: notas.error
            });
    }
    if (notas.length <= 0) {
        return res
            .status(500)
            .send({
                status: false,
                message: 'No hay Notas para esta notificacion'
            });
    }
    const notasM = notas.map(nota => {
        const notaNew = nota
        notaNew.type = 'update'
        return notaNew
    })
    return res
        .status(200)
        .send({
            status: true,
            data: notasM
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

const updateEvents = async (req, res) => {
    const update = await eventsService.updateEvents(req.body);
    if (update.error) {
        return res.status(update.code).send({
          status: false,
          message: update.error
        });
      }
      res.status(201).send({
        status: true, 
        message: 'La notificación ha sido modificado exitosamente!',
        data: update
      });
}

const getReplacementById = async (req, res) => {
    const replacement = await Events.getReplacementById(req.params.id);
    if (replacement.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: replacement.permissionError
            });
    }
    if (replacement.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: replacement.error
            });
    }

    if (replacement.length <= 0) {
        return res
            .status(500)
            .send({
                status: false,
                message: 'No hay Repuestos para esta notificacion'
            });
    }

    const replacementM = replacement.map(repuestos => {
        const replacement = repuestos
        replacement.type = 'update'
        return replacement
    })

    return res
        .status(200)
        .send({
            status: true,
            data: replacementM
        });
}

const getQuoteById = async (req, res) => {
    const quotes = await Events.getQuoteById(req.params.id);
    if (quotes.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: quotes.permissionError
            });
    }
    if (quotes.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: quotes.error
            });
    }

    if (quotes.length <= 0) {
        return res
            .status(500)
            .send({
                status: false,
                message: 'No hay Cotizacion con el id brindado'
            });
    }

    return res
        .status(200)
        .send({
            status: true,
            data: quotes
        });
}
const getQuotesById = async (req, res) => {
    const quotes = await Events.getQuotesById(req.params.id);
    if (quotes.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: quotes.permissionError
            });
    }
    if (quotes.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: quotes.error
            });
    }

    if (quotes.length <= 0) {
        return res
            .status(500)
            .send({
                status: false,
                message: 'No hay Repuestos para esta notificacion'
            });
    }

    const quotesM = quotes.map(cotizaciones => {
        const quotes = cotizaciones
        quotes.type = 'update'
        return quotes
    })

    return res
        .status(200)
        .send({
            status: true,
            data: quotesM
        });
}

const getQuoteDelivery = async (req, res) => {
    const delivery = await Events.getQuoteDelivery(req.params.id);
    if (delivery.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: delivery.permissionError
            });
    }
    if (delivery.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: delivery.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            data: replacement
        });
}
const getQuotesReplacement = async (req, res) => {
    const replacement = await Events.getQuotesReplacement(req.params.id);
    if (replacement.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: replacement.permissionError
            });
    }
    if (replacement.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: replacement.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            data: replacement
        });
}

const getQuotesReplacementDetail = async (req, res) => {
    const replacement = await Events.getQuotesReplacementDetail(req.params.id);
    if (replacement.permissionError) {
        return res
            .status(403)
            .send({
                status: false,
                message: replacement.permissionError
            });
    }
    if (replacement.error) {
        return res
            .status(500)
            .send({
                status: false,
                message: replacement.error
            });
    }
    const repuestos = replacement.map(repue => {
        const repuestosNew = repue
        repuestosNew.selected = false
        return repuestosNew
    })
    return res
        .status(200)
        .send({
            status: true,
            data: repuestos
        });
}

export default {
    searchEvents,
    getEvent,
    getSeguimientosById,
    getSeguimientos,
    createEvents,
    getServiceOrderById,
    getServiceOrder,
    updateEvents,
    getNotasById,
    getReplacementById,
    getQuoteById,
    getQuotesById,
    getQuotesReplacement,
    getQuoteDelivery,
    getQuotesReplacementDetail
}