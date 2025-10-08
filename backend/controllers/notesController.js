import Note from "../models/Note.js"


export const createNotes = async (req, res) => {
    try {
        const {title, content} = req.body

        if(!title || !content) {
            return res.status(400).json({
                message : "Data Content Or Title is Required"
            })
        }

        const newNote = await Note.create({title, content})

        res.status(201).json({message : "Note created successfully", newNote})

    } catch (error) {
        console.log(`Error in createNotes : ${error}`)
        res.status(500).json({message : error.message})
    }
}


export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({createdAt : -1})
        res.status(200).json(notes)
    } catch (error) {
        console.log(`Error in getAllNotes : ${error}`)
        res.status(500).json({message : error.message})
    }
}


export const getNotesById = async (req, res) => {
    try {
        const {id} = req.params

        const note = await Note.findById(id)

        if(!note) {
            return res.status(404).json({message : "Note not found"})
        }

        res.status(200).json({message : "Note found by Id successfully", note})

    } catch (error) {
        console.log(`Error in getNotesById : ${error}`)
        res.status(500).json({message : error.message})
    }

}

export const updateNotes = async (req, res) => {
    try {
        const {id} = req.params
        const {title, content} = req.body

        const updatedNote= await Note.findByIdAndUpdate(id, {title, content}, {new : true})

        if(!updatedNote){
            return res.status(404).json({message : "Note not found"}) 
        }

        res.status(200).json({message : "Note updated successfully", updatedNote})

    } catch (error) {
        console.log(`Error in updateNotes : ${error}`)
        res.status(500).json({message : error.message})
    }
}

export const deleteNotes = async (req, res) => {
    try {
        const {id} = req.params
        const deletedNote = await Note.findByIdAndDelete(id)

        if(!deletedNote){ 
            return res.status(404).json({message : "Note not found"})
        }

        res.status(200).json({message : "Note deleted successfully", deletedNote})


    } catch (error) {
        console.log(`Error in deleteNotes : ${error}`)
        res.status(500).json({message : error.message})
    }
}