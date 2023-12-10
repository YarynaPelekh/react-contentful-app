import React, { useContext, useState, useEffect } from "react";

import "../index.css";

// import { Book } from "./Book";
import { Book } from "./Book";
import { LibraryContext } from "./LibraryContext";

import * as contentful from "contentful";

const settingID = "7iNT7YaaVoZPbqx4MxBu0L";

const client = contentful.createClient({
  space: "lnflsi90e8vx", // "<space_id>",
  environment: "master", //"<environment_id>", // defaults to 'master' if not set
  accessToken: "ER9ZMhqKlvvQPviTrsvEQw1_7GsZF32sUYivrOCFMkQ", //"<content_delivery_api_key>",
});

export const BooksList = () => {
  const books = useContext(LibraryContext);
  const [showRelated, setShowRelated] = useState(false);

  const handleGetSettings = () => {
    // client.getEntry("<entry_id>"); // asynchronous, returns promise
    client
      .getEntry(settingID)
      .then((data) => {
        setShowRelated(!!data.fields.showRelated);
      })
      .catch((err) => {
        console.log(err);
      }); // asynchronous, returns promise
  };

  useEffect(() => {
    handleGetSettings();
  }, []);

  return (
    <div className="list-container">
      {books &&
        books.items.map((book) => (
          <Book
            author={book.author}
            title={book.title}
            photo={book.photo}
            genre={book.genre}
            id={book.sys.id}
            key={book.title}
            showRelated={showRelated}
          />
        ))}
    </div>
  );
};
