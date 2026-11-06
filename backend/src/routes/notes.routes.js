import express from 'express';
import { addNewNote, deleteNote, getAllNotes, showNote, updateNote } from '../controllers/notes.controllers.js';
import {isLogged} from '../middlewares/login.js';
import checkAuth from '../middlewares/checkAuth.js';

const router = express.Router();

router.get('/' , isLogged, getAllNotes)

router.get('/:id' , isLogged, checkAuth, showNote)

router.post('/', isLogged, addNewNote)

router.put('/:id', isLogged, checkAuth, updateNote)

router.delete('/:id' , isLogged, checkAuth, deleteNote)

export default router;