import React, { ReactNode, useEffect, useState } from "react";

import * as contentful from "contentful";

import { BLOCKS, MARKS, Document } from "@contentful/rich-text-types";
import {
  RenderNode,
  documentToReactComponents,
} from "@contentful/rich-text-react-renderer";

export const Description: React.FunctionComponent<{
  id: string;
  handleClose: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}> = ({ id, handleClose }) => {
  const [descriptionData, setDescriptionData] = useState<Document>();
  const [isLoading, setIsLoading] = useState(false);

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
        console.log(
          "description",
          data.fields.description,
          "type",
          typeof data.fields.description
        );
        console.log("data", data.fields.description as Document);
        setDescriptionData(data.fields.description as Document);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      }); // asynchronous, returns promise
  };

  const Bold: React.FunctionComponent<{
    children: ReactNode;
  }> = ({ children }) => (
    <p
      style={{ color: "#009900", fontWeight: "1000" }}
    >{`bold: ${children}`}</p>
  );

  const Italic: React.FunctionComponent<{
    children: ReactNode;
  }> = ({ children }) => (
    <p style={{ color: "#000099", fontStyle: "italic" }}>
      {`italic-style: ${children}`}
    </p>
  );

  const Text: React.FunctionComponent<{ children: ReactNode }> = ({
    children,
  }) => (
    <p
      className="align-center "
      style={{ color: "#009999", textDecoration: "underline" }}
    >
      {children}
    </p>
  );

  const options = {
    renderMark: {
      [MARKS.BOLD]: (text: ReactNode) => <Bold>{text}</Bold>,
      [MARKS.ITALIC]: (text: ReactNode) => <Italic>{text}</Italic>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: ReactNode) => {
        console.log("node", node, "children", children);

        return <Text>{children}</Text>;
      },
    },
    renderText: (text: ReactNode) => text?.toString().replace("!", "?"),
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
          ? documentToReactComponents(descriptionData!, options)
          : "Loading..."}
      </div>
    </div>
  );
};
