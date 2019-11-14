# HOOKS Reactjs

## Intro

> Reactjs di 2019, maksimal dengan menggunakan Context Api dan High Order Component dalam pendistribusian data setiap component, serta 90% clean code.
> namun ini dalam bentuk OPTIONAL/pilihan.

info lebih lanjut:<br/>

- [reactjs](https://reactjs.org/docs/hooks-intro.html)<br/>
- [id.reactjs](https://id.reactjs.org/docs/hooks-intro.html)

## Study Kasus

### Book-App

```
branch: master (full)
branch: starter (basic)
branch: custom (next level)
        |--- useReducer
        |--- useEffect
        |--- saving data in localstorage
```

**reducer**<br/>

- bookReducer.js <br/>
  sebagai file yang menampung fungsi create dan delete data yg sebelumnya di file bookContext.js didalam folder context

```js
// add reducer
import uuid from "uuid/v1";

export const bookReducer = (state, action) => {
  switch (action.type) {
    // add
    case "ADD_BOOK":
      return [
        ...state,
        {
          title: action.book.title,
          author: action.book.author,
          id: uuid()
        }
      ];
    // delete
    case "REMOVE_BOOK":
      return state.filter(book => book.id !== action.id);
    default:
      return state;
  }
};
```

**Context**<br/>

- bookContext.js (before)

```js {4}
import React, { createContext, useState } from "react";

export const BookContext = createContext();

const BookContextProvider = props => {
  const [books, setBooks] = useState([
    { title: "teman hidup", author: "andaru intan", id: 1 },
    { title: "tuhan maha asyik", author: "sujiwo tejo", id: 2 }
  ]);
  const addBook = (title, author) => {
    setBooks([...books, { title, author, id: 4 }]);
  };
  const removeBook = id => {
    setBooks(books.filter(book => book.id !== id));
  };
  return (
    <BookContext.Provider value={{ books, addBook, removeBook }}>
      {props.children}
    </BookContext.Provider>
  );
};
export default BookContextProvider;
```

- bookContext.js (after)

```js
import React, { createContext, useReducer, useEffect } from "react";
import { bookReducer } from "../reducer/bookReducer";

export const BookContext = createContext();

const BookContextProvider = props => {
  // here we go to use dispatch from reducer
  const [books, dispatch] = useReducer(bookReducer, [], () => {
    // add saving data in our browser
    const localData = localStorage.getItem("books");
    return localData ? JSON.parse(localData) : [];
  });
  useEffect(() => {
    // render data to our localstorage
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);
  return (
    <BookContext.Provider value={{ books, dispatch }}>
      {props.children}
    </BookContext.Provider>
  );
};
export default BookContextProvider;
```

**add dispatch methode**<br/>

- NewBook.js

```js
const NewBook = () => {
  // here
  const { dispatch } = useContext(BookContext);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    // here
    dispatch({ type: "ADD_BOOK", book: { title, author } });
    setTitle("");
    setAuthor("");
  };
```

- bookDetails

```js
import React, { useContext } from "react";
import { BookContext } from "../context/bookContext";

// parsing props book
const BookDetails = ({ book }) => {
  // here
  const { dispatch } = useContext(BookContext);
  return (
    //here
    <li onClick={() => dispatch({ type: "REMOVE_BOOK", id: book.id })}>
      <div className="title">{book.title}</div>
      <div className="author">{book.author}</div>
    </li>
  );
};
export default BookDetails;
```

> merupakan contoh kecil penerapan Context API kepada components yg membuthkan dengan menggunakan HOOKS.
