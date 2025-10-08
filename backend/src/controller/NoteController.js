    import Note from "../model/NoteModel.js";

    export async function getAllNotes(req, res) {
    const user = req.user;
    try {
        const data = await Note.find({ userId: user._id }).sort({ createdAt: -1 });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Error in fetching the Note" });
    }
    }

    export async function getNotesById(req, res) {
    const user = req.user;
    const noteId = req.params.id;
    try {
        const data = await Note.findById({ _id: noteId, userId: user.id });
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ message: "Error in fetching the Note" });
    }
    }

    export async function addNotes(req, res) {
    const { title, content, tags } = req.body;
    const user = req.user;
    if (!title || !content) {
        return res
        .status(400)
        .json({ message: "All things need to be filled before uploading" });
    }
    try {
        const newNote = new Note({
        title,
        content,
        tags: tags || [],
        userId: user._id,
        });
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (error) {
        res.status(500).json({ message: "Error in uploading the postWorkOut" });
    }
    }

    export async function EditNotes(req, res) {
    const { title, content, tags } = req.body;
    const user = req.user;
    const noteId = req.params.id;
    if (!title && !content && !tags) {
        return res
        .status(400)
        .json({ message: "At least one field is required to update" });
    }

    try {
        const data = await Note.findOne({ _id: noteId, userId: user._id });
        if (!data)
        return res
            .status(404)
            .json({ message: "Note not found or not authorized" });
        const updateNote = await Note.findByIdAndUpdate(
        req.params.id,
        {
            title,
            content,
            tags,
        },
        {
            new: true,
        }
        );
        res.status(201).json(updateNote);
    } catch (error) {
        res.status(500).json({ message: "Error in updating the Notes" });
    }
    }

    export async function deleteNote(req, res) {
    const user = req.user;
    const noteId = req.params.id;
    try {
        const data = await Note.findByIdAndDelete({ _id: noteId, userId: user.id });
        if (!data) return res.status(404).json({ message: "404 not Found" });
        res.status(201).json("Note deleted successfully");
    } catch (error) {
        res.status(500).json({ message: "Error in deleteing the Notes" });
    }
    }
