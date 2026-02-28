import express from 'express';
import { addNote, getNotes, deleteNote, updateNote } from '../controllers/noteController.js';
import userAuth from '../middleware/userAuth.js';

const noteRouter = express.Router();

noteRouter.post('/add', userAuth, addNote);
noteRouter.get('/get', userAuth, getNotes);
noteRouter.delete('/delete/:id', userAuth, deleteNote);
noteRouter.put('/update/:id', userAuth, updateNote);

export default noteRouter;