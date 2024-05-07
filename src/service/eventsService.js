import Events from '../db/Events.js';

const searchEvents = async () => {
    const events = await Events.searchEvents();
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