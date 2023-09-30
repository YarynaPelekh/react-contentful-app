import React from "react";

import "../index.css";

import { Book } from "./Book";

export const BooksList = ({ books }) => {
  return (
    <div className="books-container">
      {books &&
        books.items.map((book) => (
          <Book author={book.authorString} title={book.title} />
        ))}
    </div>
  );
};
