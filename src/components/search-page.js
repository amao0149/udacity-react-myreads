import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './book-shelf'
import * as BooksAPI from '../BooksAPI'

class SearchPage extends Component {
  state = {
    books: []
  }

  search = (query) => {
    if (!query) return
    BooksAPI.search(query).then((books) => {
      const { localBooks } = this.props
      if(books.error) { books = [] }

      localBooks && (books = books.map(book => {
        book.shelf = localBooks[book.id] && localBooks[book.id].shelf
        return book
      }))
      this.setState({ books })
    }).catch(error => {

    })
  }

  moveSearchedBook = (book, targetShelf) => {
    const { moveBook } = this.props
    // this.setState(state => ({
    //   books: state.books.filter(b => b.id !== book.id)
    // }))
    moveBook(book, targetShelf)
    // moveBook(...arguments) 因为箭头函数这种形式不管用
  }

  render() {
    const { search, state, moveSearchedBook } = this
    const { books } = state

    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/" className="close-search">Close</Link>
            <div className="search-books-input-wrapper">
              {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
              <input
                onChange={e => search(e.target.value)}
                type="text" placeholder="Search by title or author"/>
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
        <div className="book-container">
          <BookShelf title="Search Results" books={books} moveBook={moveSearchedBook} />
        </div>
      </div>
    )
  }
}

SearchPage.propTypes = {
  moveBook: PropTypes.func,
  localBooks: PropTypes.object
}

export default SearchPage