import React, { Component } from 'react';
import ShelfForm from "./ShelfForm";

class Bookshelf extends Component {
    render() {
        const { books, shelf, onUpdateShelf, title } = this.props
        let showingBooks;
        showingBooks = books.filter((book) => (book.shelf === shelf))
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {showingBooks.map((book) => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                        <div className="book-shelf-changer">
                                            <ShelfForm
                                                onUpdateShelf={onUpdateShelf}
                                                book={book}
                                            />
                                        </div>
                                    </div>
                                    <div onClick={() => onUpdateShelf(book, 'wantToRead')} className="book-title">{book.title}</div>
                                    <div className="book-authors">{book.authors.map((author) => (
                                        <ul key={`${author} ${author.position} `}>
                                            <li key={author} style={{listStyleType: `none`}}>{author}</li>
                                        </ul>
                                    ))}</div>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
            )
    }
}
export default Bookshelf;