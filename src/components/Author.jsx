import React, { useContext } from "react";

import { LibraryContext } from "./LibraryContext";
import "../index.css";

export const Author = ({ author }) => {
  const books = useContext(LibraryContext);

  return (
    <div className="book">
      <p className="leftSection author">{`${author.firstName} ${author.lastName}`}</p>
      <ul className="rightSection bookList">
        {Object.values(books.items)
          .filter((item) => item.author.firstName === author.firstName)
          .map((book) => (
            <li className="title" key={book.title}>
              {book.title}
            </li>
          ))}
      </ul>
    </div>
  );
};
