import React from "react";

import "../index.css";
import { Author } from "./Author";

export const AuthorsList = ({ authors }) => {
  return (
    <div className="books-container">
      {authors &&
        authors.items.map((author) => (
          <Author author={author.authorString} books={[]} />
        ))}
    </div>
  );
};
