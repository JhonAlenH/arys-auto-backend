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


export default {
    searchEvents,
}