import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Bookshelf from "./Bookshelf";
import * as BooksAPI from './BooksAPI'

class SearchBar extends Component {
    state = {
        books: [],
        query: ''
    }

    componentDidMount() {
        this.searchBook(this.state.query);

    }

    searchBook = (query) => {
        BooksAPI.search(query, 5).then(
            response => {
                if (response.error) {
                    this.setState({ books:[] });
                } else {
                    this.updateBooks(response)
                }
            }
        );
    }

    updateBooks(books) {
        const myBooks = this.props.myBooks;
        const resultBooks = books.map(book => {
            book.shelf = this.props.shelf;
            myBooks.forEach(myBook => {
                if (book.id === myBook.id) {
                    book.shelf = myBook.shelf
                }
            });
            return book;
        });

        this.setState({
            books: resultBooks
        });
    }

    updateQuery = (query) => {
        if (query) {
            this.setState({ query: query }, this.searchBook(query))
        } else {
            this.setState({ query: query })
        }
    }

    render() {
        const { shelf, onUpdateShelf } = this.props
        const { query } = this.state

        return (

            <div>
                <div className="search-books-bar">
                    <Link className="close-search" to={"/"}>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            value={query}
                            type="text"
                            onChange={(event) => this.updateQuery(event.target.value)}
                            placeholder="Search by title or author"/>
                    </div>
                </div>
                <div className="search-books-results">
                    <Bookshelf
                        onUpdateShelf={onUpdateShelf}
                        shelf={shelf}
                        title={"Search Results"}
                        books={this.state.books}
                    />
                </div>
            </div>
        )
    }
}
export default SearchBar