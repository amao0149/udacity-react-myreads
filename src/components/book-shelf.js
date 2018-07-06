import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookItem from './book-item.js'

class BookShelf extends Component {
  componentWillReceiveProps() {
    // console.log(arguments)
  }
  render() {
    const { books, moveBook } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            { books.map((book, index) => (
              <li key={index}>
                <BookItem book={book} moveBook={moveBook} />
              </li>
            )) }
          </ol>
        </div>
      </div>
    )
  }
}
BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  moveBook: PropTypes.func
}

export default BookShelf