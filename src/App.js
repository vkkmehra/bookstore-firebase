import React, { useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import BooksList from "./components/admin/books-list.component";

import Upload from './components/admin/uploader.component';
import Header from './components/header.component';
import Home from './components/home.component';
import About from './components/about.component';
import Footer from './components/footer.component';
import Book from './components/book.component';
import Checkout from './components/checkout.component';
import OrderReport from './components/admin/order-report.component';

function App() {
  // cart items will be updated from various components through update cart function
  const [cartItems, setCartItems] = React.useState("");
  const updateCart = (orderItems) => {
    localStorage.setItem("cartItems", orderItems)
    setCartItems(orderItems);
  }
  useEffect(() => {
    setCartItems(localStorage.getItem("cartItems") == null ? "" : localStorage.getItem("cartItems"))
  }, []);
  return (
    <>
      <Header orderItems={cartItems} />
      <div>
        <Switch>
          <Route exact path={["/", "/home"]} >
            <Home handleCart={updateCart} orderItems={cartItems} />
          </Route>
          <Route exact path="/about" component={About} />
          <Route exact path="/book/:id">
            <Book handleCart={updateCart} orderItems={cartItems} />
          </Route>
          <Route exact path="/checkout" >
            <Checkout handleCart={updateCart} orderItems={cartItems} />
          </Route>
          <Route exact path="/admin" component={BooksList} />
          <Route exact path="/orders" component={OrderReport} />

        </Switch>
      </div>
      <Footer />
    </>
  );
}

export default App;
