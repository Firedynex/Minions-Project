import mongoose, {Schema, Document, Model} from "mongoose";

interface IRecipe extends Document {
    title: string,
    ingredients: string,
    servings: string,
    instructions: string
    userId: string
}

const recipeSchema = new Schema<IRecipe>({
    title: {
        type: String,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
    servings: {
        type: String,
        required: false
    },
    instructions: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
});

const Recipe: Model<IRecipe> = mongoose.models.Recipe || mongoose.model<IRecipe>("Recipe", recipeSchema);
export default Recipe;