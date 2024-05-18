import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInr } from '@fortawesome/free-solid-svg-icons';


const Orders = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            fetch(`http://192.168.1.163:8093/getDetails/${userId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
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

    return (
        <>
            <Navbar />
                <h2 className='y-cart'>
                    Orders
                </h2>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {userData && (
                    <div>
                        {userData.ordersEntity.map(order => (
                            <div className='cart-section-1' key={order.orderId}>
                                <div className="cart-img">
                                    <img className='image2' src={order.productEntity.image_url} alt={order.productEntity.productName} />
                                </div>
                                <div className="cart-details">
                                    <h3>{order.productEntity.productName}</h3>
                                    <h2>
                                    <FontAwesomeIcon icon={faInr} />
                                        {order.productEntity.price}
                                    </h2>
                                    <h3>{order.productEntity.description}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            <Footer />
        </>
    );
};

export default Orders;
