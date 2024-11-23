import React from "react"
import "./Cart.css"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, emptyCartItem, removeSingleItems, removeToCart } from "../features/cartSlice"

const Cart = () => {
    const { carts, totalPrice, totalQuantity } = useSelector((state) => state.cart)
    const dispatch = useDispatch()

    const handleIncrement = (e) => {
        dispatch(addToCart(e))
    }

    const handleDecrement = (e) => {
        dispatch(removeToCart(e))
    }

    const handleSingleDecrement = (e) => {
        dispatch(removeSingleItems(e))
    }

    const emptycart = () => {
        dispatch(emptyCartItem())
        toast.success("Your cart is empty")
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <div className="card-header-flex">
                        <p>Cart Calculation {carts.length > 0 ? `(${carts.length})` : ""}</p>
                        {carts.length > 0 ? (
                            <button className="btn btn-danger" onClick={emptycart}>
                                <i className="fa fa-trash-alt mr-2"></i>
                                <span>Empty Cart</span>
                            </button>
                        ) : null}
                    </div>
                </div>
                <div className="card-body">
                    {carts.length === 0 ? (
                        <div className="cart-empty">
                            <i className="fa fa-shopping-cart"></i>
                            <p>Your cart is empty</p>
                        </div>
                    ) : (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Action</th>
                                    <th>Product</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Qty</th>
                                    <th className="text-right">Total Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {carts.map((data, index) => {
                                    const { id, title, images, price, qnty } = data
                                    return (
                                        <tr key={index}>
                                            <td data-label="Action">
                                                <button className="prdct-delete" onClick={() => handleDecrement(id)}>
                                                    <i className="fa fa-trash-alt"></i>
                                                </button>
                                            </td>
                                            <td data-label="Product">
                                                <div className="product-img">
                                                    <img src={images[0]} alt={title} />
                                                </div>
                                            </td>
                                            <td data-label="Name">
                                                <div className="product-name">
                                                    <p>{title}</p>
                                                </div>
                                            </td>
                                            <td data-label="Price">${price}</td>
                                            <td data-label="Quantity">
                                                <div className="prdct-qty-container">
                                                    <button
                                                        className="prdct-qty-btn"
                                                        type="button"
                                                        onClick={
                                                            qnty <= 1
                                                                ? () => handleDecrement(id)
                                                                : () => handleSingleDecrement(data)
                                                        }
                                                    >
                                                        <i className="fa fa-minus"></i>
                                                    </button>
                                                    <input
                                                        type="text"
                                                        className="qty-input-box"
                                                        value={qnty}
                                                        disabled
                                                    />
                                                    <button
                                                        className="prdct-qty-btn"
                                                        type="button"
                                                        onClick={() => handleIncrement(data)}
                                                    >
                                                        <i className="fa fa-plus"></i>
                                                    </button>
                                                </div>
                                            </td>
                                            <td data-label="Total" className="text-right">
                                                ${(qnty * price).toFixed(2)}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th colSpan={6}>
                                        <div>
                                            Items in cart: <span className="text-danger">{totalQuantity}</span>
                                        </div>
                                        <div>
                                            Total Price: <span className="text-danger">${totalPrice.toFixed(2)}</span>
                                        </div>
                                    </th>
                                </tr>
                            </tfoot>
                        </table>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Cart
