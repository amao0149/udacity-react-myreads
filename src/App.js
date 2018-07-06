import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Link, Route } from 'react-router-dom'
import './App.css'
import BookShelf from './components/book-shelf'
import SearchPage from './components/search-page'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    shelfs: {
      currentlyReading: {
        id: 'currentlyReading',
        title: 'Currently Reading',
        books: []
      },
      wantToRead: {
        id: 'wantToRead',
        title: 'Want to Read',
        books: []
      },
      read: {
        id: 'read',
        title: 'Read',
        books: []
      }
    },
    books: {}
  }

  moveBook = (book, targetShelf) => {
    const { shelfs, books } = this.state
    const prevShelf = book.shelf && shelfs[book.shelf]
    const currentShelf = shelfs[targetShelf]

    book.shelf = targetShelf
    prevShelf && (prevShelf.books = prevShelf.books.filter(tbook => tbook.id !== book.id))
    currentShelf && currentShelf.books.push(book)
    books[book.id] && (books[book.id].shelf = targetShelf) // 为什么需要这句？

    this.setState({
      shelfs: shelfs,
      books: books
    })
    BooksAPI.update(book, targetShelf)
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState(state => {
        // 若下面这段写在外面有什么区别？
        books.forEach(book => {
          state.books[book.id] = book
          state.shelfs[book.shelf].books.push(book)
        })
        return { shelfs: state.shelfs, books: state.books }
      })
    })
  }

  render() {
    const { shelfs, books } = this.state
    return (
      <div className="app">
        <Route path="/search" render={() => (
            <SearchPage search={this.search} moveBook={this.moveBook} localBooks={books} />
          )} />
        <Route path="/" exact render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                { Object.keys(shelfs).map(key => {
                  const shelf = shelfs[key]
                  return (
                    <BookShelf
                      books={shelf.books}
                      title={shelf.title}
                      key={shelf.id}
                      moveBook={this.moveBook} />
                  )
                }) }
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
