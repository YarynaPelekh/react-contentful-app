import "./App.css";

import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { Header } from "./components/Header";
import { Navigation } from "./components/Navigation";
import { AuthorsList } from "./components/AuthorsList";
import { BooksList } from "./components/BooksList";

const query = `{
  bookCollection{
    items {
      title
      authorString
      author{
        ... on Persona{
          firstName
          lastName
        }
      }
      
    }
  }
}`;

function App() {
  const [books, setBooks] = useState(null);

  useEffect(() => {
    // window
    fetch(`https://graphql.contentful.com/content/v1/spaces/lnflsi90e8vx/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authenticate the request
        Authorization: "Bearer ER9ZMhqKlvvQPviTrsvEQw1_7GsZF32sUYivrOCFMkQ",
      },
      // send the GraphQL query
      body: JSON.stringify({ query }),
    })
      .then((response) => response.json())
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }

        // rerender the entire component with new data
        setBooks(data.bookCollection);
        console.log(data.bookCollection);
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

      <Routes>
        <Route path="/books" element={<BooksList books={books} />} />
        <Route path="/authors" element={<AuthorsList authors={books} />} />
      </Routes>
    </div>
  );
}

export default App;
