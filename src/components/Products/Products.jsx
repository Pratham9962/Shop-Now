import React, { useEffect } from "react";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import { STATUSES, fetchProducts } from "../../features/productSlice";
import { addToCart } from "../../features/cartSlice";
import Star from "./Star";

const Product = () => {

  const { data: products, status, searchItems } = useSelector((state) => state.product);

  const filteredItems = products.filter((item) => item.title.toLowerCase().includes(searchItems.toLowerCase()));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handleAdd = (product) => {
    dispatch(addToCart(product));
  };

  if (status === STATUSES.LOADING) {
    return <h2>Loading...</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }

  return (
    <div className="products">
      <h1>Product Catalog</h1>
      <div className="products_wrapper">
        {filteredItems.map((product) => (
          <div key={product.id} className="productCard">
            <img src={product.images[0]} alt={product.title} className="productImage" />
            <div className="productTitle">
              <h3>{product.title}</h3>
            </div>
            <div className="productPrice">
              <span>${product.price}</span>
            </div>
            <div className="product-rating">
              <Star stars={product.rating} />
            </div>
            <button onClick={() => handleAdd(product)} className="addButton">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
