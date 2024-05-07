import express from 'express';
import dotenv from 'dotenv/config';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import bodyParser from 'body-parser';
import multer from 'multer';

import v1AuthRouter from './v1/authRoutes.js';
import v1MaestrosRouter from './v1/maestrosRoutes.js';
import v1planRouter from './v1/planRoutes.js';
import v1orderRouter from './v1/orderRoutes.js';
import v1ContractsRouter from './v1/contractsRoutes.js';
import v1ValrepRouter from './v1/valrepRoutes.js';
import v1UserRouter from './v1/userRoutes.js';
import v1ServicesRouter from './v1/serviciosRoutes.js';
import v1EventsRouter from './v1/eventsRoutes.js';


const { diskStorage } = multer;

const app = express(); 
dotenv;

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






const PORT = process.env.PORT || 3000; 

const DOCUMENTS_PATH = './public/documents';

app.get('/api/get-document/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(DOCUMENTS_PATH, filename);
  const absolutePath = path.resolve(filePath);

  fs.access(absolutePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.status(404).json({ error: 'Archivo no encontrado' });
    } else {
      res.sendFile(absolutePath);
    }
  });
});

app.listen(PORT, () => { 
  console.log(`\n API is listening on port ${PORT}`);
});

const document_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DOCUMENTS_PATH);
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
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

app.post('/api/upload/documents', document_upload.array('xdocumentos', 5), (req, res) => {
  const files = req.files;

  if (!files || files.length === 0) {
    const error = new Error('Please upload at least one file');
    error.httpStatusCode = 400;
    console.log(error.message)
    return res.status(400).json({ data: { status: false, code: 400, message: error.message } });
  }

//   const uploadedFiles = files.map(file => ({ filename: file.filename }));

  res.json({ data: { status: true, uploadedFile: files } });
});

app.post('/api/upload/image', document_upload.array('image'),(req, res , err) => {
  const files = req.file;
  if (!files || files.length === 0) {
    const error = new Error('Please upload at least one file');
    error.httpStatusCode = 400;

    return res.status(400).json({  status: false, code: 400, message: error.message  });
  }

  res.json({  status: true, uploadedFile: files  });
});