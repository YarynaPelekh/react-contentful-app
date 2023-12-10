/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect } from "react";

import * as contentful from "contentful";

import "../index.css";

import { Description } from "./Description";
import { RelatedBooks } from "./RelatedBooks";

import { Person, BookType, Photo } from "../types/GeneralTypes";

const client = contentful.createClient({
  space: "lnflsi90e8vx", // "<space_id>",
  environment: "master", //"<environment_id>", // defaults to 'master' if not set
  accessToken: "ER9ZMhqKlvvQPviTrsvEQw1_7GsZF32sUYivrOCFMkQ", //"<content_delivery_api_key>",
});

export const Book: React.FunctionComponent<{
  author: Person;
  title: string;
  photo: Photo;
  genre: string;
  id: string;
  showRelated: boolean;
}> = ({ author, title, photo, genre, id, showRelated }) => {
  const [showDescription, setShowDescription] = useState(false);
  const [relatedIDs, setRelatedIDs] = useState<string[]>([]);

  useEffect(() => {
    function convertData(data: any): BookType[] {
      const bookArray: BookType[] = data.map((item: any) => {
        return {
          title: item,
          author: item,
          sys: { id: item.sys.id },
        };
      });
      return bookArray as BookType[];
    }

    const handleGetRelated = () => {
      client
        .getEntry(id)
        .then((data) => {
          const dataArr: BookType[] = convertData(data.fields.relatedBooks);

          setRelatedIDs(dataArr.map((book: BookType) => book.sys.id));
        })
        .catch((err) => {
          console.log(err);
        });
    };

    if (showRelated) handleGetRelated();
  }, [showRelated, id]);

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
            handleClose={(event: React.MouseEvent<HTMLElement, MouseEvent>) => {
              event.stopPropagation();
              setShowDescription(false);
            }}
          />
        )}
      </div>
      {showRelated && <RelatedBooks relatedIDs={relatedIDs} />}
    </div>
  );
};
