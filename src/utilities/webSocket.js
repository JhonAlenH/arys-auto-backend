import { Server } from 'socket.io';
import { createServer } from 'node:http';
import Notification from './../db/Notification.js'

let server
let io
let connection = null
let admin_notificaciones = []
let club_notificaciones = []
let x = 0

const getNotifications = async() => {
  const response = await Notification.getAdminNotifications()
  if(response) {
    admin_notificaciones = response
  }
  const response2 = await Notification.getClubNotifications()
  if(response2) {
    club_notificaciones = response2
  }
}

const defineConnection = () => {
  connection = io.on('connection', async (socket)=>{
      if(x<=0) {
        await getNotifications()
        x++
      }
      console.log('aqui hay ',await admin_notificaciones.length);

      io.emit('notifications_admin', await admin_notificaciones);
      io.emit('notifications_club', await club_notificaciones);

      socket.on('disconnect', ()=>{
        console.log('a user has disconnected');
      })
    socket.on('add_notifications_admin', async ()=>{
      io.emit('notifications_admin', await admin_notificaciones);
    })
    socket.on('edit_notifications_admin', async (msg)=>{
      const response = await Notification.editNotification(msg.calerta)
      if(response.rowsAffected >= 1) {
        const notiFindedIndex = admin_notificaciones.findIndex(item=> item.calerta == msg.calerta)
        admin_notificaciones.splice(notiFindedIndex, 1)
        io.emit('notifications_admin', admin_notificaciones);
      }
    })
  })
}

const generateWs = (app) => {
  server = createServer(app)
  io = new Server(server,{
    cors: {
      origin: "*"
    }
  })
  return {io, server}
}
const addNotification = async (xmensaje, xurl, cusuario, ctipo_sistema)=>{
  let date = new Date()
  date = date.toISOString()
  let data = {xmensaje: xmensaje, xurl: xurl, cusuario: cusuario, ctipo_sistema: ctipo_sistema, date: date}

  const response = await Notification.addNotification(data)
  if(await response) {
    data.calerta = response.recordset[0].calerta
    admin_notificaciones.push(data)
  }
  io.emit('notifications', admin_notificaciones);
  io.emit()
}



export default {
  generateWs,
  getNotifications,
  defineConnection,
  addNotification
}