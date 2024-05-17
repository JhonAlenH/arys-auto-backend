import Events from '../db/Events.js';

const searchEvents = async (body, ccompania,cpais) => {
    const events = await Events.searchEvents(body, ccompania, cpais);
    if (events.error) {
        return {
            error: events.error
        }
    }
    return events;
}
const getEvent = async (id) => {
    const event = await Events.getEvent(id);
    if (event.error) {
        return {
            error: event.error
        }
    }
    return event;
}

const createEvents = async (createEvents) => {
    const event = await Events.createEvents(createEvents);

    return event;
}


export default {
    searchEvents,
    getEvent,
    createEvents
}