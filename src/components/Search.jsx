import React, { useEffect, useState } from "react";
import { RECIPE_URL, RECIPE_API_KEY } from "../constants/constant";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import RecipeDetails from "./RecipeDetails";
import styled from "styled-components";
import "../components/Styles/Search.css";

const SearchBox = styled.div`
  text-align: center;
`;

const Heading = styled.h3`
  color: #ff0000;
  font-style: italic;
`;

const RecipeBox = styled.div`
  border: none;
`;

const Search = () => {
  const [recipeData, setRecipeData] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const onSearch = (name) => {
    console.log(`Searching for: ${name}`);
  };

  const handleSearch = async () => {
    const name = document.getElementById("inputValue").value;
    onSearch(name);
    try {
      const fetchResponse = await fetch(
        `${RECIPE_URL}/complexSearch?apiKey=${RECIPE_API_KEY}&query=${name}`
      );

      if (!fetchResponse.ok) {
        throw new Error(`Error fetching from recipe API`);
      }

      const recipeInfo = await fetchResponse.json();
      setRecipeData(recipeInfo.results || []);
      console.log(recipeInfo);
    } catch (error) {
      console.error(`Error fetching from the API`, error);
    }
  };

  const handleRecipeClick = (id) => {
    setSelectedRecipe(id);
  };

  return (
    <Container className="container">
      <Row>
        <Col>
          <SearchBox>
            <Heading>Indulge In Global Gastronomic Taste</Heading>
            <input id="inputValue" placeholder="Type your ideal recipe..." />
            <button id="searchBTN" onClick={handleSearch}>
              SEARCH
            </button>
          </SearchBox>
        </Col>
      </Row>
      <Row>
        {recipeData.map((recipe) => (
          <Col key={recipe.id}>
            <Link to={`/recipe/${recipe.id}`} className="custom-link">
              <RecipeBox
                onClick={() => handleRecipeClick(recipe.id)}
                className="Recipebox"
              >
                <h3 id="boxHeader">{recipe.title}</h3>
                <img src={recipe.image} alt={recipe.title} />
              </RecipeBox>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Search;
