import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
    const [apiData, setApiData] = useState([]);
    const [bannerImages, setBannerImages] = useState([]);
    const navigation = useNavigate();

    useEffect(() => {
        fetchData();
        fetchBannerImages();
    }, [])

    async function fetchData() {
        try {
            const response = await fetch('http://192.168.1.163:8093/getProducts');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setApiData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async function fetchBannerImages() {
        try {
            const response = await fetch('http://192.168.1.163:8093/getAllBanner');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const imagesData = await response.json();
            setBannerImages(imagesData);
        } catch (error) {
            console.error('Error fetching banner images:', error);
        }
    }

    const handlingProductId = (productId) => {
        console.log(productId);
        navigation("/single", { state: { productId } });
    }

    return (
        <>
            <Navbar />
            <div className="bannerContainer">
                {bannerImages.map((item, index) => (
                    <img key={index} className='bannerImage' src={`data:image/jpeg;base64,${item.image_url}`} alt={`Banner ${index}`} />
                ))}
            </div>
            <div className="fullpage">
                <div className='pageSection'>   
                    {apiData.length > 0 ? (
                        apiData.map((item) => (
                            <div key={item.productId}>
                                    <div className="pageImg">
                                        <img className='productImage' src={`data:image/jpeg;base64,${item.image_url}`} alt={item.productName} onClick={() => handlingProductId(item.productId)} />
                                    </div>
                                <div className="proModel">
                                    {item.productName}
                                </div>
                                <div className="proModel2">
                                    <FontAwesomeIcon icon={faIndianRupeeSign} />
                                    {item.price}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default HomePage;
