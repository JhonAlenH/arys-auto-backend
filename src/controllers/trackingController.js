import Tracking from '../db/Tracking.js';
import cron from 'node-cron'
import webSocketJs from './../utilities/webSocket.js';

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
      if(track.fseguimientonotificacion.toLocaleDateString() <= now.toLocaleDateString()){
        const findedAlert = admin_notificaciones.find(alert => {
          if (alert.xmensaje == `AVISO: seguimiento #${seguimiento.cseguimientonotificacion} pendiente en esta notificación.` && alert.bactivo != 0) {
            return alert
          } 
        })
        if(!findedAlert) {
          sendTrackerAlerts(track)
        }
      }
    }
  } catch(error) {

  }
}


const sendTrackerAlerts = async (seguimiento) => {
  webSocketJs.addNotification(`AVISO: seguimiento #${seguimiento.cseguimientonotificacion} pendiente en esta notificación.`,'admin/events/notifications/' + seguimiento.cnotificacion, 1, 2)
}

const getTrackersInfo = async (minutes, seguimiento) => {
  cron.schedule(`/${minutes} * * * * `, () => {
    sendTrackerAlerts(seguimiento)
    console.log(`running a task every ${minutes} minute/s`);
  });
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
  getAllTrackers,
  searchTrackerInfo,
  getTrackersInfo,
  getAllTrackersInit
}