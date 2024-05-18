import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign, faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Now() {
  const [apiData, setApiData] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const location = useLocation();
  const { productId, quantity } = location.state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://192.168.1.163:8093/getProducts/${productId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const productData = await response.json();
        setApiData(productData);
        setTotalPrice(productData.price * quantity);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [productId, quantity]);

  const handleContinue = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const orderDetails = { productId, quantity, totalPrice };
      const response = await fetch(`http://192.168.1.163:8093/order/${userId}/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderDetails)
      });
      if (!response.ok) {
        throw new Error('Failed to confirm order');
      }
      alert('Your order is confirmed!');
    } catch (error) {
      console.error('Error posting order:', error);
      alert('Failed to confirm order. Please try again later.');
    }
  };

  const handleAddAddress = () => {
    setAddressModalOpen(false);
    alert("Successfully added your address");
  };

  return (
    <div>
      <Navbar />
      <div className="containernow">
        <div className="col-40">
          {apiData && (
            <>
              <div className="col-3">
                <img className="image2" src={`data:image/jpeg;base64,${apiData.image_url}`} alt={apiData.productName} />
              </div>
              <div className="col-4">
                <p>{apiData.productName}</p>
                <p><FontAwesomeIcon icon={faIndianRupeeSign} />{apiData.price}</p>
                <p style={{ marginBottom: '10px' }}>Quantity: {quantity}</p>
              </div>
            </>
          )}
          <hr />
          <h3 className='col-00'>
            <FontAwesomeIcon icon={faMapMarker} style={{ fontSize: 'medium', padding: '15px 10px 0px 10px' }} />
            Delivery Address Information
          </h3>
          <h3 className='col-01' onClick={() => setAddressModalOpen(true)}>Add Address</h3>
        </div>
        <div className="col-30">
          <h3>Price Details</h3>
          <div className="col-5">
            <p className="p" style={{ fontSize: 'larger' }}>Total Price</p>
          </div>
          <div className="col-6">
            <p className="p" style={{ fontSize: 'larger' }}>
              <FontAwesomeIcon icon={faIndianRupeeSign} style={{ fontSize: 'medium' }} />{totalPrice}
            </p>
          </div>
          <button className="button5" onClick={handleContinue}><b>Continue</b></button>
        </div>
      </div>
      {addressModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Address</h2>
            <div className="modal-buttons-1">
              <label className='head'>Address</label>
              <textarea className='input-2'></textarea>
              <button className='add' onClick={handleAddAddress}>Add Address</button>
            </div>
            <div className="modal-buttonss">
              <button className='add-1' onClick={() => setAddressModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Now;
