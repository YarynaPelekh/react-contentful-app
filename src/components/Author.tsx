import React, { useContext } from "react";

import { LibraryContext } from "./LibraryContext";
import "../index.css";

import { Person } from "../types/GeneralTypes";

export const Author: React.FunctionComponent<{ author: Person }> = ({
  author,
}) => {
  const books = useContext(LibraryContext);

  return (
    <div className="book_section">
      <div className="book">
        <div className="leftSection author">
          <p>{`${author.firstName} ${author.lastName}`}</p>
          <p>{author.pseudonym && `${author.pseudonym}`}</p>
        </div>
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
    </div>
  );
};
