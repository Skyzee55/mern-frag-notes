import express from "express";
import { createNotes , getAllNotes, getNotesById,deleteNotes,updateNotes} from "../controllers/notesController.js";

const router = express.Router()

router.post('/add', createNotes)
router.get('/all', getAllNotes)
router.get("/:id", getNotesById)
router.put("/:id", updateNotes)
router.delete("/:id", deleteNotes)


export default router