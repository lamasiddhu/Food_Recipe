import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Home.css';

const HomePage = () => {
  return (
    <div className="container">
      <header className="header">
        <div className="logo">Learn<span>TO</span>COOK</div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/recipes">Recipes</Link>
          <Link to="/login">Login</Link> 
        </nav>
      </header>

      <main>
        <h2 className="tagline">
          SIMPLE RECIPES MADE FOR <span>real, actual, everyday life.</span>
        </h2>
        <div className="recipe-gallery">
          {[1, 2, 3, 4].map((id) => (
            <div className="recipe-card" key={id}></div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
