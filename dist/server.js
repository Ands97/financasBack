"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongo_1 = require("./database/mongo");
const api_1 = __importDefault(require("./Routes/api"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
(0, mongo_1.mongoConnect)();
const server = (0, express_1.default)();
server.use((0, cors_1.default)());
//origin: 'https://yourmoneydotcom.herokuapp.com'
server.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
server.use(express_1.default.json());
server.use(express_1.default.urlencoded({ extended: true }));
server.use('/api', api_1.default);
server.listen(process.env.PORT);
