import React, { useContext } from "react";

import "../index.css";
import { Author } from "./Author";
import { LibraryContext } from "./LibraryContext";

import { Person } from "../types/GeneralTypes";
type PersonExtnded = Person & { authorString: string };

export const AuthorsList = () => {
  const books = useContext(LibraryContext);

  const authors: Array<PersonExtnded> = Object.values(books.items)
    .map((book) => {
      return {
        ...book.author,
        authorString: book.author.firstName + book.author.lastName,
      };
    })
    .reduce((accumulator: Array<PersonExtnded>, currentValue) => {
      if (
        accumulator &&
        !accumulator.find(
          (author: Person) =>
            author.firstName === currentValue.firstName &&
            author.lastName === currentValue.lastName
        )
      )
        return [...accumulator, { ...currentValue }];
      return [...accumulator];
    }, []);

  return (
    <div className="list-container">
      {authors &&
        authors.map((author) => (
          <Author author={author} key={author.firstName} />
        ))}
    </div>
  );
};
