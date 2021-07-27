// this component displays all orders in the db
import React, { useState, useEffect } from 'react'
import OrderDataService from '../../services/order.service'

function OrderReport() {
    const [orders, setOrders] = React.useState([])
    useEffect(() => {
        const fetchOrders = async () => {
            const ordersCollection = await OrderDataService.getAll();

            setOrders(
                ordersCollection.docs.map((doc) => {
                    // console.log(doc.data())
                    let item = {
                        id: doc.id,
                        ...doc.data()
                    }
                    return item;
                })
            );
        };
        fetchOrders();
    }, []);
    return (
        <div className="container px-4 px-lg-5 mt-5">
            <div className="row gx-4 gx-lg-5 row-cols-1">
                <div className="col mb-5 text-center text-bold"><h4>Orders Report</h4></div>
            </div>
            <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-md-2 row-cols-xl-2 justify-content-center">
                <div className="col mb-5">
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Order #</th>
                                <th scope="col">Customer Name</th>
                                <th scope="col">Customer Email</th>
                                <th scope="col" className='text-right'>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders && orders.map(({ id, orderNo, customerName, email, total }) => {
                                return (
                                    <tr>
                                        <th scope="row">{orderNo}</th>
                                        <td>{customerName}</td>
                                        <td>{email}</td>
                                        <td className='text-right'>{total.toFixed(2)}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default OrderReport