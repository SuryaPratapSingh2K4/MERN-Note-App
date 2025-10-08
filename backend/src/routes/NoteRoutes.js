import express from 'express'
import { addNotes, EditNotes } from '../controller/NoteController.js';
import { verifyToken } from '../authMiddleware.js';

const router = express.Router();

router.get('/',(req,res) => {

});

// router.get();

router.post('/addNotes',verifyToken,addNotes);

router.put('/:id',verifyToken,EditNotes);

// router.delete();


export default router;