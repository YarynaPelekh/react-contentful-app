import React, { useState, useEffect, useContext } from "react";

import { LibraryContext } from "./LibraryContext";
import "../index.css";

export const RelatedBooks = ({ relatedIDs }) => {
  const books = useContext(LibraryContext);
  const [relatedBooks, setRelatedBooks] = useState([]);

  useEffect(() => {
    setRelatedBooks(
      books.items.filter((book) => relatedIDs.includes(book.sys.id))
    );
    // console.log(
    //   "related books",
    //   books.items.filter((book) => relatedIDs.includes(book.sys.id))
    // );
  }, [relatedIDs, books.items]);

  return (
    <>
      {relatedBooks.length > 0 && (
        <div className="related">
          <p className="relatedHeader">Related Books</p>
          <div className="booksRelated">
            {relatedBooks.map((book) => (
              <img
                src={book.photo.url}
                alt={`Book image ${book.title}`}
                className="smallBookImage"
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
