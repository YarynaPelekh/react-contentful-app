import React from "react";
import { Link } from "react-router-dom";

import "../index.css";

export const Navigation = () => {
  return (
    <nav className="box navigation">
      <ul>
        <Link to="/" className="link">
          Home
        </Link>
        <Link to="/books" className="link">
          Books
        </Link>
        <Link to="/authors" className="link">
          Authors
        </Link>
      </ul>
    </nav>
  );
};
