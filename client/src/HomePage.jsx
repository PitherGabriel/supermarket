import React, { useCallback, useEffect, useRef, useState } from 'react'
import './App.css';
import { Link } from 'react-router-dom';
import EmblaCarousel from './EmblaCarousel';
import Header from './Header';
import Slider from './slider';
import './slider.css';

function HomePage() {
    const [categories, setCategories] = useState([]);
    const [offers, setOffers] = useState([]);

    // Fetch data from our Node backend
    useEffect(() => {
        fetch('https://supermarket-cfwf.onrender.com/api/categories')
            .then(res => res.json())
            .then(data => setCategories(data));

        fetch('https://supermarket-cfwf.onrender.com/api/offers')
            .then(res => res.json())
            .then(data => setOffers(data));
    }, []);

    const OPTIONS = { dragFree: true, loop: true }
    const SLIDE_COUNT = 3
    const SLIDES = offers

    // Custom options (optional)
    const sliderOptions = {
        type: 'carousel', // or 'slider'
        startAt: 0,
        perView: 1,
        gap: 20,
        autoplay: 5000, // auto-advance every 3 seconds
        hoverpause: true,
        breakpoints: {
            1024: { perView: 2 },
            600: { perView: 1 }
        }
    }

    return (
        <div className="app">
            {/* Header Section (Circular Icons) */}
            <Header></Header>
            {offers.length > 0 && (
                <div className="slider-example">
                    <Slider options={sliderOptions}>
                        {offers.map((offer, index) => (
                            <div className="slide-content" key={index}>
                                <div
                                    className="slide-bg"
                                    style={{ backgroundImage: `url(${offer.image_url})` }}
                                />
                                <img
                                    src={offer.image_url}
                                    alt={offer.title || `Slide ${index + 1}`}
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            )}

            {/* Categories Section (Circular Icons) */}
            <div className='category-title'><h1>Categorias destacadas</h1></div>
            <section className="categories-section">
                <div className="container">
                    <div className="category-grid">
                        {categories.map((cat) => (
                            <div key={cat.id} className="category-item">
                                <div className="icon">
                                    <Link to={`categoria/${cat.slug}`}>
                                        <img
                                            src={cat.icono}
                                            className="category-icon"
                                            alt={cat.nombre}
                                            loading="lazy" >
                                        </img>
                                    </Link>
                                </div>
                                <span>{cat.nombre}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/*Carousel*/}
            {/*<EmblaCarousel slides={offers} options={OPTIONS} />*/}
            {/* Weekly Offers Grid */}
            <section className="main-offers-section">
                <div className="container">
                    <h2 className="section-title">Descubre nuestras ofertas</h2>
                    <div className="offers-grid">
                        {offers.map((offer) => (
                            <div key={offer.id} className="offer-card">
                                <div className="card-image">
                                    <span className="badge">OFFER</span>
                                    <img src={offer.image} alt={offer.title} />
                                </div>
                                <div className="card-details">
                                    <span className="category-tag">{offer.category}</span>
                                    <h3>{offer.title}</h3>
                                    <p>{offer.description}</p>
                                    <div className="price-tag">{offer.price}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Footer */}
            <footer className="footer">
                <p>&copy; 2026 Centro Comercial TB</p>
            </footer>
        </div>
    );
}

export default HomePage;