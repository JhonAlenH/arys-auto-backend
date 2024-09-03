import express from 'express';
import dotenv from 'dotenv/config';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import bodyParser from 'body-parser';
import multer from 'multer';
import sql from "mssql";
import { Server } from 'socket.io';
import { createServer } from 'node:http';

import v1AuthRouter from './v1/authRoutes.js';
import v1MaestrosRouter from './v1/maestrosRoutes.js';
import v1planRouter from './v1/planRoutes.js';
import v1orderRouter from './v1/orderRoutes.js';
import v1ContractsRouter from './v1/contractsRoutes.js';
import v1ValrepRouter from './v1/valrepRoutes.js';
import v1UserRouter from './v1/userRoutes.js';
import v1ServicesRouter from './v1/serviciosRoutes.js';
import v1EventsRouter from './v1/eventsRoutes.js';
import v1MonedasRouter from './v1/monedasRoutes.js';
import v1PaisesRouter from './v1/paisesRoutes.js';
import v1BancosRouter from './v1/bancosRoutes.js';
import v1ProveedoresRouter from './v1/proveedoresRoutes.js';
import v1PropietariosRouter from './v1/propietariosRoutes.js';
import v1ParentescosRouter from './v1/parentescosRoutes.js';
import v1EstadocivilRouter from './v1/estadocivilRoutes.js';
import v1MarcasRouter from './v1/marcasRoutes.js';
import v1VehiculosRouter from './v1/vehiculosRoutes.js';
import v1TipodocidentidadRouter from './v1/tipodocidentidadRoutes.js';
import v1CompaniasRouter from './v1/companiasRoutes.js';
import v1MetodopagoRouter from './v1/metodologiapagoRoutes.js';
import v1MenusRouter from './v1/menusRoutes.js';
import v1NotificationsRouter from './v1/notificationsRoutes.js';


import webSocketJs from './utilities/webSocket.js';
import trackingController from './controllers/trackingController.js';


const { diskStorage } = multer;

const app = express();
const {admin_notificaciones, club_notificaciones} = webSocketJs.getNotifications()
const {io,server} = webSocketJs.generateWs(app)
webSocketJs.defineConnection()

dotenv;

const sqlConfig = {
  user: process.env.USER_BD,
  password: process.env.PASSWORD_BD,
  server: process.env.SERVER_BD,
  database: process.env.NAME_BD,
  requestTimeout: 60000,
  options: {
      encrypt: true,
      trustServerCertificate: true
  }
}

app.use(cors({
  origin: '*',  // o especifica el dominio permitido
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204,
  credentials: true ,
  allowedHeaders: ['Content-Type', 'Authorization', 'x-client-channel'],
  
}));

app.use(cors());

app.use(express.json({ limit: '10mb' }));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use("/api/v1/auth", v1AuthRouter);
app.use("/api/v1/maestros", v1MaestrosRouter);
app.use("/api/v1/plan", v1planRouter);
app.use("/api/v1/orders", v1orderRouter);
app.use("/api/v1/contracts", v1ContractsRouter);
app.use("/api/v1/valrep", v1ValrepRouter);
app.use("/api/v1/user", v1UserRouter);
app.use("/api/v1/services", v1ServicesRouter);
app.use("/api/v1/events", v1EventsRouter);
app.use("/api/v1/monedas", v1MonedasRouter);
app.use("/api/v1/paises", v1PaisesRouter);
app.use("/api/v1/bancos", v1BancosRouter);
app.use("/api/v1/proveedores", v1ProveedoresRouter);
app.use("/api/v1/propietarios", v1PropietariosRouter);
app.use("/api/v1/parentescos", v1ParentescosRouter);
app.use("/api/v1/estadocivil", v1EstadocivilRouter);
app.use("/api/v1/marcas", v1MarcasRouter);
app.use("/api/v1/vehiculos", v1VehiculosRouter);
app.use("/api/v1/tipodocidentidad", v1TipodocidentidadRouter);
app.use("/api/v1/companias", v1CompaniasRouter);
app.use("/api/v1/metodologiapago", v1MetodopagoRouter);
app.use("/api/v1/menus", v1MenusRouter);
app.use("/api/v1/notificaciones", v1NotificationsRouter);

trackingController.getAllTrackersInit()

const PORT = process.env.PORT || 3000; 

const DOCUMENTS_PATH = './public/documents';
const DOCUMENTS_PATH2 = '/api/getDocument/';
const IMAGES_PATH = './public/images';
const IMAGES_PATH2 = '/api/getImage/';

app.get('/api/getDocument/:path/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(DOCUMENTS_PATH + '/' + req.params.path, filename);
  const absolutePath = path.resolve(filePath);

  fs.access(absolutePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.status(404).json({ error: 'Archivo no encontrado' });
    } else {
      res.sendFile(absolutePath);
    }
  });
});
app.post('/api/getDocument/:path/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(DOCUMENTS_PATH + '/' + req.params.path, filename);
  const absolutePath = path.resolve(filePath);
  const bName = path.basename(absolutePath)
  res.send({name: bName})
});

