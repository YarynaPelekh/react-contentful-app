import "./App.css";

import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Book } from "./components/Book";

// const query = `
// {
//   pageCollection {
//     items {
//       title
//       logo {
//         url
//       }
//     }
//   }
// }
// `;
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
      <div className="books-container">
        {books &&
          books.items.map((book) => (
            <Book author={book.authorString} title={book.title} />
          ))}
      </div>
    </div>
  );
}

export default App;
