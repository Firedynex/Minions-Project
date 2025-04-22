import mongoose, {Schema, Document, Model} from "mongoose";
import type {Date} from "mongoose";

interface IUserPost extends Document {
    _id: string;
    title: string;
    description: string;
    postid: string;
    content?: string;
    link?: string;
    userId: string;
    visibility: boolean;
    createdAt: Date;
    updatedAt: Date;
    likes: number;
    dislikes: number;
    comments: number;
    calories?: number;
    sugar?: number;
    cholesterol?: number;
    fat?: number;
    recipe?: string;
    instructions: string[];
    ingredients: string[];
    servings?: number;
  }
  
  const userPostSchema = new Schema<IUserPost>(
    {
      _id: { type: String},
      title: { type: String, required: true },
      description: { type: String, required: true },
      postid: { type: String, required: true },
      content: { type: String },
      link: { type: String },
      userId: { type: String, required: true },
      visibility: { type: Boolean, required: true },
      likes: { type: Number, default: 0 },
      dislikes: { type: Number, default: 0 },
      comments: { type: Number, default: 0 },
      calories: { type: Number },
      sugar: { type: Number },
      cholesterol: { type: Number },
      fat: { type: Number },
      recipe: { type: String },
      instructions: [{ type: String, required: true }],
      ingredients: [{ type: String, required: true }],
      servings: { type: Number },
    },
    { timestamps: true }
  );

const userPost: Model<IUserPost> = mongoose.models.UserPost || mongoose.model<IUserPost>("UserPost", userPostSchema);
export default userPost;