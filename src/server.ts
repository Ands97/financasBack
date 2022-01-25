import express  from "express";
import dotenv from 'dotenv'
import {mongoConnect} from './database/mongo';
import ApiRoutes from './Routes/api'
import cors from 'cors';
import path from 'path';

dotenv.config()
mongoConnect();
const server = express();

server.use(cors({}));
server.use(express.static(path.join(__dirname, '../public')));
server.use(express.json())
server.use(express.urlencoded({extended: true}));
server.use('/api', ApiRoutes)

server.listen(process.env.PORT);