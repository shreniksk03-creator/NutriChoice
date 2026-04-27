import React from 'react';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success mb-4 shadow-sm">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#">NutriChoice</a>
        <span className="navbar-text d-none d-sm-inline">
          Smart AI Nutrition Advisor
        </span>
      </div>
    </nav>
  );
}
