import mongoose, { Document, Schema } from "mongoose";

// extends document gives me type safety for things like   -> _id, .save()    later in the code
export interface IUser extends Document {
    name: string,
    email: string,
    password: string
}


// writing <IUser> means it gives type safety to the UserSchema, that's it nothing else
const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please use a valid email address"]
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})


// mongoose.models -> access already defined models
// mongoose.model() -> creates a model

const UserModel = (mongoose.models.User as mongoose.Model<IUser> || mongoose.model<IUser>("User", UserSchema) );

export default UserModel;

// mongoose.model<IUser>("User", UserSchema)  -> this line means create a user model

// mongoose.models.User   -> this line searches for a model if already present, if it is there, it returns that, and if it is present

// this line is like saying mongoose.Model<IUser>    -> If you found it, trust me — this model follows the IUser interface