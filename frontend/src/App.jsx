import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "./components/Search/Search";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import AddRecipe from "./components/AddRecipe/AddRecipe";
import RecipeDetail from "./components/RecipeDetail/RecipeDetail";
import SearchResults from "./components/SearchResults/SearchResults";
import ApiRecipe from "./components/ApiRecipe/ApiRecipe";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/api-recipe/:id" element={<ApiRecipe />} />
      </Routes>
    </Router>
  );
};

export default App;
