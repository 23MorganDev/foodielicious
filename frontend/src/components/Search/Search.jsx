import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "../../components/Styles/Search.css"

const Search = () => {
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Accessing environment variables
  const RECIPE_URL = import.meta.env.VITE_API_URL;
  const RECIPE_API_KEY = import.meta.env.VITE_API_KEY;

  const handleSearch = async () => {
    const name = inputRef.current.value;
    try {
      const fetchResponse = await fetch(
        `${RECIPE_URL}/complexSearch?apiKey=${RECIPE_API_KEY}&query=${name}`
      );
      // Debugging: Log the URL being fetched
      console.log(`Fetching URL: ${RECIPE_URL}/complexSearch?apiKey=${RECIPE_API_KEY}&query=${name}`);

      // Check the response content type
      const contentType = fetchResponse.headers.get("content-type");
      if (contentType && contentType.includes("text/html")) {
        console.error("Received HTML response instead of JSON.");
      }

      // Check if the fetch was successful
      if (!fetchResponse.ok) {
        console.error(`HTTP error! status: ${fetchResponse.status}`);
        throw new Error(`Error fetching from recipe API: ${fetchResponse.status}`);
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
