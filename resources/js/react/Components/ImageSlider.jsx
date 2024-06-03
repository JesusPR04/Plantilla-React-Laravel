import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '../Css/Slider.css';

import img1 from '../assets/concierto.jpg';
import img2 from '../assets/imgPeticion.jpg';
import img3 from '../assets/sectionImg.jpg';

const ImageSlider = () => {
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const [nav3, setNav3] = useState(null); // For mobile slider

    const images = [
        img1,
        img2,
        img3,
    ];

    useEffect(() => {
        setNav1(nav1);
        setNav2(nav2);
        setNav3(nav3); // For mobile slider
    }, [nav1, nav2, nav3]);

    return (
        <div className="slider-container">
            {/* Desktop Slider */}
            <div className="desktop-slider">
                <Slider
                    asNavFor={nav2}
                    ref={slider => (setNav1(slider))}
                    arrows={false}
                    className="main-slider"
                >
                    {images.map((src, index) => (
                        <div key={index}>
                            <img src={src} alt={`Slide ${index}`} />
                        </div>
                    ))}
                </Slider>
                <Slider
                    asNavFor={nav1}
                    ref={slider => (setNav2(slider))}
                    slidesToShow={3}
                    swipeToSlide={true}
                    focusOnSelect={true}
                    className="thumbnail-slider"
                >
                    {images.map((src, index) => (
                        <div key={index}>
                            <img src={src} alt={`Thumbnail ${index}`} />
                        </div>
                    ))}
                </Slider>
            </div>

            {/* Mobile Slider */}
            <div className="mobile-slider">
                <Slider
                    ref={slider => (setNav3(slider))}
                    arrows={false}
                    className="main-slider"
                    dots={true}
                >
                    {images.map((src, index) => (
                        <div key={index}>
                            <img src={src} alt={`Slide ${index}`} />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default ImageSlider;
