import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faLinkedin, faTwitter, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import "../../../src/App.css";

function Footer() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await    fetch('http://192.168.1.163:8093/getCategories')

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <footer className="foot">
      <div className="col-20">
        <img src="/logo.png" alt="Arzooo" />
        <p>Arzooo is India's largest and fastest-growing retail tech start-up organizing the highly fragmented
          physical retail and digitalizing them. It is a B2B platform that helps small retail stores to compete
          against retail giants.</p>
      </div>
      <div className="col-20">
        <h1>Our Products</h1>
        {products.map((product, index) => (
          <Link key={index} to={product.link}>
            <p className="prodf"><FontAwesomeIcon icon={faCaretRight} style={{ paddingRight: 20 }} />{product.categoryName}</p>
          </Link>
        ))}
      </div>
      <div className="col-20">
        <h1>Address</h1>
        <div style={{paddingRight:80}}>
          <p><FontAwesomeIcon icon={faLocationDot} style={{ paddingRight: 10 }} />96/1, Srinivasa Nagar, AECS Layout,
            Singasandra, Bengaluru, Karnataka 560068</p>
          <p><FontAwesomeIcon icon={faPhone} style={{ paddingRight: 10 }} />99710 94095</p>
          <FontAwesomeIcon icon={faFacebook} className="contact" />
          <FontAwesomeIcon icon={faLinkedin} className="contact" />
          <FontAwesomeIcon icon={faXTwitter} className="contact" />
          <FontAwesomeIcon icon={faInstagram} className="contact" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
