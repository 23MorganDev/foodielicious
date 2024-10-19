import React, { useRef } from "react";
import { RECIPE_URL, RECIPE_API_KEY } from "../../constants/constant";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "../../components/Styles/Search.css"

const Search = () => {
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    const name = inputRef.current.value;
    try {
      const fetchResponse = await fetch(
        `${RECIPE_URL}/complexSearch?apiKey=${RECIPE_API_KEY}&query=${name}`
      );

      if (!fetchResponse.ok) {
        throw new Error(`Error fetching from recipe API`);
      }

      const recipeInfo = await fetchResponse.json();

      navigate("/search-results", { state: { recipes: recipeInfo.results || [], term: name } });
    } catch (error) {
      console.error(`Error fetching from the API`, error);
    }
  };

  return (
    <Container className="search-box">
      <Row>
        <Col>
          <div className="search-container">
            <h1>Try searching for world favourite tastes!</h1>
            <input ref={inputRef} placeholder="Type your ideal recipe..." />
            <button id="searchBTN" onClick={handleSearch}>
              SEARCH
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Search;