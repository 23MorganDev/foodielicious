import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Container, Card, Alert, Button } from "react-bootstrap";
import configPath from "../Paths/configPaths";
import "../../components/Styles/RecipeDetail.css";

const RecipeDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [recipe, setRecipe] = useState(location.state?.recipe || null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!recipe) {
      const fetchRecipe = async () => {
        try {
          const recipeUrl = configPath.ENDPOINTS.RECIPEDETAIL(id);
          const token = localStorage.getItem("token");

          const response = await fetch(recipeUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch the recipe: ${response.statusText}`);
          }

          const data = await response.json();
          setRecipe(data);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };

      fetchRecipe();
    }
  }, [id, recipe]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className="detail-wrap">
      <Container className="recipe-detail-container mt-4">
        <Link to="/dashboard">
          <Button variant="secondary" className="mb-3">
            Back to Dashboard
          </Button>
        </Link>
        <h2 className="text-center mb-4">{recipe.title}</h2>

        {recipe ? (
          <Card className="recipe-card shadow-lg">
            {recipe && recipe.images && recipe.images.length > 0 && (
              <>
                <Card.Img
                  variant="top"
                  src={configPath.ENDPOINTS.IMAGE(recipe.images[0])}
                  alt={`${recipe.title} image`}
                  className="recipe-image"
                />
              </>
            )}


            <Card.Body>
              <Card.Title className="recipe-title text-center mb-4">
                Recipe Preparation
              </Card.Title>

              <Card.Text className="recipe-content">
                <div className="recipe-section">
                  <strong>Ingredients:</strong>
                  <ul className="ingredients-list">
                    {Array.isArray(recipe.ingredients) ? (
                      recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))
                    ) : (
                      <li>{recipe.ingredients}</li>
                    )}
                  </ul>
                </div>

                <div className="recipe-section">
                  <strong>Instructions:</strong>
                  <ul className="instructions-list">
                    {Array.isArray(recipe.instructions) ? (
                      recipe.instructions.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                      ))
                    ) : (
                      <li>{recipe.instructions}</li>
                    )}
                  </ul>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        ) : (
          <p>No recipe details available.</p>
        )}
      </Container>
    </div>
  );
};

export default RecipeDetail;
