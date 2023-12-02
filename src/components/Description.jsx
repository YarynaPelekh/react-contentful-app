import React, { useEffect, useState } from "react";

import * as contentful from "contentful";

import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export const Description = ({ id, handleClose }) => {
  const [descriptionData, setDescriptionData] = useState();
  const [isLoading, setIsLoading] = useState();

  const client = contentful.createClient({
    space: "lnflsi90e8vx", // "<space_id>",
    environment: "master", //"<environment_id>", // defaults to 'master' if not set
    accessToken: "ER9ZMhqKlvvQPviTrsvEQw1_7GsZF32sUYivrOCFMkQ", //"<content_delivery_api_key>",
  });

  const handleGetRichText = () => {
    // client.getEntry("<entry_id>"); // asynchronous, returns promise
    client
      .getEntry(id)
      .then((data) => {
        setDescriptionData(data.fields.description);
        // console.log("description", data.fields.description);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      }); // asynchronous, returns promise
  };

  const Bold = ({ children }) => (
    <p
      style={{ color: "#009900", fontWeight: "1000" }}
    >{`bold: ${children}`}</p>
  );

  const Italic = ({ children }) => (
    <p style={{ color: "#000099", fontStyle: "italic" }}>
      {`italic-style: ${children}`}
    </p>
  );

  const Text = ({ children }) => (
    <p
      className="align-center "
      style={{ color: "#990000", textDecoration: "underline" }}
    >
      {children}
    </p>
  );

  const options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
      [MARKS.ITALIC]: (text) => <Italic>{text}</Italic>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    },
    renderText: (text) => text.replace("!", "?"),
  };

  useEffect(() => {
    setIsLoading(true);
    handleGetRichText();
  }, []);

  return (
    <div className="modal active" onClick={handleClose}>
      <div className="modal content">
        <p className="description">Book Description</p>
        {!isLoading
          ? documentToReactComponents(descriptionData, options)
          : // documentToReactComponents(descriptionData)
            "Loading..."}
      </div>
    </div>
  );
};
