import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInr } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

const Single = () => {
  const [quantity, setQuantity] = useState(1);
  const [apiData, setApiData] = useState([]);
  const { addToCart } = useCart();
  const location = useLocation();
  const navigation = useNavigate();

  useEffect(() => {
    if (location && location.state && location.state.productId) {
      fetch(`http://192.168.1.163:8093/getProducts/${location.state.productId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          return response.json();
        })
        .then((productData) => {
          setApiData([productData]);
        })
        .catch((error) => console.error(error));
    }
  }, [location.state]);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  }

  const handleIncrement = () => {
    handleQuantityChange(quantity + 1);
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      handleQuantityChange(quantity - 1);
    } else {
      alert("Are you sure you want to cancel the order?");
    }
  }

  const handleaddToCart = () => {
    const userId = localStorage.getItem('userId');
    const productId = apiData[0].productId; 
    const totalFee = quantity * apiData[0].price; 
    const orderDetails = {
      productId: productId,
      quantity: quantity,
      totalFee: totalFee,
      userId: userId,
    };

    fetch(`http://192.168.1.163:8093/cart/${userId}/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cartDetails)
    })
  }

  const buyNow = (productId) => {
    const totalAmount = quantity * apiData[0].price; 
    navigation('/now', { state: { productId, quantity, totalAmount } });
  }

  return (
    <>
      <Navbar />
      <div className="body1">
        <div className="ind-section">
          {apiData.map(item => (
            <div key={item.productId}>
              <div className="col-8">
                <div className="ind-image">
                  <img className='image2' src={`data:image/jpeg;base64,${item.image_url}`} alt={item.productName} />
                </div>
              </div>
              <div className="col-9">
                <div className="ind-details space">
                  <div className="ind-company">
                    <h2>{item.productName}</h2>
                  </div>
                  <div className="ind-model space">
                    <h3>{item.description}</h3>
                  </div>
                  <div className="ind-price space">
                    <h2>
                      <FontAwesomeIcon icon={faInr} />
                      {item.price}
                    </h2>
                  </div>
                  <div className="button6">
                    <button className="ba" onClick={handleDecrement}><b>-</b></button>
                    <button className="ba"><b>{quantity}</b></button>
                    <button className="ba" onClick={handleIncrement}><b>+</b></button>
                  </div>
                  <button className="button" onClick={() => buyNow(item.productId)}>Buy Now</button>

                  <div onClick={() => addToCart(item.productId)}>
                  <button className="button" onClick={() =>handleaddToCart(item.productId)}>Add to Cart</button>
                  </div>
                  <br />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Single;
