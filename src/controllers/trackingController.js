import Tracking from '../db/Tracking.js';
import cron from 'node-cron'
import webSocketJs from './../utilities/webSocket.js';
import Notification from '../db/Notification.js';

let allRecordTrackers = []

const getAllTrackersInit = async () => {
  try{
    let now = new Date
    const gettedTracks = await Tracking.searchTrackers(1)
    if (gettedTracks.error) {
      return res.status(gettedTracks.code).send({
        status: false,
        message: gettedTracks.error
      });
    }
    const {admin_notificaciones, club_notificaciones} = await webSocketJs.getNotifications()
    for (const track of gettedTracks) {
      if(track.bcerrado == false){
        const findedAlert = admin_notificaciones.find(alert => {
          if (alert.xmensaje == `AVISO: seguimiento #${track.cseguimientonotificacion} pendiente en esta notificación.` && alert.bactivo != 0) {
            return alert
          } 
        })
        if(!findedAlert) {
          sendTrackerAlerts(`AVISO: seguimiento #${track.cseguimientonotificacion} pendiente en esta notificación.`, 'admin/events/notifications/' + track.cnotificacion, 1, 2)          
        } else {
          const task = await recordTrackersInfo(track)
          allRecordTrackers.push({task: task, id: track.cseguimientonotificacion})
        }
      }
    }
  } catch(error) {

  }
}

const stopRecordTrack = async (id) => {
  
  const recordTrack = allRecordTrackers.find(record => record.id == id)
  if(recordTrack) {
    await recordTrack.task.stop()
    console.log('tarea cancelada para el seguimiento #' + id);
  }
}
const quitAlerts = async(xmensaje) => {
  const {admin_notificaciones, club_notificaciones} = await webSocketJs.getNotifications()
  const gettedNotifications = admin_notificaciones.filter(notification=>notification.xmensaje == xmensaje)
  const gettedNotificationsIds = gettedNotifications.map(notification=>notification.calerta)
  
  webSocketJs.editNotifications(gettedNotificationsIds)
}

const sendTrackerAlerts = async (msg, url, user, system) => {
  webSocketJs.addNotification(msg, url, user, system)
}

const recordTrackersInfo = async (item) => {
  console.log('begining alerts');
  const date = new Date()
  const hour = date.getHours()
  const day = date.getDate()
  console.log(item);
  let cronString = ''
  if(item.xintervalo == 'segundos') {
    cronString = `/${item.nalerta} * * * * * `
  } else if(item.xintervalo == 'minutos') {
    cronString = `*/${item.nalerta} * * * * `
  } else if(item.xintervalo == 'horas') {
    cronString = `0 0 0/${item.nalerta} 1/1 * ? *`
  } else if(item.xintervalo == 'días') {
    cronString = ` 0 0 ${hour} 1/${item.nalerta} * ? *`
  } else if(item.xintervalo == 'semanas') {
    cronString = ` 0 0 ${hour} 1/${(item.nalerta)*7} * ? *`
  } else if(item.xintervalo == 'meses') {
    cronString = ` 0 0 ${hour} ${day} 1/${item.nalerta} ? *`
  }
  const task = cron.schedule(cronString, () => {
    sendTrackerAlerts(`AVISO: seguimiento #${item.cseguimientonotificacion} pendiente en esta notificación.`, 'admin/events/notifications/' + item.cnotificacion, 1, 2)
    console.log(`tarea ejecutandose cada ${item.nalerta} ${item.xintervalo}`);
  });

  return task
}



const getAllTrackers = async (req, res) => {
  try {
    const trackers = await Tracking.searchTrackers(req.params.ccompania);
    if (trackers.error) {
      return res.status(trackers.code).send({
        status: false,
        message: trackers.error
      });
    }
    // const linkedServicios = await Servicio.linkServicios(data.cservicio, trackers.result.recordset[0].cplan);
    // if (linkedServicios.error) {
    //   return res.status(linkedServicios.code).send({
    //     status: false,
    //     message: linkedServicios.error
    //   });
    // }
    res.status(201).send({
      status: true, 
      message: 'Trackers Obtenidos',
      data: trackers
    });
    
  } catch (error) {
    
  }
}
const searchTrackerInfo = async (req, res) => {
  try {
    const tracker = await Tracking.searchPlanInfo(req.params.id);
    if (tracker.error) {
      return res.status(tracker.code).send({
        status: false,
        message: tracker.error
      });
    }
    // const planServices = await Servicio.searchPlanServices(plan.result.id);
    // if (planServices.error) {
    //   return res.status(planServices.code).send({
    //     status: false,
    //     message: planServices.error
    //   });
    // }
    // tracker.result.ctiposervicio = planServices
    res.status(201).send({
      status: true, 
      message: 'Informacion del Plan Obtenida',
      data: tracker
    });
    
  } catch (error) {
    
  }
}

export default {
  quitAlerts,
  getAllTrackers,
  searchTrackerInfo,
  stopRecordTrack,
  recordTrackersInfo,
  getAllTrackersInit
}