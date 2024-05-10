import Events from '../db/Events.js';

const searchEvents = async (code) => {
    const events = await Events.searchEvents(code);
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