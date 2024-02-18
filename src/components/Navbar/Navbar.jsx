import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { filterSearchItems } from "../../features/productSlice";

const Navbar = () => {
  const { carts } = useSelector((state) => state.cart);
  const { searchItems } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(filterSearchItems(e.target.value));
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        Shop Now
      </Link>

      <div className="searchBox">
        <input
          type="text"
          placeholder="Search..."
          value={searchItems}
          onChange={handleSearch}
          className="searchInput"
        />
      </div>

      <Link to="/cart" className="cart">
        <div className="cartContainer">
          <i className="fa fa-shopping-cart cartIcon"></i>
          <span className="cartItemCount">{carts.length}</span>
        </div>
      </Link>
    </nav>
  );
};

export default Navbar;
