import { Router } from "express";
import * as UserController from '../controllers/UserController';
import * as ProductController from '../controllers/ProductController'
import {Auth} from '../middlewares/auth';
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './tmp');
    },
    filename: (req, file, cb)=>{
        cb(null, `${file.fieldname}${Date.now()}.jpg`)
    }
})

const upload = multer({
    storage
})

const router = Router();


router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/users', Auth.private, UserController.users);
router.post('/upload', upload.array('productImages', 3) ,ProductController.uploadFiles);

export default router;