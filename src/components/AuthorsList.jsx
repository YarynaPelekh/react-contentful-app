import React, { useContext } from "react";

import "../index.css";
import { Author } from "./Author";
import { LibraryContext } from "./LibraryContext";

export const AuthorsList = () => {
  const books = useContext(LibraryContext);

  const authors = Object.values(books.items)
    .map((book) => {
      return {
        ...book.author,
        authorString: book.author.firstName + book.author.lastName,
      };
    })
    .reduce((accumulator, currentValue) => {
      if (
        accumulator &&
        !accumulator.find(
          (author) =>
            author.firstName === currentValue.firstName &&
            author.lastName === currentValue.lastName
        )
      )
        return [...accumulator, { ...currentValue }];
      return [...accumulator];
    }, []);

  // console.log("Authors list", authors);

  return (
    <div className="list-container">
      {authors &&
        authors.map((author) => (
          <Author author={author} key={author.firstName} />
        ))}
    </div>
  );
};
