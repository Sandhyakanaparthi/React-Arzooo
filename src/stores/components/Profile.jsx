import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';
import Footer from './Footer';

const Profile = () => {
    const [item, setItem] = useState(null);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newAddress, setNewAddress] = useState('');
    const location = useLocation();
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        phoneNo: '',
        address: ''
    });

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
                    setItem(userData);
                    setFormData(userData);
                    setLoading(false);
                })
                .catch(error => {
                    setError(error.message);
                    setLoading(false);
                });
        }
    }, [location.state]);

    const handleInputChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');
        fetch(`http://192.168.1.163:8093/update/${userId}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update user details');
                }
                return response.json();
            })
            .then(updatedUserData => {
                setItem(updatedUserData); 
                setEditing(false);
                alert('Changes saved successfully!');
            })
            .catch(error => {
                console.error('Error updating user details:', error);
                alert('Failed to save changes. Please try again later.');
            });
    };

    const handleAddAddressClick = () => {
        setShowAddressForm(true);
    };

    return (
        <>
            <Navbar />
            <div className='container-profile'>
                <div className='profile'>
                    <h2>Personal Information</h2>
                </div>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {item && (
                    <>
                        {editing ? (
                            <div >
                                <form onSubmit={handleSubmit}>
                                    <label>
                                        <h4 className='head'> Name: </h4>
                                        <input className='input-1'
                                            type="text"
                                            name='userName'
                                            value={formData.userName}
                                            onChange={handleInputChange} />
                                    </label>
                                    <label>
                                        <h4 className='head'>Email:</h4>
                                        <input className='input-1'
                                            type="email"
                                            name='email'
                                            value={formData.email}
                                            onChange={handleInputChange} />
                                    </label>
                                    <label >
                                        <h4 className='head'>Phone No:</h4>
                                        <input className='input-1'
                                            type="number"
                                            name='phoneNo'
                                            value={formData.phoneNo}
                                            onChange={handleInputChange} />
                                    </label>
                                    <label>
                                        <h4 className='head'>Address:</h4>
                                        <input className='input-1'
                                            type="text"
                                            name='address'
                                            value={formData.address}
                                            onChange={handleInputChange} />
                                    </label>
                                    <button className='add'>Save</button>
                                    <button className='add-1' onClick={() => setEditing(false)}>Cancel</button>
                                </form>
                            </div>
                        ) : (
                            <>
                                <h4 className='head'>Name: </h4>
                                <p className='input-2'> {item.userName}</p>
                                <h4 className='head'>Email:</h4>
                                <p className='input-2'>{item.email}</p>
                                <h4 className='head'>Phone No:</h4>
                                <p className='input-2'>{item.phoneNo}</p>
                                <h4 className='head'>Address:</h4>
                                <p className='input-2'>{item.address}</p>
                                <Link to="/">
                                    <h4 className='head'><FontAwesomeIcon icon={faPowerOff} />Logout</h4>
                                </Link>
                                <button className='add' onClick={() => setEditing(true)}>Edit</button>
                                {/* <button className='add-1' onClick={handleAddAddressClick}><b>Add Address</b></button> */}
                            </>
                        )}
                    </>
                )}
            </div>

            {/* {showAddressForm && (
                <div className='container-profile'>
                    <form onSubmit={handleSave}>
                        <h2 className='profile'>Add New Address</h2>
                        <textarea
                            className='new'
                            placeholder="Enter your new address"
                            value={newAddress}
                            onChange={(e) => setNewAddress(e.target.value)} />
                        <br />
                        <button className='add'>Submit</button>
                        <button className='add-1'>Cancel</button>
                    </form>
                </div>
            )} */}
            <Footer />
        </>
    );
};

export default Profile;
