'use client';
import { useEffect, useState } from 'react';
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const session = await getSession();

type Post = {
  _id? : string,
  userId: string,
  title: string,
  link: string,
  sugar: number,
  cholesterol: number,
  fat: number,
  carbs: number
  instructions: string,
  ingredients: string,
  servings: string
}

export default function ModifyPost({editPost, post} : {editPost : boolean, post : Post}) {
  const [query, setQuery] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [ingredients, setIngredients] = useState<string>();
  const [instructions, setInstructions] = useState<string>();
  const [servings, setServing] = useState<string>("");
  const [cholesterol, setCholesterol] = useState<number>(0);
  const [sugar, setSugar] = useState<number>(0);
  const [carbs, setCarbs] = useState<number>(0);
  const [fat, setFat] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [badQuery, setBadQuery] = useState<boolean>(false);
  const router = useRouter();

  const userId = session?.user?.id;

  useEffect(() => {
    if (editPost) {
        setTitle(post.title);
        setIngredients(post.ingredients);
        setInstructions(post.instructions);
        setServing(post.servings);
        setCholesterol(post.cholesterol);
        setSugar(post.sugar);
        setCarbs(post.carbs);
        setFat(post.fat);
        setImageUrl(post.link);
      }
  },[editPost, post]);

  const apiKey = process.env.NEXT_PUBLIC_API_NINJAS_KEY;
  if (!apiKey) {
    console.error("Need api key!");
    return;
  }
  
  async function processRecipeQuery() {
    try {
      await fetch(
        `https://api.api-ninjas.com/v1/recipe?query=${encodeURIComponent(query)}`,
        { headers: { 'X-Api-Key': apiKey || '' } }
      ).then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const recipeData = data[0];
        if (!recipeData) {
          throw new Error("Invalid entry!");
        }
        setTitle(recipeData.title);
        setIngredients(recipeData.ingredients);
        setInstructions(recipeData.instructions);
        setServing(recipeData.servings);
      })
    } catch(_error) {
      setBadQuery(true);
    }
  }

  async function processNutritionQuery() {
    try {
        await fetch(`https://api.api-ninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`,
        {headers: { 'X-Api-Key': apiKey || '' } }
      ).then(response => {
        if (!response.ok) {
          throw new Error(`HTTP ERROR! status: ${response.status}`);
        }
        return response.json();
      }).then(data => {
        const nutritionData = data[0];
        if (!nutritionData) {
          throw new Error("Invalid entry!");
        }
        setCholesterol(nutritionData.cholesterol_mg);
        setSugar(nutritionData.sugar_g);
        setFat(nutritionData.fat_total_g);
        setCarbs(nutritionData.carbohydrates_total_g);
      })
    } catch(error) {
      setBadQuery(true);
    }
  }

  async function generateRecipe() {
    await processRecipeQuery();
    await processNutritionQuery();
  }

  async function updatePost() {
    try {
      const postData: Post = {
        userId: userId || "",
        title: title,
        link: imageUrl,
        sugar: sugar,
        cholesterol: cholesterol,
        fat: fat,
        carbs: carbs,
        instructions: instructions || "",
        ingredients: ingredients || "",
        servings: servings
      };
      const url = `http://localhost:3000/api/userPosts/${post._id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData)
      });
      if (!response.ok) {
        throw new Error("Error updating post!");
      }
    }catch(error) {
      alert(error);
    }
  }

  async function createPost() {
    try {
      const postData: Post = {
        userId: userId || "",
        title: title,
        link: imageUrl,
        sugar: sugar,
        cholesterol: cholesterol,
        fat: fat,
        carbs: carbs,
        instructions: instructions || "",
        ingredients: ingredients || "",
        servings: servings
      };

      const url = "http://localhost:3000/api/userPosts";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error creating post: ${errorMessage}`);
      }
      
    } catch (error) {
      alert(error);
    }
  }
  async function handleSubmit(e, type : "Update" | "Post") {
    e.preventDefault();
    if (type === "Post") {
      createPost();
    } else if (type === "Update") {
      updatePost();
    }

    setQuery("");
    setTitle("");
    setIngredients("");
    setInstructions("");
    setServing("");
    setCholesterol(0);
    setSugar(0);
    setCarbs(0);
    setFat(0);
    setImageUrl("");
    setBadQuery(false);
    router.push("/authenticated-view");
  }

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-400">Add New Recipe</h1>
          <p className="text-gray-400 mt-2">Create and share your culinary masterpiece</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-3">
            
                
            <form onSubmit={(e) => {
              if (editPost) {
                handleSubmit(e, "Update");
              } else {
                handleSubmit(e, "Post");
              }
            }}
              className="bg-gray-900 rounded-xl p-6 shadow-lg space-y-6">
              {/* Title Input with Loading Indicator */}
              <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter your query here"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full p-4 bg-gray-800 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  {badQuery && (
                    <div className="absolute right-4 top-4 text-gray-400 text-sm">
                      Please enter a valid query...
                    </div>
                  )}
                </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Recipe Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full p-4 bg-gray-800 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Ingredients */}
                <div>
                <label className="block text-gray-300 mb-2">
                  Ingredients
                </label>
                <textarea
                  placeholder="Enter ingredients, one per line"
                  value={ingredients?.split('|').join('\n')}
                  onChange={(e) => setIngredients(e.target.value.split('\n').join('|'))}
                  required
                  className="w-full p-4 bg-gray-800 rounded-lg h-32 text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                </div>

              {/* Instructions */}
              <div>
                <label className="block text-gray-300 mb-2">
                  Instructions
                </label>
                <textarea
                  placeholder="Enter instructions, one step per line"
                  value={instructions?.split(".").join("\n")}
                  onChange={(e) => setInstructions(e.target.value.split("\n").join("."))}
                  required
                  className="w-full p-4 bg-gray-800 rounded-lg h-48 text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>


              {/* Servings & Image */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">Servings</label>
                  <input
                    type="text"
                    placeholder="Servings"
                    value={servings}
                    onChange={(e) => setServing(e.target.value)}
                    className="w-full p-4 bg-gray-800 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Image URL</label>
                  <input
                    type="url"
                    placeholder="Paste image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    required
                    className="w-full p-4 bg-gray-800 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              {/* Nutrition Inputs */}
              <div>
                <h3 className="text-xl font-semibold text-red-300 mb-4">Nutrition Information</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Cholesterol (mg) </label>
                    <input
                      type="number"
                      placeholder="Enter Cholesterol"
                      value={cholesterol}
                      onChange={(e) => setCholesterol(Number(e.target.value))}
                      className="w-full p-4 bg-gray-800 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Sugar (g) </label>
                    <input
                      type="number"
                      placeholder="Enter Sugar"
                      value={sugar}
                      onChange={(e) => setSugar(Number(e.target.value))}
                      className="w-full p-4 bg-gray-800 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Carbs (g) </label>
                    <input
                      type="number"
                      placeholder="Enter Carbs"
                      value={carbs}
                      onChange={(e) => setCarbs(Number(e.target.value))}
                      className="w-full p-4 bg-gray-800 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Fat (g) </label>
                    <input
                      type="number"
                      placeholder="Enter Fat"
                      value={fat}
                      onChange={(e) => setFat(Number(e.target.value))}
                      className="w-full p-4 bg-gray-800 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                  type='button'
                  onClick={generateRecipe}
                  className="w-full py-4 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {'Generate Recipe'}
                </button>
              <button
                type="submit"
                className="w-full py-4 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editPost ? "Update Recipe" : "Save Recipe"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}