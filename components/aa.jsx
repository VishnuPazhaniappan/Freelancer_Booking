import React, { useEffect, useState } from 'react';
import './aa.css';
import { useNavigate } from 'react-router-dom';
import styles from './aa.module.css';
import cleaner from './assets/cleaner.jpg';
import painter from './assets/painter.jpg';
import carpenter from './assets/carpender.jpg';
import plumber from './assets/plumber.jpg';
import roofing from './assets/roofing.jpg';
import electrician from './assets/electrision.jpg';

const images = [
    { src: cleaner, link: '/link1', alt: 'Cleaner', name: "Cleaner" },
    { src: roofing, link: '/link2', alt: 'Roofer', name: "Roofer" },
    { src: carpenter, link: '/link3', alt: 'Carpenter', name: "Carpenter" },
    { src: plumber, link: '/plumber', alt: 'Plumber', name: "Plumber" },
    { src: painter, link: '/link5', alt: 'Painter', name: "Painter" },
    { src: electrician, link: '/link6', alt: 'Electrician', name: "Electrician" },
];

export default function Aa() {
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');
        setUserName(storedUserName || '');
    }, []);

    const handleClientForm = () => {
        navigate('/profile');
    };

    const handleClientForm3 = () => {
        navigate('/chat');
    };

    // Handle image clicks and navigate to the corresponding page
    const handleImageClick = (link) => {
        navigate(link);
    };

    return (
        <div>
            <div className={styles.name}>
                <h1><b>Freelancer Booking</b></h1>
                {userName && <div className="user-info">Hello, {userName}!</div>}
            </div>

            <div className="button-container">
                <button onClick={() => window.location.hash = '#home'}>Home</button>
                <button onClick={handleClientForm3}>Bot</button>
                <button onClick={() => window.location.hash = '#support'}>Your Activities</button>
                <button onClick={handleClientForm}>Profile</button>
            </div>

            <div className="content1">
                <h1>Workers Available</h1>
                <p>This is the main content area. Add your content here.</p>
            </div>

            <div className="image-row">
                {images.map((image, index) => (
                    <div className="rectangle-column" key={index}>
                        <img src={image.src} alt={image.alt} className="img-fluid" onClick={() => handleImageClick(image.link)} />
                        <h2><center>{image.name}</center></h2>
                    </div>
                ))}
            </div>
        </div>
    );
}