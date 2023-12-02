import "./App.css";

import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { Header } from "./components/Header";
import { Navigation } from "./components/Navigation";
import { Home } from "./components/Home";
import { AuthorsList } from "./components/AuthorsList";
import { BooksList } from "./components/BooksList";

import { LibraryContext } from "./components/LibraryContext";

const API_Key = "lnflsi90e8vx";
const ENV = "master";
// const ENV = "dev";
// pseudonym
const query = `{
  bookCollection {
    items {
      sys {
        id
      }
      title
      author {
        ... on Persona {
          firstName
          lastName
          
          photo {
            ... on Asset {
              contentType
              fileName
              url
            }
          }
        }
      }
      genre
      photo {
        ... on Asset {
          contentType
          fileName
          url
        }
      }
    }
  }
}`;

const withOverrides = (config = {}) => {
  // /?overrides={'toggles':{'newView':true}}
  // /?overrides={"toggles":{"newView":true}}

  const overridesStr = new URLSearchParams(window.location.search).get(
    "overrides"
  );

  console.log("overridesStr", overridesStr);

  if (overridesStr) {
    console.log("decodeURI(overridesStr)", decodeURI(overridesStr));
    const overrides = JSON.parse(decodeURI(overridesStr));
    console.log("overrides", overrides);
    return Object.assign(config, overrides);
  }
  return config;
};

function App() {
  const [books, setBooks] = useState(null);

  useEffect(() => {
    const config = withOverrides();
    console.log("config", config);
    // window
    fetch(
      `https://graphql.contentful.com/content/v1/spaces/${API_Key}/environments/${ENV}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authenticate the request
          Authorization: "Bearer ER9ZMhqKlvvQPviTrsvEQw1_7GsZF32sUYivrOCFMkQ",
        },
        // send the GraphQL query
        body: JSON.stringify({ query }),
      }
    )
      .then((response) => response.json())
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }

        // rerender the entire component with new data
        setBooks(data.bookCollection);
      });
  }, []);

  if (!books) {
    return "Loading...";
  }
  // render the fetched Contentful data
  return (
    <div className="App">
      <Header />
      <Navigation />
      <LibraryContext.Provider value={books}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BooksList books={books} />} />
          <Route path="/authors" element={<AuthorsList authors={books} />} />
        </Routes>
      </LibraryContext.Provider>
    </div>
  );
}

export default App;
