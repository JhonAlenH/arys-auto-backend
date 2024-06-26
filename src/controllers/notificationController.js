import pkg from 'body-parser';
const { json } = pkg;
import Notification from '../db/Notification.js'

const getNotifications = async (req, res) => {
    const notifications = await Notification.getNotifications();
    if (notifications.error) { 
      res.status(notifications.code).send({ 
        status: false,
        message: notifications.error
      });
      return;
    }
    res.status(201).send({ 
      status: true, 
      message: 'Notificaciones obtenidas',
      data: notifications
    });
    return;
};

export default {
  getNotifications,
}