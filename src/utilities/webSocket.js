import { Server } from 'socket.io';
import { createServer } from 'node:http';
import Notification from './../db/Notification.js'

let server
let io
let connection = null
let notificaciones = []

const initState = async() => {
  // notificaciones = await Notification.getNotifications()
}

const defineConnection = () => {
  connection = io.on('connection', async (socket)=>{
    
      console.log('nuevas notificaciones');
      io.emit('notifications', notificaciones);
      socket.on('disconnect', ()=>{
        console.log('a user has disconnected');
      })
    socket.on('add_notifications', async ()=>{
      io.emit('notifications', notificaciones);
    })
    socket.on('edit_notifications', async (msg)=>{
      console.log(msg);
      notificaciones = msg
      io.emit('notifications', notificaciones);
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
const addNotification = (msg, url)=>{
  notificaciones.push({msg, url})
  console.log(notificaciones);
  io.emit('notifications', notificaciones);
  io.emit()
}



export default {
  generateWs,
  initState,
  defineConnection,
  addNotification
}