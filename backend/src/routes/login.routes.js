import express from 'express';
import {checkLogin, loginUser, logoutUser, registerUser} from '../controllers/login.controller.js';
import { isNotLogged , isLogged } from '../middlewares/login.js';

const router = express.Router();

router.post('/', isNotLogged, loginUser)
router.get('/check', checkLogin)
router.post('/out', isLogged, logoutUser)
router.post('/new', isNotLogged, registerUser)

export default router;