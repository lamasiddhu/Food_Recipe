import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Navigation
import axios from "axios";
import "../Styles/AddRecipeTable.css";

const API_URL = "http://localhost:5000/api/new-recipes";

const AddRecipeTable = () => {
  const [recipes, setRecipes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    ingredients: "",
    category: "",
    description: "",
    image: null,
  });

  const navigate = useNavigate(); // ✅ Used to navigate

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(`${API_URL}/get-all-recipe`);
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddRecipe = async () => {
    try {
      const newForm = new FormData();
      newForm.append("name", formData.name);
      newForm.append("ingredients", formData.ingredients);
      newForm.append("category", formData.category);
      newForm.append("description", formData.description);
      if (formData.image) newForm.append("image", formData.image);

      const response = await axios.post(`${API_URL}/add-recipe`, newForm, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setRecipes([...recipes, response.data]);
      setShowForm(false);
      setFormData({
        name: "",
        ingredients: "",
        category: "",
        description: "",
        image: null,
      });
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  return (
    <div className="add-recipe-container">
      {/* ✅ Corrected navigation route */}
      <div className="back-button" onClick={() => navigate("/recipe")}>
        ← Back to Explore Recipes
      </div>

      <h2>Add Recipe Table</h2>
      <button className="add-recipe-btn" onClick={() => setShowForm(true)}>
        + Add Recipe
      </button>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-form">
            <button className="close-button" onClick={() => setShowForm(false)}>
              X
            </button>
            <h3>Add New Recipe</h3>
            <input
              type="text"
              name="name"
              placeholder="Recipe Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <textarea
              name="ingredients"
              placeholder="Ingredients (comma-separated)"
              value={formData.ingredients}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="category"
              placeholder="Category (e.g., Salad, Dessert)"
              value={formData.category}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Instructions"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
            <button className="submit-button" onClick={handleAddRecipe}>
              Submit Recipe
            </button>
          </div>
        </div>
      )}

      <table className="recipe-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Ingredients</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe) => (
            <tr key={recipe.id || recipe._id}>
              <td>{recipe.name}</td>
              <td>{recipe.ingredients}</td>
              <td>
                {Array.isArray(recipe.description)
                  ? recipe.description.join(", ")
                  : recipe.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddRecipeTable;
