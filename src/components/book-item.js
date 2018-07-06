import React, { Component } from 'react'
import PropTypes from 'prop-types'

let bookOperates = [
  {
    value: 'move',
    disabled: true,
    name: 'Move to...'
  },
  {
    value: 'currentlyReading',
    name: 'Currently Reading'
  },
  {
    value: 'wantToRead',
    name: 'Want to Read'
  },
  {
    value: 'read',
    name: 'Read'
  },
  {
    value: 'none',
    name: 'None'
  }
]

class BookItem extends Component {

  move = e => {
    const { book, moveBook } = this.props
    const targetShelf = e.target.value

    moveBook(book, targetShelf)
  }

  render() {
    const { book } = this.props

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover"
            style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : 'none'})` }}></div>
          <div className="book-shelf-changer">
            <select
              value={book.shelf || 'none'}
              onChange={this.move}
            >
              { bookOperates.map(operate => (
                <option
                  key={operate.value}
                  value={operate.value}
                  disabled={operate.disabled}
                >{operate.name}</option>
              )) }
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          { book.authors && book.authors.map(author => (<span key={author}>{author}</span>)) }
        </div>
      </div>
    )
  }
}

BookItem.propTypes = {
  book: PropTypes.shape({
    imageLinks: PropTypes.object,
    title: PropTypes.string.isRequired,
    authors: PropTypes.array,
    shelf: PropTypes.string
  }),
  moveBook: PropTypes.func
}

export default BookItem