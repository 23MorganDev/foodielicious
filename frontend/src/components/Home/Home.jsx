import React from "react";
import { Link } from "react-router-dom";
import "../../components/Styles/Home.css";

const Home = () => {
  return (
    <div className="Wrap">
      <div className="nav-logo">Foodie</div>
      <div className="main-content">
        <h1>Discover Your Next Culinary Adventure!</h1>
        <p>
          Unlock a world of flavors with our recipe finder! Whether you're a seasoned chef or a kitchen novice, we’ve got you covered. Search through thousands of delicious recipes tailored to your taste and dietary needs. From quick weeknight dinners to indulgent desserts, find the inspiration you need to whip up mouthwatering meals in no time. Get ready to explore, create, and savor every bite!
        </p>
      </div>
      <nav className="nav">
        <div className="nav-links">
          <Link to="/login" className="button sign-in">LOGIN</Link>
          <Link to="/register" className="button register">REGISTER</Link>
        </div>
      </nav>
    </div>
  );
};

export default Home;
