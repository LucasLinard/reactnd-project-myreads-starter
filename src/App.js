import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Link, Route } from 'react-router-dom'
import './App.css'
import Bookshelf from "./Bookshelf";

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
    console.log(book, shelf)
    BooksAPI.update(book, shelf)
}
render() {
return (
    <div className="app">
        <Route exact path='/search' render={() => (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to={"/"}>Close</Link>
                        <div className="search-books-input-wrapper">
                            <input type="text" placeholder="Search by title or author"/>
                        </div>
                    </div>
                    <div className="search-books-results">
                        <Bookshelf
                            onUpdateShelf={this.moveBook}
                            title={"Search"}
                            books={this.state.books}
                      />
                </div>
            </div>
        )}/>
        <Route exact path={'/'} render={() => (
            <div className="list-books">
                 <Bookshelf
                     onUpdateShelf={this.moveBook}
                     shelf={"currentlyReading"}
                     title={"Currently Reading"}
                     books={this.state.books}
                />
                <Bookshelf
                    onUpdateShelf={this.moveBook}
                    shelf={"wantToRead"}
                    title={"Want to Read"}
                    books={this.state.books}
                />
                <Bookshelf
                    onUpdateShelf={this.moveBook}
                    shelf={"read"}
                    title={"Read"}
                    books={this.state.books}
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
