import "./App.css";

import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { Header } from "./components/Header";
import { Navigation } from "./components/Navigation";
import { Home } from "./components/Home";
import { AuthorsList } from "./components/AuthorsList";
import { BooksList } from "./components/BooksList";

import { LibraryContext } from "./components/LibraryContext";

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
// const query = `{
//   bookCollection{
//     items {
//       title
//       author{
//         ... on Persona{
//           firstName
//           lastName
//         }
//       }

//     }
//   }
// }`;

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
