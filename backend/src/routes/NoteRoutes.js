import express from 'express'
import { addNotes, deleteNote, EditNotes, getAllNotes, getNotesById, PinnedNotes } from '../controller/NoteController.js';
import { verifyToken } from '../authMiddleware.js';

const router = express.Router();

router.get('/',verifyToken,getAllNotes);

router.get('/:id',verifyToken,getNotesById);

router.post('/addNotes',verifyToken,addNotes);

router.put('/:id',verifyToken,EditNotes);

router.delete('/:id',verifyToken,deleteNote);

router.patch('/:id',verifyToken,PinnedNotes)

export default router;