import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
import "../../components/Styles/ApiRecipe.css"

const ApiRecipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const storedRecipe = sessionStorage.getItem("selectedRecipe");
    if (storedRecipe) {
      setRecipe(JSON.parse(storedRecipe));
    }
  }, [id]);

  if (!recipe) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">Recipe Details could not be found. Please return to the search results page.</Alert>
        <Link to="/dashboard">
          <Button variant="secondary">Return to Dashbaord</Button>
        </Link>
      </Container>
    );
  }

  return (
    <div className="Api">
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2 className="text-center mb-4" style={{ color: 'orange' }}>{recipe.title}</h2>
          <img src={recipe.image} alt={recipe.title} className="img-fluid mb-4" />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <div>
            <h3 className="text-primary">Ingredients:</h3>
            <ul className="ingredients">
              {recipe.extendedIngredients && recipe.extendedIngredients.length > 0 ? (
                recipe.extendedIngredients.map((ingredient, index) => (
                  <li key={index}>{ingredient.original}</li>
                ))
              ) : (
                <li>No ingredients available.</li>
              )}
            </ul>
          </div>
          <div>
            <h3 className="text-primary">Instructions:</h3>
            <ul className="instructions">
              {recipe.instructions ? (
                recipe.instructions.split('.').map((sentence, index) => (
                  <li key={index}>{sentence.trim()}.</li>
                ))
              ) : (
                <li>No instructions available!</li>
              )}
            </ul>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col xs={12}>
          <Link to="/dashboard">
            <Button className="back-dashboard-button">Back to Dashboard</Button>
          </Link>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default ApiRecipe;
