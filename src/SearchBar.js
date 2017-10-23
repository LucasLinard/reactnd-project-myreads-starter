import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Bookshelf from "./Bookshelf";
import * as BooksAPI from './BooksAPI'

class SearchBar extends Component {
    state = {
        books: this.props.books,
        query: ''
    }

    componentDidMount() {
        this.searchBook(this.state.query);

    }

    searchBook = (query) => {
        BooksAPI.search(query, 5).then((books) => {
            this.setState({ books })
        })
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
        if (query) {
            this.searchBook(query)
        }
    }

    render() {
        const { books, shelf, onUpdateShelf } = this.props
        const { query } = this.state

        let showingBooks
        if (query) {
            showingBooks = this.state.books
        } else {
            showingBooks = [];
        }

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
                        books={showingBooks}
                    />
                </div>
            </div>
        )
    }
}
export default SearchBar