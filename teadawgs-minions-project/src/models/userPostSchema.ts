import mongoose, { Schema, Document } from "mongoose";

interface IUserPost extends Document {
  title: string;
  link: string;
  userId: mongoose.Types.ObjectId;
  likes: number;
  dislikes: number;
  comments: number;
  instructions: string;
  ingredients: string;
  servings: string;
  createdAt: Date;
  updatedAt: Date;
  calories: number;
  sugar: number;
  cholesterol: number;
  fat: number;
}

const userPostSchema = new Schema<IUserPost>({
  title: { type: String, required: true },
  link: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  instructions: { type: String, required: true },
  ingredients: { type: String, required: true },
  servings: { type: String, default: "1" },
  calories: { type: Number, required: false },
  sugar: { type: Number, required: false },
  cholesterol: { type: Number, required: false },
  fat: { type: Number, required: false }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

export default mongoose.models.UserPost || mongoose.model<IUserPost>('UserPost', userPostSchema);