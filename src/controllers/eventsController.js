import eventsService from '../service/eventsService.js';

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

export default {
    searchEvents,
    getEvent,
    createEvents
}