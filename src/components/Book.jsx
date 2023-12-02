/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect } from "react";

import * as contentful from "contentful";

import "../index.css";

import { Description } from "./Description";
import { RelatedBooks } from "./RelatedBooks";

export const Book = ({ author, title, photo, genre, id, showRelated }) => {
  const [showDescription, setShowDescription] = useState(false);
  const [relatedIDs, setRelatedIDs] = useState([]);

  const client = contentful.createClient({
    space: "lnflsi90e8vx", // "<space_id>",
    environment: "master", //"<environment_id>", // defaults to 'master' if not set
    accessToken: "ER9ZMhqKlvvQPviTrsvEQw1_7GsZF32sUYivrOCFMkQ", //"<content_delivery_api_key>",
  });

  useEffect(() => {
    const handleGetRelated = () => {
      client
        .getEntry(id)
        .then((data) => {
          setRelatedIDs(
            data.fields.relatedBooks?.map((book) => book.sys.id) || []
          );
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (showRelated) handleGetRelated();
  }, [showRelated, client, id]);

  return (
    <div className="book_section">
      <div
        className="book"
        onClick={() => {
          setShowDescription(true);
        }}
      >
        <div className="leftSection">
          <img
            src={photo.url}
            alt={`Book image ${title} of ${author.firstName} ${author.lastName} `}
            className="bookImage"
          />
        </div>
        <div className="rightSection">
          <p className="title">{title}</p>
          <p className="author">{`${author.firstName} ${author.lastName}`}</p>
          <p className="genre">{genre}</p>
        </div>
        {showDescription && (
          <Description
            id={id}
            handleClose={(e) => {
              e.stopPropagation();
              setShowDescription(false);
            }}
          />
        )}
      </div>
      {showRelated && <RelatedBooks relatedIDs={relatedIDs} />}
    </div>
  );
};
