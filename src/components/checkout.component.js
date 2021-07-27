// Checkout Form displays ordered books and customer details to be filled
// after submitting it adds the order to firestore there after sends email through mailgun
// right now the recepient added in mailgun is only vivek.mehra1@gmail.com
import React, { useState, useEffect } from 'react'
import BookDataService from "../services/book.service";
import OrderDataService from "../services/order.service";
import { Redirect } from 'react-router-dom'

// adding api keys statically here but can be done through environment variable, 
// better we can do it through backend api
var api_key = 'f35674a63d1c12f260fcc767c1db1c25-c485922e-c6f046af';
var public_key = 'pubkey-f4570a9d1391059a26c45c555bd59970';

const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);

const mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY || api_key,
    public_key: process.env.MAILGUN_PUBLIC_KEY || public_key
});

function Checkout({ handleCart }) {
    const [cartItems, setCartItems] = React.useState(null)
    const [cartTotal, setCartTotal] = React.useState(0)
    const [formErrors, setFormErrors] = React.useState({})
    const [formObject, setFormObject] = React.useState({})
    const [redirect, setRedirect] = React.useState(false)


    // Renders order details on load by picking cart items from localstorage
    useEffect(() => {
        // Setting up Order Item Qty and fetch order item detail from db
        let orderItems = localStorage.getItem("cartItems")
        const fetchOrderItems = async () => {
            if (orderItems !== "") {
                let grandTotal = 0
                const orderObjects = orderItems.split(",").reduce(function (acc, curr) {
                    return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
                }, {});
                console.log(orderObjects)
                const booksCollection = await BookDataService.get(orderItems.toString());
                console.log(booksCollection.docs)
                setCartItems(
                    booksCollection.docs.map((doc) => {
                        // console.log(doc.data())
                        let totalAmount = orderObjects[doc.id] * doc.data().price
                        grandTotal += totalAmount
                        let item = {
                            id: doc.id,
                            quantity: orderObjects[doc.id],
                            total: totalAmount,
                            ...doc.data()
                        }
                        return item;
                    })
                );
                setCartTotal(grandTotal)
            }
        };
        fetchOrderItems();
    }, []);

    // handling form changes
    const handleFormChange = (e) => {
        let errors = { ...formErrors }
        let formElements = formObject || {}
        if (e.target.value == "") {
            errors[e.target.name] = true
            formElements[e.target.name] = ""
        }
        else {
            errors[e.target.name] = false
            formElements[e.target.name] = e.target.value
        }

        setFormErrors({ ...errors })
        setFormObject(formElements)
        console.log(formErrors)
    }

    // validating form (basic validation)
    const validateForm = () => {
        let isValid = true
        let errors = {}

        if (!formObject["customerName"]) {
            isValid = false;
            errors["customerName"] = true;
        }

        if (typeof formObject["customerName"] !== "undefined") {
            if (!formObject["customerName"].match(/^[a-zA-Z ]*$/)) {
                isValid = false;
                errors["customerName"] = true;
            }
        }

        if (!formObject["email"]) {
            isValid = false;
            errors["email"] = true;
        }

        if (typeof formObject["email"] !== "undefined") {
            //regular expression for email validation
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(formObject["email"])) {
                isValid = false;
                errors["email"] = true;
            }
        }

        if (!formObject["address"]) {
            isValid = false;
            errors["address"] = true;
        }

        if (typeof formObject["aaddress"] !== "undefined") {
            if (!formObject["address"].match(/^[a-zA-Z ]*$/)) {
                isValid = false;
                errors["address"] = true;
            }
        }


        // keys.map(function (key) {
        //     if (formErrors[key]) {
        //         isValid = false
        //     }
        // }, formErrors)
        console.log(errors)
        setFormErrors({ ...errors })
        console.log(formErrors)
        return isValid
    }

    // on form submit order is saved and email is sent
    const onSubmit = async (e) => {
        // debugger
        if (!validateForm()) return
        let order = {}
        order = { ...formObject, total: cartTotal, orderNo: Math.floor(Math.random() * 1000) }
        order.orderDetail = cartItems
        const res = await OrderDataService.create(order)
        console.log("order created")
        e.preventDefault();
        mg.messages.create('sandbox9f91e75f2a3f40b781cafac6d8dfc10a.mailgun.org', {
            from: "Book Lovers <postmaster@sandbox9f91e75f2a3f40b781cafac6d8dfc10a.mailgun.org>",
            to: [formObject["email"].toString()],
            subject: "Order # " + order.orderNo + " confirmed.",
            html: "<p>Dear " + order.customerName + ", </p><p>Congrats! your order is confirmed. The shipping details will be shared with you soon.</p><p>Team Book Lovers</p>"
        })
            .then(msg => {
                // resetting localstorage
                localStorage.removeItem("cartItems");
                handleCart("")
                alert("Order completed successfully, please check your email for confirmation")
                // redirecting to home    //  
                setRedirect(true)
                console.log(msg)
            }) // logs response data
            .catch(err => console.log("here", err)); // logs any error
        // const username = e.target.username.value;
        // if (!username || !fileUrl) {
        //   return;
        // }
        // await db.collection("users").doc(username).set({
        //   name: username,
        //   avatar: fileUrl,
        // });
    };

    return (
        <>

            {redirect ? <Redirect to='/home' /> :
                <section className="py-5">
                    <div className="container px-4 px-lg-5 mt-5">
                        <div className="row gx-4 gx-lg-5 row-cols-1">
                            <div className="col mb-5 text-center text-bold"><h4>Order Detail</h4></div>
                        </div>
                        {/* left side shows order details */}
                        <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-md-2 row-cols-xl-2 justify-content-center">
                            <div className="col mb-5">

                                <table className="table table-striped">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Qty</th>
                                            <th scope="col" className='text-right'>Price</th>
                                            <th scope="col" className='text-right'>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems && cartItems.map(({ id, category, image, isbn, price, quantity, title, total }, index) => {
                                            return (
                                                <tr>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{title}</td>
                                                    <td>{quantity}</td>
                                                    <td className='text-right'>{parseInt(price).toFixed(2)}</td>
                                                    <td className='text-right'>{total.toFixed(2)}</td>
                                                </tr>
                                            )
                                        })}

                                    </tbody>
                                </table>
                            </div>
                            {/* checkout form to fill customer details and submit */}
                            <div className="col mb-5">
                                <div className="h-100">
                                    <div className='h-100 row row-cols-1'>


                                        <div className="col ">
                                            <form>
                                                <div className="form-group">
                                                    <input type="text" value={formObject["customerName"]} onChange={handleFormChange} placeholder="Customer Name" className={"form-control border " + (formErrors && formErrors["customerName"] ? "border-danger" : "")} name="customerName" />
                                                </div>
                                                <div className="form-group">
                                                    <input type="email" value={formObject["email"]} onChange={handleFormChange} placeholder="Email address" className={"form-control border " + (formErrors && formErrors["email"] ? "border-danger" : "")} name="email" />
                                                </div>
                                                <div className="form-group">
                                                    <input type="text" value={formObject["address"]} onChange={handleFormChange} placeholder="Address" className={"form-control border " + (formErrors && formErrors["address"] ? "border-danger" : "")} name="address" />
                                                </div>
                                            </form>
                                        </div>
                                        <div className="col">
                                            <p><h5 className='text-left text-danger'>Amount : {cartTotal}</h5></p>
                                        </div>
                                        <div className="col mb-5 text-center text-bold">
                                            <div className="text-left"><button onClick={onSubmit} className="btn btn-outline-dark mt-auto">Confirm</button></div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </section>}
        </>
    )
}

export default Checkout