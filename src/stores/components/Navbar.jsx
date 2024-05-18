import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cartItems } = useCart();
  const [apiData, setApiData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [userData, setUserData] = useState(null);
  const [logout, setLogout] = useState(false); // Define logout state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://192.168.1.163:8093/getCategories')
      .then(response => response.json())
      .then(data => setApiData(data))
      .catch(error => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setLoading(true);
      fetch(`http://192.168.1.163:8093/getDetails/${userId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          return response.json();
        })
        .then(userData => {
          setUserData(userData);
          setLoading(false);
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, []);

  const confirmLogout = () => {
    localStorage.removeItem('userId');
    setUserData(null);
    setLogout(false);
    // alert("Successfully logout");
  };

  return (
    <div className="navbar-section">
      <div className="navSection">
        <Link to='/home' className="custom-link">
          <div className="title">
            <img src="/logo.png" alt="Arzooo" />
          </div>
        </Link>

        <div className="search">
          <input type="text" placeholder="Search..." />
          <button type="submit" className="search-btn">
            <FontAwesomeIcon icon={faSearch} className="find" />
          </button>
        </div>
        <div className="user">
          <div className="user-detail">
            <div className="dropdown">
              <div className="dropdownbtn">
                <FontAwesomeIcon icon={faUser} style={{ fontSize: 25, marginLeft: 16 }} />
                <h6 style={{ marginRight: 10 }}>
                  Hello, {userData && userData.userName}
                </h6>
              </div>
              <div className="dropdown-content">
                <Link to="/profile">My Profile</Link>
                <Link to="/orders">Orders</Link>
                <div className="out" onClick={() => setLogout(true)}>Logout</div>
              </div>
            </div>
          </div>
        </div>
        <Link to='/cart'>
          <div className="cart">
            <FontAwesomeIcon icon={faShoppingCart} style={{ fontSize: 25 }} />
            <span className="num">
              {cartItems.length}
            </span>
          </div>
        </Link>
      </div>
      <div className="subMenu">
        <ul>
          {apiData.map(category => (
            <li key={category.categoryId}>
              <div className="dropdown">
                <div className="dropdownbtn" onMouseEnter={() => setSelectedCategory(category)}>
                  {category.categoryName}
                </div>
                <div className="dropdown-content">
                  {selectedCategory && selectedCategory.categoryId === category.categoryId && (
                    category.subCategories.map(subCategory => (
                      <Link key={subCategory.subCategoryId} to={subCategory.link} className="custom-link">
                        <div>{subCategory.subCategoryName}</div>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {logout && (
        <div className="modal">
          <div className="modal-content">
            <h2>Logout Confirmation</h2>
            <p>Are you sure you want to logout?</p>
            <div className="modal-buttons-1">
              <Link to='/'>
                <button onClick={confirmLogout}>Logout</button>
              </Link>
            </div>
            <div className="modal-buttonss">
              <button onClick={() => setLogout(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
