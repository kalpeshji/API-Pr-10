import React, { useEffect, useState } from 'react'
import Design from './Design'
import axios from 'axios'
import Header from './Header';
import { Link } from 'react-router-dom';
function Products() {
  const [productData, setProductData] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/products");
        setProductData(response.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/cart");
        const cartData = response.data;
        const total = cartData.reduce((acc, item) => acc + item.quantity, 0);
        setTotalQuantity(total);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, []);
  const handleAddToCart = async (idx) => {
    try {
      const selectedItem = productData[idx];
      const res = await axios.get("http://localhost:4000/cart");
      let cartData = res.data;

      const existingItem = cartData.find((data) => data.id === selectedItem.id);
      const existingItemIndex = cartData.findIndex((data) => data.id === selectedItem.id);

      if (existingItemIndex !== -1) {
        existingItem.quantity = existingItem.quantity + 1;
        await axios.put(`http://localhost:4000/cart/${existingItem.id}`, existingItem);
      } else {
        await axios.post("http://localhost:4000/cart", { ...selectedItem, quantity: 1 });
      } setTotalQuantity((prevTotal) => existingItemIndex !== -1 ? prevTotal + 1 : prevTotal + selectedItem.quantity);
    } catch (err) {
      console.error("An Error occurred while adding data to the cart !!", err);
    }
  };

  return (
    <>
      <Header />
      <div className='bg-slate-100 p-4'>
        <div className="container m-auto">
          <div className="d-flex justify-content-between my-5">
            <h2 className="">Our Products</h2>
            <button className='btn btn-dark position-relative'><Link to={'/cart'} className=' text-reset text-decoration-none'>My Cart</Link><span className='sp'>{totalQuantity}</span></button>
          </div>
          <div className="d-flex flex-wrap g-2">
            {
              productData && productData.map((product, idx) => <Design key={idx} index={idx} product={product} addToCart={handleAddToCart} />)
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Products
