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

export default {
    searchEvents,
}