import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { RECIPE_URL, RECIPE_API_KEY } from "../../constants/constant";
import "../../components/Styles/SearchResults.css";

const SearchResults = () => {
  const location = useLocation();
  const { recipes, term } = location.state || { recipes: [], term: "" };

  const handleRecipeClick = async (id) => {
    try {
      const response = await fetch(`${RECIPE_URL}/${id}/information?apiKey=${RECIPE_API_KEY}`);
      if (!response.ok) {
        throw new Error(`Error fetching recipe details: ${response.statusText}`);
      }
      const recipeDetails = await response.json();
      sessionStorage.setItem("selectedRecipe", JSON.stringify(recipeDetails));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="mt-5">
      <Link to="/dashboard">
        <Button variant="secondary" className="mb-3 back-button">
          Back to Dashboard
        </Button>
      </Link>
      <h1 className="text-center mb-4" style={{ color: 'orange' }}>
        Search Results for {term}
      </h1>
      <Row>
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <Col xs={12} sm={6} md={4} lg={3} key={recipe.id} className="mb-4">
              <Link
                to={`/api-recipe/${recipe.id}`}
                className="recipe-link"
                onClick={() => handleRecipeClick(recipe.id)}  // Pass only the id
              >
                <Card className="recipe-card">
                  <Card.Img variant="top" src={recipe.image} alt={recipe.title} />
                  <Card.Body>
                    <Card.Title className="text-center">{recipe.title}</Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))
        ) : (
          <Col>
            <p>No recipes found.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default SearchResults;
