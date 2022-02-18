import { Router } from "express";
import {Auth} from '../middlewares/auth';
import * as UserController from '../controllers/UserController';
import * as TransactionController from '../controllers/TransactionController';


const router = Router();

//UserController
router.post('/register', UserController.register);
router.post('/login', UserController.login);
//TransactionController
router.post('/transaction/', Auth.private, TransactionController.create);
router.get('/statement', Auth.private, TransactionController.getStatement);
router.get('/transactions/:date', Auth.private, TransactionController.getStatementForMonth);



export default router;