import React, { useState } from "react";
import { Form, Container, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import configPath from "../Paths/configPaths";
import "../../components/Styles/AddRecipe.css";

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    selectedFiles.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        alert("Select a file that is below 5mb");
        return;
      }
    });
    setImages(selectedFiles); //store the images/files in state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //checking if images is an array

    if (!images || images.length === 0) {
      console.error("Images is not available");
      setError("Please select at least one image");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("ingredients", ingredients);
    formData.append("instructions", instructions);
    formData.append("user", localStorage.getItem("userId"));
    images.forEach((image) => formData.append("images", image));

    try {
      const response = await fetch(configPath.ENDPOINTS.ADDRECIPE,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not okay");
      }

      const data = await response.json();
      setSuccess("Recipe was added successfully");
      setTitle("");
      setIngredients("");
      setInstructions("");
      setImages([]);
    } catch (error) {
      console.error("Error adding recipe:", error);
      setError("Failed to add recipe, Please try again");
    }
  };

  return (
    <Container className="add-recipe-container mt-4">
      <Link to="/dashboard">
        <Button variant="secondary" className="mb-3 back-button">
          Back to Dashboard
        </Button>
      </Link>
      <h2 className="text-center mb-4">Add Your Recipe</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your Recipe Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="input-field"
          />
        </Form.Group>

        <Form.Group controlId="formIngredients">
          <Form.Label>Ingredients</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter Your Recipe's Ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
            className="input-field"
          />
        </Form.Group>

        <Form.Group controlId="formInstructions">
          <Form.Label>Instructions</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Enter Your Cooking Instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
            className="input-field"
          />
        </Form.Group>

        <Form.Group controlId="formImages">
          <Form.Label>Upload Images</Form.Label>
          <Form.Control
            type="file"
            multiple
            onChange={handleImageChange}
            className="input-field"
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3 submit-button">
          Add Recipe
        </Button>
      </Form>
    </Container>
  );
};

export default AddRecipe;
