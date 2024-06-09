import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '../Css/Slider.css';

const ImageSlider = ({ eventoImagenes }) => {
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const [nav3, setNav3] = useState(null);
    const [countImages, setCountImages] = useState(0);

    useEffect(() => {
        setCountImages(eventoImagenes.length);
        setNav1(nav1);
        setNav2(nav2);
        setNav3(nav3);
    }, [nav1, nav2, nav3, eventoImagenes]);

    const importImage = (ruta) => {
        return new URL(`../assets/${ruta}`, import.meta.url).href;
    };

    return (
        <div className="slider-container">
            {/* Slider de ordenador */}
            <div className="desktop-slider">
                <Slider
                    asNavFor={nav2}
                    ref={slider => (setNav1(slider))}
                    arrows={false}
                    className="main-slider"
                >
                    {eventoImagenes.map((imagen, index) => (
                        <div key={index}>
                            <img src={importImage(imagen.ruta)} alt={`Slide ${index}`} />
                        </div>
                    ))}
                </Slider>
                <Slider
                    asNavFor={nav1}
                    ref={slider => (setNav2(slider))}
                    slidesToShow={countImages}
                    swipeToSlide={true}
                    focusOnSelect={true}
                    className="thumbnail-slider"
                >
                    {eventoImagenes.map((imagen, index) => (
                        <div key={index}>
                            <img src={importImage(imagen.ruta)} alt={`Thumbnail ${index}`} />
                        </div>
                    ))}
                </Slider>
            </div>
            {/* Slider de movil */}
            <div className="mobile-slider">
                <Slider
                    ref={slider => (setNav3(slider))}
                    arrows={false}
                    className="main-slider"
                    dots={true}
                >
                    {eventoImagenes.map((imagen, index) => (
                        <div key={index}>
                            <img src={importImage(imagen.ruta)} alt={`Slide ${index}`} />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default ImageSlider;
