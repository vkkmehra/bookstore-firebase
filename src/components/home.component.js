// Home component of the app, renders books list
import React, { useState, useEffect } from 'react'
import BookDataService from "../services/book.service";
import { Link, Redirect } from 'react-router-dom';
// import firebase from "../firebase";

// const db = firebase.firestore().collection("books");

function Home({ handleCart, orderItems }) {
    const [books, setBooks] = React.useState();
    const [redirect, setRedirect] = React.useState(false);
    // updates cart in localstorage
    const addToCart = (id, processOrder) => {
        let cartItemsArr = orderItems == "" ? [] : orderItems.split(",")
        cartItemsArr.push(id.toString())
        handleCart(cartItemsArr.toString())
        if (processOrder == 1) setRedirect(true)
    }

    // load books from firestore
    useEffect(() => {
        const fetchBooks = async () => {
            const booksCollection = await BookDataService.getAll();
            // console.log(booksCollection.docs[0].id)
            setBooks(
                booksCollection.docs.map((doc) => {
                    // console.log(doc.data())
                    let item = {
                        id: doc.id,
                        ...doc.data()
                    }
                    return item;
                })
            );
        };
        fetchBooks();
    }, []);
    return (
        <>
            {redirect ? <Redirect to="/checkout" /> :
                <>
                    <header className="bg-dark py-5" style={{ background: 'url(' + process.env.PUBLIC_URL + '/slider1.jpg)', backgroundSize: 'auto' }}>
                        <div className="container px-4 px-lg-5 my-5">
                            <div className="text-center text-white">
                                <h1 className="display-4 fw-bolder">Books available for all age groups.</h1>
                                <p className="lead fw-normal text-white mb-0">Refresh your mind with books</p>
                            </div>
                        </div>
                    </header>
                    <section className="py-5">
                        <div className="container px-4 px-lg-5 mt-5">
                            <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                                {books && books.map(({ id, category, image, isbn, price, title }) => {
                                    return (
                                        <div className="col mb-5">
                                            <div className="card h-100">
                                                {/* Product image */}
                                                {/* <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." /> */}
                                                <Link to={"/book/" + id} className="nav-link">
                                                    <img className="card-img-top" src={image} height="170" width="269" />
                                                </Link>

                                                {/* Product details */}
                                                <div className="card-body p-4">
                                                    <div className="text-center">
                                                        {/* Product name */}
                                                        <h6 className="fw-bolder text-danger">{"Price: " + parseInt(price).toFixed(2)}</h6>
                                                        <h4 className="fw-bolder">{title}</h4>
                                                    </div>
                                                </div>
                                                {/* Product actions */}
                                                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                                    <div className="text-center"><button onClick={() => addToCart(id, 1)} className="btn btn-outline-dark mt-auto">Buy Now</button>&nbsp;<button type='button' onClick={() => addToCart(id, 0)} className="btn btn-danger mt-auto" title='Add to cart' href="#" ><i className="bi bi-cart"></i></button></div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}

                            </div>
                        </div>
                    </section>
                </>
            }
        </>
    )
}

export default Home;