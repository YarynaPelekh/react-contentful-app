import React, { useContext } from "react";

import "../index.css";

import { Book } from "./Book";
import { LibraryContext } from "./LibraryContext";

export const BooksList = () => {
  const books = useContext(LibraryContext);
  return (
    <div className="list-container">
      {books &&
        books.items.map((book) => (
          <Book
            author={book.author}
            title={book.title}
            photo={book.photo}
            key={book.title}
          />
        ))}
    </div>
  );
};
