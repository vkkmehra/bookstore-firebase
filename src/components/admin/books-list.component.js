// this component will display all the books in the db and also will be used for crud operations on book
import React, { Component } from "react";
import { Link } from "react-router-dom";
import BookDataService from "../../services/book.service";
import Book from "./book.component";

export default class BooksList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      currentBook: {},
      currentIndex: -1,
      showBook: false
    };
  }

  // fetching all books from firestore and updating state
  async componentDidMount() {
    const booksCollection = await BookDataService.getAll();
    const books = booksCollection.docs.map((doc) => {
      // console.log(doc.data())
      let item = {
        id: doc.id,
        ...doc.data()
      }
      return item;
    })
    // this.onDataChange(books)
    this.setState({
      books: books,
    });
    console.log(books.docs)
  }



  // onDataChange(items) {
  //   let books = [];
  //   console.log(items)
  //   items.forEach((doc) => {
  //     let item = doc.data();
  //     let key = item.key;
  //     let data = item;
  //     books.push({
  //       key: key,
  //       title: data.title,
  //       description: data.description,
  //       published: data.published,
  //     });
  //   });
  //   console.log(books)
  //   this.setState({
  //     books: books,
  //   });
  // }

  // delete record from firestore and update
  deleteBook(id) {
    BookDataService.delete(id)
      .then(() => {
        alert("Book deleted successfully")
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  // setting currentBook to state
  editBook(book, index) {
    this.setState({
      showBook: true,
      currentBook: book,
      currentIndex: index,
    });
  }

  // initialising blank object and setting state
  addBook = () => {
    const newBook = {
      title: "",
      description: "",
      category: "",
      author: "",
      isbn: "",
      price: "",
      publisher: ""
    }
    this.setState({
      showBook: true,
      currentIndex: -1,
      currentBook: { ...newBook }
    });
  }

  // this function is send as prop to child component book and thus saving new book or updating old one
  saveBook = book => {
    book.id ?
      BookDataService.update(book.id, book)
        .then(() => {
          this.setState({
            message: "The book was updated successfully!",
          }, (function () {
            alert("Book updated successfully.");
            window.location.reload()
          })()
          );
        })
        .catch((e) => {
          console.log(e);
        }) :
      BookDataService.create(book)
        .then(() => {
          this.setState({
            message: "The book was saved successfully!",
          }, (function () {
            alert("Book saved successfully.");
            window.location.reload()
          })());
        })
        .catch((e) => {
          console.log(e);
        })
  }


  render() {
    const { books, currentBook, currentIndex, message, showBook } = this.state;
    const bookObj = { ...currentBook }
    console.log(bookObj)
    return (
      <div className="container px-4 px-lg-5 mt-5">
        <div className="list row">
          {/* Left side to display books lists */}
          <div className="col-md-6">
            <div>
              <h4>Books List</h4>
            </div>
            <div className="text-right">
              <button type='button' title='New Book' className='badge badge-success' onClick={this.addBook} >
                <i className="bi bi-plus-lg"></i>
              </button>
            </div>

            <ul className="list-group">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Publication</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books &&
                    books.map((book, index) => (
                      <tr>
                        <td>{book.title}</td>
                        <td>{book.publisher}</td>
                        <td>{book.category}</td>
                        <td>
                          <button type='button' className='badge badge-primary' onClick={() => { this.editBook(book) }} >
                            <i className="bi bi-pencil-square me-1"></i>
                          </button>
                          <button type='button' className='badge badge-danger' onClick={() => { this.deleteBook(book.id) }}>
                            <i className="bi bi-trash me-1"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </ul>
          </div>
          {/* right side to display books form for adding and updating the book */}
          {showBook &&
            <div className="col-md-6">
              <Book
                book={{ ...bookObj }}
                saveBook={this.saveBook}
              />
            </div>}
          {/* save and update messages  */}
          {message && <div className="col-md-12 text-center"><span className='text-center text-bold text-success'>{message}</span></div>}
        </div >
      </div>
    );
  }
}