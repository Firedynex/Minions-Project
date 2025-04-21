import mongoose, {Schema, Document, Model} from "mongoose";

interface IUser extends Document {
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default User;