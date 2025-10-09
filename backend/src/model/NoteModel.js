    import mongoose from "mongoose";

    const NoteSchema = mongoose.Schema(
    {
        title: {
        type: String,
        required: true,
        },
        content: {
        type: String,
        required: true,
        },
        tags: {
        type: [String],
        default: [],
        },
        isPinned: {
        type: Boolean,
        default: false,
        },
        userId: {
        type: String,
        required: true,
        },
        createdOn: {
        type: Date,
        default: Date.now,
        },
    },
    {
        timestamps: true,
    }
    );

    const Note = mongoose.model("notes", NoteSchema);
    export default Note;
