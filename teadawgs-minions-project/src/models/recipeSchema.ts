import mongoose, { Schema, Document, Model } from "mongoose";

export interface INutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface IRecipe extends Document {
  recipe: string;               
  instructions: string[];
  ingredients: string[];
  servings: number;
  nutrition: INutrition;
  image: string;
  userId?: string;
  visibility: 'public' | 'private';
  status: 'draft' | 'published';
}

const nutritionSchema = new Schema<INutrition>({
  calories: { type: Number, default: 0 },
  protein: { type: Number, default: 0 },
  carbs:   { type: Number, default: 0 },
  fat:     { type: Number, default: 0 },
});

const recipeSchema = new Schema<IRecipe>({
  recipe:     { type: String, required: true },
  instructions: [{ type: String, required: true }],
  ingredients:  [{ type: String, required: true }],
  servings:      { type: Number, default: 1 },
  nutrition:     { type: nutritionSchema, required: true },
  image:         { type: String, default: '' },
  userId:        { type: String, required: true },
  visibility:    { type: String, enum: ['public', 'private'], default: 'public' },
  status:        { type: String, enum: ['draft', 'published'], default: 'draft' },
}, { timestamps: true });

const Recipe: Model<IRecipe> = mongoose.models.Recipe || mongoose.model<IRecipe>("Recipe", recipeSchema);
export default Recipe;