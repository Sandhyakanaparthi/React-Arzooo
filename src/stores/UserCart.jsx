// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useCart } from './context/CartContext';
// import Navbar from './components/Navbar';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faInr } from '@fortawesome/free-solid-svg-icons';

// const UserCart = () => {
//     const { cartItems, removeFromCart } = useCart();
//     const [removeItem, setRemoveItem] = useState(null);
//     const [apiData, setApiData] = useState([]);
//     const location = useLocation();
//     const navigate = useNavigate();

//     useEffect(() => {
//         const userId = localStorage.getItem('userId');
//         if (userId) {
//             fetch(`http://192.168.1.163:8093/getCartWithUser/{userId}/`)
//                 .then((response) => {
//                     if (!response.ok) {
//                         throw new Error('Failed to fetch data');
//                     }
//                     return response.json();
//                 })
//                 .then((productData) => {
//                     setApiData(productData);
//                 })
//                 .catch((error) => console.error(error));
//         }
//     }, [location.state]);

//     const handleRemoveItem = item => {
//         setRemoveItem(item);
//     };

//     const confirmRemove = () => {
//         if (removeItem) {
//             removeFromCart(removeItem);
//             setRemoveItem(null);
//             alert("Successfully removed one item from your cart");
//         }
//     };

//     const handlingProductId = (productId) => {
//         console.log('ProductID:', productId);
//     };

//     return (
//         <>
//             <Navbar />
//             <div>
//                 <h2 className='y-cart'>Your Cart</h2>
//                 {cartItems.length === 0 ? (
//                     <p className='empty'>Your Cart is Empty</p>
//                 ) : (
//                     <div>
//                         {cartItems.map((item, index) => (
//                             <div className='cart-section' key={index}>
//                                 <div className="cart-img">
//                                     <img className='image2' src={`data:image/jpeg;base64,${item.image_url}`} alt={item.productName} onClick={() => handlingProductId(item.productId)} />
//                                 </div>
//                                 <div className="cart-details">
//                                     <h3>{item.cart.userEntity.productsEntity.product}</h3>
//                                     <h2>
//                                         <FontAwesomeIcon icon={faInr} />
//                                         {item.price}
//                                     </h2>
//                                     <h3>{item.model}</h3>
//                                 </div>
//                                 <button className='removeBtn' onClick={() => handleRemoveItem(item)}>Remove</button>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//             {removeItem && (
//                 <div className="modal">
//                     <div className="modal-content">
//                         <h2>Remove item</h2>
//                         <p>Are you sure you want to remove this item?</p>
//                         <div className="modal-buttons">
//                             <button onClick={confirmRemove}>Remove</button>
//                             <button onClick={() => setRemoveItem(null)}>Cancel</button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default UserCart;

// UserCart.js
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// import { useCart } from './CartContext';

const UserCart = () => {
    const { cartItems } = useCart(); 

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            fetch(`http://192.168.1.163:8093/getCartWithUser/${userId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    return response.json();
                })
                .then(userData => {
                    setUserData(userData);
                    setLoading(false); // Set loading to false after data is fetched
                })
                .catch(error => {
                    setError(error.message);
                    setLoading(false); // Set loading to false on error
                });
        }
    }, []);

    return (
        <>
            <Navbar />
            <div className="container">
                <h2 className="y-cart">Cart</h2>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {userData && userData.orderEntity.length > 0 ? (
                    <div>
                        {userData.orderEntity.map(cart => (
                            <div className='cart-section-1' key={cart.orderId}>
                                <div className="cart-img">
                                    <img className='image2' src={cart.productEntity.image_url} alt={cart.productEntity.productName} />
                                </div>
                                <div className="cart-details">
                                    <h3>{cart.productEntity.productName}</h3>
                                    <h2>{cart.productEntity.price}</h2>
                                    <h3>{cart.productEntity.description}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No items in the cart.</p>
                )}
            </div>
            <Footer />
        </>
    );
};

export default UserCart;
