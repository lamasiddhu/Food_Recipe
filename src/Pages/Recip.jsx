import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/Recip.css";

const API_URL = "http://localhost:5000/api/recipes/get-all-recipe";
const AI_API_URL = "http://localhost:5000/api/content/generate-content";
const DELETE_API_URL = "http://localhost:5000/api/recipes";

const ExploreRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [aiRecipe, setAiRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(API_URL);
      console.log("📦 API response:", response.data); // ✅ Added line

      const normalized = response.data.map((r) => ({
        ...r,
        _id: r._id || r.id,
      }));
      setRecipes(normalized);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;

    try {
      await axios.delete(`${DELETE_API_URL}/${id}`);
      setRecipes(recipes.filter((recipe) => recipe._id !== id));
      setSelectedRecipe(null);
    } catch (error) {
      console.error("Error deleting recipe:", error);
      alert("Failed to delete recipe.");
    }
  };

  const handleSearchWeb = async () => {
    if (!search.trim()) return;
    setLoading(true);
    setAiRecipe(null);

    try {
      const response = await axios.post(AI_API_URL, {
        prompt: `Give me the recipe of ${search}`,
      });
      setAiRecipe(response.data.generatedContent);
    } catch (error) {
      console.error("Error fetching AI recipe:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="explore-container">
      <h1 className="explore-title">Explore Recipes</h1>

      <div className="explore-actions">
        <input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearchWeb}>
          {loading ? "Searching..." : "Search Web"}
        </button>
        <button
          className="add-btn"
          onClick={() => navigate("/dashboard/addrecipetable")}
        >
          Add Recipe
        </button>
        <button className="back-btn" onClick={() => window.history.back()}>
          Back to Dashboard
        </button>
      </div>

      <div className="details-container">
        {aiRecipe ? (
          <div className="ai-recipe-container">
            <h2>AI Generated Recipe</h2>
            <button
              className="close-ai-recipe"
              onClick={() => setAiRecipe(null)}
            >
              Clear AI Recipe
            </button>
            <div className="ai-recipe-content">
              {aiRecipe
                ?.split("\n")
                .filter(
                  (line) =>
                    line.trim() !== "" &&
                    !line.includes("Tips and Variations:")
                )
                .map((line, index) => {
                  if (line.startsWith("**")) {
                    return (
                      <h3 key={index}>{line.replace(/\*\*/g, "").trim()}</h3>
                    );
                  } else if (line.startsWith("*")) {
                    return <li key={index}>{line.replace("*", "").trim()}</li>;
                  } else {
                    return <p key={index}>{line.trim()}</p>;
                  }
                })}
            </div>
          </div>
        ) : (
          <div className="recipe-grid">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe) => (
                <div
                  key={recipe._id}
                  className="recipe-card"
                  onClick={() => setSelectedRecipe(recipe)}
                >
                  <img
                    src={
                      recipe.image?.startsWith("http")
                        ? recipe.image
                        : `http://localhost:5000/uploads/${recipe.image}`
                    }
                    alt={recipe.name}
                    className="recipe-image"
                  />
                  <h3>{recipe.name}</h3>
                  <button className="view-button">View Recipe</button>
                </div>
              ))
            ) : (
              <p className="no-results">No recipes found.</p>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedRecipe && (
        <div className="modal-overlay" onClick={() => setSelectedRecipe(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-button"
              onClick={() => setSelectedRecipe(null)}
            >
              X
            </button>
            <h2>{selectedRecipe.name}</h2>
            <img
              src={
                selectedRecipe.image?.startsWith("http")
                  ? selectedRecipe.image
                  : `http://localhost:5000/uploads/${selectedRecipe.image}`
              }
              alt={selectedRecipe.name}
              className="recipe-image"
            />

            <h3>Ingredients</h3>
            <ul>
              {selectedRecipe.ingredients
                ?.split(",")
                .map((ingredient, index) => (
                  <li key={index}>{ingredient.trim()}</li>
                ))}
            </ul>

            <h3>Instructions</h3>
            <ul>
              {Array.isArray(selectedRecipe.description)
                ? selectedRecipe.description.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))
                : selectedRecipe.description
                    ?.replace(/^\[|\]$/g, "")
                    .replace(/"/g, "")
                    .split(",")
                    .map((step, index) => (
                      <li key={index}>{step.trim()}</li>
                    ))}
            </ul>

            <button
              className="delete-button"
              onClick={() => {
                const idToDelete = selectedRecipe?._id || selectedRecipe?.id;
                if (idToDelete) {
                  console.log("🧠 Deleting Recipe:", idToDelete);
                  handleDelete(idToDelete);
                } else {
                  alert("❌ Recipe ID not found. Cannot delete.");
                  console.error("❌ selectedRecipe:", selectedRecipe);
                }
              }}
            >
              Delete Recipe
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreRecipes;