app.get('/api/getImage/:path/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(IMAGES_PATH + '/' + req.params.path, filename);
  const absolutePath = path.resolve(filePath);

  fs.access(absolutePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.status(404).json({ error: 'Archivo no encontrado' });
    } else {
      res.sendFile(absolutePath);
    }
  });
});



server.listen(PORT, () => { 
  console.log(`\n API is listening on port ${PORT}`);
});


const document_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const urls = req.url.split('/')
    let finalUrl = DOCUMENTS_PATH + '/' + urls[5] + '_' + urls[4]
    if (!fs.existsSync(finalUrl)){
      fs.mkdirSync(finalUrl);
    }
    cb(null, finalUrl);
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const image_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const urls = req.url.split('/')
    let finalUrl = IMAGES_PATH + '/' + urls[5] + '_' + urls[4]
    if (!fs.existsSync(finalUrl)){
      fs.mkdirSync(finalUrl);
    }
    cb(null, finalUrl);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

let image_upload = multer({
    storage: image_storage,
    limits: {
      fileSize: 35000000
    },
    fileFilter(req, file, cb) {
      cb(null, true);
    }
});
let document_upload = multer({
    storage: document_storage,
    limits: {
      fileSize: 35000000
    },
    fileFilter(req, file, cb) {
      cb(null, true);
    }
});

app.post('/api/upload/document/:id/:type', document_upload.array('file', 5), async (req, res) => {
  const files = req.body;

  if (!files || files.length === 0) {
    const error = new Error('Please upload at least one file');
    error.httpStatusCode = 400;
    console.log(error.message)
    return res.status(400).json({ data: { status: false, code: 400, message: error.message } });
  }
  const absolutePath = DOCUMENTS_PATH2 + files.url + '/' + files.fileName;

  let pool = await sql.connect(sqlConfig);
  if (req.params.type == 'user') {
    let result = await pool.request()
    .query(`SELECT * FROM SEUSUARIODOCUMENTOS where xrutadocumento = '${absolutePath}' AND cusuario = ${req.params.id}`)
    if(result.recordset.length > 0) {
      let result2 = await pool.request()
      // .query(`UPDATE SEUSUARIODOCUMENTOS SET xrutadocumento = '${absolutePath}', xtipodocumento = '${files.dbName}' where cusuario = ${req.params.id}`)
    } else {
      let result2 = await pool.request()
      .query(`INSERT INTO SEUSUARIODOCUMENTOS (xrutadocumento, xtipodocumento, cusuario) VALUES ('${absolutePath}','${files.dbName}', ${req.params.id})`)
    }
    await pool.close();
  }

//   const uploadedFiles = files.map(file => ({ filename: file.filename }));

  res.json({ data: { status: true, uploadedFile: files, url: absolutePath } });
});
app.post('/api/upload/documents/:id/:type', document_upload.array('files', 5), async (req, res) => {
  const files = req.body;
  const filesArray = JSON.parse(files.filesArray)
  

  if (!files || files.length === 0) {
    const error = new Error('Please upload at least one file');
    error.httpStatusCode = 400;
    console.log(error.message)
    return res.status(400).json({ data: { status: false, code: 400, message: error.message } });
  }
  for (const file of filesArray) {
    const absolutePath = DOCUMENTS_PATH2 + files.url + '/' + file;
    let pool = await sql.connect(sqlConfig);
    if (req.params.type == 'user') {
    let result = await pool.request()
    .query(`INSERT INTO SEUSUARIODOCUMENTOS (xrutadocumento, xtipodocumento, cusuario) VALUES ('${absolutePath}','${files.dbName}', ${req.params.id})`)
      await pool.close();
    }
  }

  res.json({ data: { status: true, uploadedFile: filesArray } });
});

app.post('/api/upload/image/:id/:type', image_upload.array('image'),async(req, res , err) => {
  const files = req.body;
  if (!files || files.length === 0) {
    const error = new Error('Please upload at least one file');
    error.httpStatusCode = 400;

    return res.status(400).json({  status: false, code: 400, message: error.message  });
  }
  const absolutePath = IMAGES_PATH2 + files.url + '/' + files.fileName;

  let pool = await sql.connect(sqlConfig);
  if (req.params.type == 'user') {
    let result = await pool.request()
    .query(`UPDATE SEUSUARIO SET ${req.body.dbName} = '${absolutePath}'  where cusuario = ${req.params.id}`)
    await pool.close();
  } else {
    
  }
  // console.log(object);
  res.json({  status: true, uploadedFile: files, url: absolutePath  });

});