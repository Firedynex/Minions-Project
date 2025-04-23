import mongoose, {Schema, Document, Model} from "mongoose";

interface IComment extends Document {
    username: string,
    postId: string,
    content: string,
}

const commentSchema = new Schema<IComment>({
    username: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

const Comment: Model<IComment> = mongoose.models.Comment || mongoose.model<IComment>("Comment", commentSchema);
export default Comment;