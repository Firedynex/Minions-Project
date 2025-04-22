import mongoose, { Schema, Document } from "mongoose";


interface INutrition {
  calories: number;
  sugar: number;
  cholesterol: number;
  fat: number;
}

interface IUserPost extends Document {
  title: string;
  description: string;
  postid: string;
  content: string;
  link: string;
  userId: mongoose.Types.ObjectId;
  visibility?: boolean;
  likes: number;
  dislikes: number;
  comments: number;
  nutrition: INutrition;
  recipe?: string;
  instructions: string[];
  ingredients: string[];
  servings: number;
  createdAt: Date;
  updatedAt: Date;
}

const NutritionSchema = new Schema<INutrition>({
  calories: { type: Number, default: 0 },
  sugar: { type: Number, default: 0 },
  cholesterol: { type: Number, default: 0 },
  fat: { type: Number, default: 0 }
});

const userPostSchema = new Schema<IUserPost>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  postid: { type: String, required: true },
  content: { type: String },
  link: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  visibility: { type: Boolean, default: false },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  nutrition: { type: NutritionSchema, default: () => ({}) },
  recipe: { type: String },
  instructions: { type: [String], default: [] },
  ingredients: { type: [String], default: [] },
  servings: { type: Number, default: 1 }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Fix for circular reference
export default mongoose.models.UserPost || mongoose.model<IUserPost>('UserPost', userPostSchema);