import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, ListGroup, } from "react-bootstrap";
import Search from "../Search/Search";
import configPath from "../Paths/configPaths";
import "../../components/Styles/Dashboard.css";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(configPath.ENDPOINTS.ME, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error: ${errorText}`);
        }

        const data = await response.json();
        setUser(data.user);
        setRecipes(data.recipes);
      } catch (error) {
        console.error("Error fetching user data", error);
        setError("Failed to fetch user data");
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="dashboard-wrap">
      <Container className="dashboard-container">
        <div className="logout-container">
          <Link to="/">
            <Button variant="outline-danger" size="sm" className="logout-button">
              Logout
            </Button>
          </Link>
        </div>
        <Row>
          <Col md={4}>
            <Card className="user-card">
              <Card.Body>
                <Card.Title className="text-center">
                  Welcome, {user ? user.name : "Loading..."}
                </Card.Title>
                <Card.Text className="text-center">
                  <strong>Email:</strong> {user ? user.email : "Loading..."}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={8}>
            <div className="right-grid">
              <Search /> {/* Search component */}
              <Card className="recipes-card">
                <Card.Body>
                  <Card.Title className="text-center mb-4">My Recipes</Card.Title>
                  {recipes && recipes.length > 0 ? (
                    <ListGroup variant="flush">
                      {recipes.map((recipe) => (
                        <ListGroup.Item
                          key={recipe._id}
                          className="d-flex justify-content-between align-items-center"
                        >
                          <Link to={`/recipe/${recipe._id}`} className="recipe-link">
                            {recipe.title}
                          </Link>
                          <Link to={`/recipe/${recipe._id}`}>
                            <Button
                              variant="outline-info"
                              size="sm"
                              className="view-recipe-button"
                            >
                              View
                            </Button>
                          </Link>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  ) : (
                    <p className="text-center text-muted">
                      You haven't added any recipes yet.
                    </p>
                  )}
                  <div className="text-center">
                    <Link to="/add-recipe">
                      <Button variant="success" size="sm">
                        Add Your Custom Recipe
                      </Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>

  );
};

export default Dashboard;
