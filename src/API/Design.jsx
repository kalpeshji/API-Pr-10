import React from 'react'

function Design({ index, product, addToCart }) {
    return (
        <div className="col-lg-3 col-md-6 mt-6 mb-3 " >
            <div className="dark-card me-3">
                <div className="bg-lightr">
                    <img src={product.image} alt="" className='img-fluid w-100 p-5' style={{ height: '320px', borderRadius: "3px" }} />
                </div>
                <div className="des d-flex flex-wrap mt-3 justify-content-between ">
                    <div className='text-white'>
                        <h6 className='mb-3 text-center d-block'>{product.name}</h6>
                        <p>{product.info}</p>
                        <p>Price : ${product.price}</p>
                    </div>
                    <button className='btn btn-light w-100' onClick={() => addToCart(index)}>ADD TO CART<i class="fa-solid fa-cart-shopping ms-2"></i></button>
                </div>
            </div>
        </div>
    )
}

export default Design