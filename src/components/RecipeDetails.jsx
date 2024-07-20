import React, { useState, useEffect } from "react";
import { RECIPE_URL, RECIPE_API_KEY } from "../constants/constant";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; 
import { Container, Row, Col } from 'react-bootstrap';
import '../components/Styles/RecipeDetails.css';


const RecipeDetails = () => {
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const fetchResponse = await fetch(
          `${RECIPE_URL}/${id}/information?apiKey=${RECIPE_API_KEY}`
        );

        if (!fetchResponse.ok) {
          throw new Error(`Error fetching recipe details from API`);
        }

        const details = await fetchResponse.json();
        setRecipeDetails(details);
      } catch (error) {
        console.error(`Error fetching recipe details from the API`, error);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (!recipeDetails) {
    return <div>Loading Recipe Details...</div>;
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
        <h2 className="text-center mb-4"  style={{ color: 'yellow' }}>{recipeDetails.title}</h2>
          <img src={recipeDetails.image} alt={recipeDetails.title} className="img-fluid mb-4" />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <div>
            <h3 className="text-primary">Ingredients:</h3>
            <ul className="ingredients">
              {recipeDetails.extendedIngredients.map((ingredient, index) => (
                <li key={index}>{ingredient.original}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-primary">Instructions:</h3>
            <ul className="instructions">
              {recipeDetails.instructions.split('.').map((sentence, index) => (
                <li key={index}>{sentence.trim()}.</li>
              ))}
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  )
};

export default RecipeDetails;
  








