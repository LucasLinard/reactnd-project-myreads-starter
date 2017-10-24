import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Link, Route } from 'react-router-dom'
import './App.css'
import Bookshelf from "./Bookshelf";
import SearchBar from "./SearchBar";

class BooksApp extends React.Component {
state = {
    books: []
}

componentDidMount() {
    BooksAPI.getAll().then((books) => {
        this.setState({ books })
})
}
moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
    this.setState((state) => ({
        books: state.books.filter((b) => b.id !== book.id)
    }))
    book.shelf = shelf;
    this.setState((state) => ({
        books: state.books.concat( [ book ])
    }))
}

render() {
return (
    <div className="app">
        <Route exact path='/search' render={() => (
            <div className="search-books">
                <SearchBar
                    shelf={"none"}
                    onUpdateShelf={this.moveBook}
                    myBooks={this.state.books}
                />
            </div>
        )}/>
        <Route exact path={'/'} render={() => (
            <div className="list-books">
                 <Bookshelf
                     onUpdateShelf={this.moveBook}
                     shelf={"currentlyReading"}
                     title={"Currently Reading"}
                     books={this.state.books.filter((book) => (book.shelf === "currentlyReading") )}
                />
                <Bookshelf
                    onUpdateShelf={this.moveBook}
                    shelf={"wantToRead"}
                    title={"Want to Read"}
                    books={this.state.books.filter((book) => (book.shelf === "wantToRead") )}
                />
                <Bookshelf
                    onUpdateShelf={this.moveBook}
                    shelf={"read"}
                    title={"Read"}
                    books={this.state.books.filter((book) => (book.shelf === "read") )}
                />
                <div className="open-search">
                    <Link to='/search'>Add a book</Link>
                </div>
            </div>
        )}/>
    </div>
  )
}
}
export default BooksApp
