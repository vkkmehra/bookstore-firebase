// This component displays the book detail page and from here we can add the book into the cart or directly buy the book
import React, { useState, useEffect } from 'react'
import { useParams } from "react-router";
import { Link, Redirect } from 'react-router-dom';
import BookDataService from "../services/book.service";
function Book({ handleCart, orderItems }) {
    const [book, setBook] = React.useState(null)
    const [redirect, setRedirect] = React.useState(false);
    let { id } = useParams();
    const addToCart = (id, processOrder) => {
        let cartItemsArr = orderItems == "" ? [] : orderItems.split(",")
        cartItemsArr.push(id.toString())
        handleCart(cartItemsArr.toString())
        if (processOrder == 1) setRedirect(true)
    }

    useEffect(() => {
        const fetchBook = async () => {

            const bookObject = await BookDataService.get(id);
            // console.log(bookObject.docs.data())
            setBook(
                {
                    id: bookObject.id,
                    ...bookObject.docs[0].data()
                }
            );
        };
        fetchBook();
    }, []);
    return (
        <>
            {redirect ? <Redirect to="/checkout" /> :
                <>
                    {book &&
                        <section className="py-5">
                            <div className="container px-4 px-lg-5 mt-5">
                                <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-md-2 row-cols-xl-2 justify-content-center">
                                    <div className="col mb-5">
                                        <img className="card-img-top" src={book.image} height="340" width="500" />
                                    </div>
                                    <div className="col mb-5">
                                        <div className="h-100">
                                            <div className='h-100 row row-cols-1'>
                                                <h5>{book.title}</h5>
                                                <p>(Paper Book)</p>
                                                <p>By: {book.author} | Publisher : {book.publisher} | Released: 02 Mar 2010</p>
                                                <p>Price: {book.price.toFixed(2)}</p>
                                                <div className="text-center"><button type='button' onClick={() => addToCart(id, 1)} className="btn btn-outline-dark mt-auto" href="#">Buy Now</button>&nbsp;<button className="btn btn-danger mt-auto" onClick={() => addToCart(book.id, 0)} title='Add to cart' href="#" ><i className="bi bi-cart"></i></button></div>
                                            </div>
                                            {/* Product details */}
                                            {/* <div className="card-body p-4">
                                <div className="text-center">
                                    {/* Product name */}
                                            {/* <h6 className="fw-bolder text-danger">{"Price: " + price.toFixed(2)}</h6>
                                    <h4 className="fw-bolder">{title}</h4>
                                </div>
                            </div> */}
                                            {/* Product actions */}
                                            {/* <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">Buy Now</a>&nbsp;<a onClick={handleCart} className="btn btn-danger mt-auto" title='Add to cart' href="#" ><i className="bi bi-cart"></i></a></div>
                            </div>  */}
                                        </div>
                                    </div>
                                </div>
                                <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-md-2 row-cols-xl-2">
                                    <div className="col mb-5">
                                        <h6>About this book</h6>
                                        {book.description}
                                    </div>
                                </div>
                            </div>
                        </section>}
                </>}
        </>
    )
}

export default Book