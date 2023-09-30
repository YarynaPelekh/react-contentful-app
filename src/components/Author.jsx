import React from "react";

import "../index.css";

export const Author = ({ author, books }) => {
  return (
    <div className="book">
      <p className="author">{author}</p>
      {books && books.map((item) => <p className="title">{item}</p>)}
    </div>
  );
};
