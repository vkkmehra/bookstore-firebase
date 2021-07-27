// header component contains navbar 
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

function Header({ orderItems }) {
    const [navBarVisibility, setNavBarVisibility] = React.useState(false)

    const [cartItems, setCartItems] = React.useState(0)

    useEffect(() => {
        setCartItems(orderItems)
    }, []);
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container px-4 px-lg-5">
                <Link to={"/home"} className="nav-link">
                    <img src={process.env.PUBLIC_URL + "/logo.png"} height="30" />
                    <span className="navbar-brand pl-1 text-danger" href="#!">Book Lovers</span>
                </Link>
                <button className="navbar-toggler" onClick={() => setNavBarVisibility(!navBarVisibility)} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className={"collapse navbar-collapse " + (navBarVisibility ? "show" : "")} id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li className="nav-item">
                            {/* <a className="nav-link active" aria-current="page" href="#!">Home</a> */}
                            <Link to={"/home"} className="nav-link">
                                Books
                            </Link>
                        </li>
                        <li className="nav-item">
                            {/* <a className="nav-link" href="#!">About</a> */}
                            <Link to={"/about"} className="nav-link">
                                About
                            </Link>
                        </li>
                        <li className="nav-item">
                            {/* <a className="nav-link" href="#!">About</a> */}
                            <Link to={"/admin"} className="nav-link">
                                Admin
                            </Link>
                        </li>
                        <li className="nav-item">
                            {/* <a className="nav-link" href="#!">About</a> */}
                            <Link to={"/orders"} className="nav-link">
                                Orders
                            </Link>
                        </li>
                    </ul>
                    <form className="d-flex">
                        {orderItems !== "" ?
                            <Link to={"/checkout"}>
                                <button className="btn btn-outline-dark" type="button">
                                    <i className="bi-cart-fill me-1"></i>
                                    Cart
                                    <span className="badge bg-dark text-white ms-1 rounded-pill">{orderItems == "" ? 0 : orderItems.split(",").length}</span>
                                </button>
                            </Link> :
                            <button className="btn btn-outline-dark" type="button">
                                <i className="bi-cart-fill me-1"></i>
                                Cart
                                <span className="badge bg-dark text-white ms-1 rounded-pill">{orderItems == "" ? 0 : orderItems.split(",").length}</span>
                            </button>
                        }
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Header