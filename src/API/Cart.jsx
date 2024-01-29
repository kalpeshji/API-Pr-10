import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

function Cart() {
    const [cartData, setCartData] = useState([]);
    const [noRecords, setNoRecords] = useState(false);
    useEffect(() => {
        if (cartData.length === 0) {
            setNoRecords(true);
        } else {
            setNoRecords(false);
        }
    }, [cartData])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/cart");
                setCartData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleRemoveFromCart = async (itemId) => {
        await axios.delete(`http://localhost:4000/cart/${itemId}`);
        setCartData(cartData.filter((data, id) => data.id != + itemId))
    }
    const handleDecrement = async (itemId) => {
        const item = cartData.find(item => item.id === itemId);
        if (item && item.quantity > 1) {
            try {
                const newQuantity = item.quantity - 1;
                await axios.patch(`http://localhost:4000/cart/${itemId}`, { quantity: newQuantity });
                setCartData(cartData.map(item => 
                    item.id === itemId ? { ...item, quantity: newQuantity } : item
                ));
            } catch (error) {
                console.error("Error updating item:", error);
            }
        }
    };
    
    const handleIncrement = async (itemId) => {
        const item = cartData.find(item => item.id === itemId);
        if (item) {
            try {
                const newQuantity = item.quantity + 1;
                await axios.patch(`http://localhost:4000/cart/${itemId}`, { quantity: newQuantity });
                setCartData(cartData.map(item => 
                    item.id === itemId ? { ...item, quantity: newQuantity } : item
                ));
            } catch (error) {
                console.error("Error updating item:", error);
            }
        }
    };
    

    return (
        <>
            <Header />
            <div className='container px-3 mt-5'>
                <div className="row">
                    <div className="col-9">
                        <div className="dark-card p-0 ">
                            <div className="d-flex flex-wrap justify-content-between p-3 align-content-center">
                                <div className="cart-heading p-2">
                                    <h5 className="m-0 text-light">My Cart</h5>
                                </div>
                                <div>
                                    <Link className='btn btn-success px-3 py-6 fs-6 me-2' to={'/products'}>Product<i class="fa-solid fa-cart-shopping ms-2"></i></Link>
                                </div>
                            </div>
                            <div className="cart-body p-3 " style={{ height: "60vh", overflowY: "scroll" }}>
                                <table class="table text-dark">
                                    <thead>
                                        <tr className='text-light'>
                                            <th className='text-center' scope="col">PRODUCT</th>
                                            <th className='text-center' scope="col">QUANTITY</th>
                                            <th className='text-center' scope="col">PRICE</th>
                                            <th className='text-center' scope="col">SUB TOTAL</th>
                                            <th className='text-center' scope="col">ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {noRecords ? (
                                            <>
                                                <td className='text-center fw-bold text-light pe-0 py-5' colSpan={5}>Your Cart is Empty</td>
                                            </>
                                        ) : (
                                            cartData && cartData.map((item, id) => {
                                                console.log(item.id)
                                                return (
                                                    <tr key={id}>
                                                        <td >
                                                            <div className="bg-lightr d-inline-block">
                                                                <img src={item.image} alt="" className='img-fluid p-2' style={{ height: '70px', width: "70px", borderRadius: "3px" }} />
                                                            </div>
                                                            <span className='ms-3 text-dark'>{item.name}</span>
                                                        </td>
                                                        <td className='text-center'>
                                                            <button className='btn text-dark rounded-0 ' style={{ border: "1px solid #bfc8de" }} onClick={() => handleDecrement(item.id)}>-</button>
                                                            <span className='btn text-theme rounded-0 text-dark' style={{ border: "1px solid #bfc8de" }}>{item.quantity}</span>

                                                            <button className='btn  text-dark rounded-0 ms-1' style={{ border: "1px solid #bfc8de" }} onClick={() => handleIncrement(item.id)}>+</button>
                                                        </td>
                                                        <td className='text-center'>${item.price}</td>
                                                        <td className='text-center'>${item.price * item.quantity}</td>
                                                        <td className='text-center'><button className='btn btn-dark btn-sm' onClick={() => handleRemoveFromCart(item.id)}><i class="bi bi-trash-fill text-danger fs-5"></i></button></td>
                                                    </tr>
                                                )
                                            })
                                        )
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="dark-card ps-3 text-light">
                            <p className="fs-5">Total <br /><br />
                                ${calculateTotal().toFixed(2)}</p>
                            <button className="btn btn-success w-100">
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    function calculateTotal() {
        return cartData.reduce((total, item) => total + item.price * item.quantity, 0);
    }
};
export default Cart