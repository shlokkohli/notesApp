import mongoose, { Document, Schema, Types } from "mongoose";

export interface INote extends Document {
    _id : Types.ObjectId,
    title?: string,
    content?: string,
    userId: mongoose.Types.ObjectId,
    createdAt: Date,
    updatedAt: Date
}

const NotesSchema = new Schema<INote>({
    title: {
        type: String,
        required: false,
    },
    content: {
        type: String,
        required: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }

}, {timestamps: true} )

// before saving note to the database, we add a "pre" that runs before something is saved to the db like a middleware

// the validate field is for valdiation in this
NotesSchema.pre("validate", function(next) {
    // this -> means the current note that is being saved or being interacted with
    if(!this.title && !this.content){
        this.invalidate("content", "Notes must have atleast a title or content")
        // writing "content" here means, if there is not title and content, invalidate that data and set the blame on content field, say like -> because of the content field, this error occured
    }
    next();
})

const NotesModel = ( mongoose.models.Note as mongoose.Model<INote> || mongoose.model<INote>("Note", NotesSchema) )

export default NotesModel;