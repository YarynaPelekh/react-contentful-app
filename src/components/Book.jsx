import React from "react";

import "../index.css";

export const Book = ({ author, title }) => {
  return (
    <div className="book">
      <p className="author">{author}</p>
      <p className="title">{title}</p>
    </div>
  );
};
