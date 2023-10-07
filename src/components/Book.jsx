import React from "react";

import "../index.css";

export const Book = ({ author, title, photo }) => {
  return (
    <div className="book">
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
      </div>
    </div>
  );
};
