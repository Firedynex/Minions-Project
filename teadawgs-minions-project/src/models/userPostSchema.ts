import mongoose, {Schema, Document, Model} from "mongoose";
import type {Date} from "mongoose";

interface IUserPost extends Document {
    title: string,
    description: string,
    content: string,
    link: string,
    userId: string,
    createdAt: Date,
    updatedAt: Date,
    likes: number,
    dislikes: number,
    comments: number,
    calories: number,
    sugar: number,
    cholesterol: number,
    fat: number,
    recipe: string,
    instructions: string[],
    ingredients: string[],
    servings: number,
}

const userPostSchema = new Schema<IUserPost>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: false
    },
    link: {
        type: String,
        required: false
    },
    userId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    comments: {
        type: Number,
        default: 0
    },
    calories: {
        type: Number
    },
    sugar: {
        type: Number
    },
    cholesterol: {
        type: Number
    },
    fat: {
        type: Number
    },
    recipe: {
        type: String
    },
    instructions: [{type: String, required: true}],
    ingredients: [{type: String, required: true}],
    servings: {
        type: Number
    }
    
});

const userPost: Model<IUserPost> = mongoose.models.UserPost || mongoose.model<IUserPost>("UserPost", userPostSchema);
export default userPost;