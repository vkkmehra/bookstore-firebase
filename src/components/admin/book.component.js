import React, { Component } from "react";

// importing firebase for storing image it can be done in a separate service
import firebase from "../../firebase";
const storage = firebase.storage();

export default class Book extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      imageFile: undefined,
      currentBook: {},
      error: {}
    };
  }

  // on file selection setting image in state
  onFileChange = async (e) => {
    const file = e.target.files[0];
    this.setState({ imageFile: file })
  };

  // uploading image to firebase storage and getting url
  async uploadImage(currentBook) {
    const { imageFile } = this.state
    debugger
    const storageRef = storage.ref();
    const fileRef = storageRef.child(imageFile.name);
    await fileRef.put(imageFile);
    currentBook.image = await fileRef.getDownloadURL();
    // const fileUrl = await fileRef.getDownloadURL();
    // this.setState(currentBook);
  }

  componentDidMount() {
    this.setState({
      currentBook: { ...this.props.book },
    });
  }

  componentWillReceiveProps({ book }) {
    this.setState({ ...this.state, currentBook: book })
  }

  // handling the elements on change and uddating the book object to be saved/updated
  handleChange = e => {
    const { currentBook, error } = this.state
    if (e.target.value == "") {
      error[e.target.name] = true
      currentBook[e.target.name] = ""
    }
    else {
      if (e.currentTarget.name == "price")
        currentBook[e.currentTarget.name] = parseFloat(e.currentTarget.value)
      else
        currentBook[e.currentTarget.name] = e.currentTarget.value
      error[e.target.name] = false
    }

    this.setState({ error, currentBook })
  }

  // form validation can be done through yup or formik using schema builder but for now doing it simply
  validateForm() {
    const { saveBook, updateBook } = this.props;
    const { currentBook, imageFile } = this.state;
    let isValid = true
    let errors = {}

    if (!(currentBook["title"] && currentBook["title"] != "")) {
      errors["title"] = true;
      isValid = false;
    }

    if (!currentBook["description"]) {
      isValid = false;
      errors["description"] = true;
    }

    if (!currentBook["author"]) {
      isValid = false;
      errors["author"] = true;
    }
    if (!currentBook["category"]) {
      isValid = false;
      errors["category"] = true;
    }
    if (!currentBook["isbn"]) {
      isValid = false;
      errors["isbn"] = true;
    }
    if (!currentBook["price"]) {
      isValid = false;
      errors["price"] = true;
    }
    if (!currentBook["publisher"]) {
      isValid = false;
      errors["publisher"] = true;
    }

    if (typeof currentBook["category"] !== "undefined") {
      if (!currentBook["category"].match(/^[a-zA-Z ]*$/)) {
        isValid = false;
        errors["category"] = true;
      }
    }

    if (!currentBook.id && !imageFile) {
      isValid = false;
      errors["file"] = true;
    }

    if (!isValid) {
      this.setState({ error: errors })
      return
    }
    if (currentBook.id == null) this.uploadImage(currentBook)
    saveBook(currentBook)
  }



  render() {
    const { currentBook, error, message } = this.state;
    console.log(currentBook.id)
    console.log(currentBook && currentBook.releasedate && new Date(currentBook.releasedate.seconds * 1000).toLocaleDateString("en-GB"))
    if (message != "") {
      setTimeout(() => {
        this.setState({ message: "" });
      }, 5000);
    }
    return (
      // Book Form
      <div>
        <h4>Book</h4>

        <div className="edit-form">
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                name='title'
                type="text"
                className={"form-control border " + (error && error.title ? "border-danger" : "")}
                id="title"
                value={currentBook.title}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                name='description'
                type="text"
                className={"form-control border " + (error && error.description ? "border-danger" : "")}
                id="description"
                value={currentBook.description}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Author</label>
              <input
                name='author'
                type="text"
                className={"form-control border " + (error && error.author ? "border-danger" : "")}
                id="author"
                value={currentBook.author}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                name='category'
                type="text"
                className={"form-control border " + (error && error.category ? "border-danger" : "")}
                id="category"
                value={currentBook.category}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="isbn">ISBN</label>
              <input
                name='isbn'
                type="text"
                className={"form-control border " + (error && error.isbn ? "border-danger" : "")}
                id="isbn"
                value={currentBook.isbn}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                name='price'
                type="number"
                className={"form-control border " + (error && error.price ? "border-danger" : "")}
                id="price"
                value={currentBook.price}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="publisher">Publisher</label>
              <input
                name='publisher'
                type="text"
                className={"form-control border " + (error && error.publisher ? "border-danger" : "")}
                id="publisher"
                value={currentBook.publisher}
                onChange={this.handleChange}
              />
            </div>
            {/* <div className="form-group">
              <label htmlFor="releaseDate">Release Date</label>
              <input
                name='releasedate'
                type="text"
                className={"form-control border " + (error && error.title ? "border-danger" : "")}
                id="releasedate"
                value={currentBook.releasedate}
                onChange={this.handleChange}
              />
            </div> */}

            {currentBook.id == null ?
              <div className={"form-group border " + (error && error.file ? "border-danger" : "")} >
                <label htmlFor="bookImage">Book Image</label>
                <input type="file" accept=".jpg,.png" onChange={this.onFileChange} />
              </div> : ""
            }


          </form>
          {/* If new book then button will be save otherwise update */}
          {currentBook.id ? (
            <button
              className="btn btn-outline-dark mt-auto"
              onClick={() => this.validateForm()}
            >
              Update
            </button>
          ) : (
            <button
              className="btn btn-outline-dark mt-auto"
              onClick={() => this.validateForm()}
            >
              Save
            </button>
          )}
          <p>{this.state.message}</p>
        </div>

      </div >
    );
  }
}