import React, { useCallback, useEffect, useRef, useState } from 'react'
import './App.css';
import { Link } from 'react-router-dom';
import EmblaCarousel from './EmblaCarousel';
import Header from './Header';


function HomePage() {
    const [categories, setCategories] = useState([]);
    const [offers, setOffers] = useState([]);

    // Fetch data from our Node backend
    useEffect(() => {
        fetch('http://localhost:5000/api/categories')
            .then(res => res.json())
            .then(data => setCategories(data));

        fetch('http://localhost:5000/api/offers')
            .then(res => res.json())
            .then(data => setOffers(data));
    }, []);

    const OPTIONS = { dragFree: true, loop: true }
    const SLIDE_COUNT = 3
    const SLIDES = offers

    return (
        <div className="app">
            {/* Header Section (Circular Icons) */}
            <Header></Header>

            {/* Categories Section (Circular Icons) */}
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
            <EmblaCarousel slides={offers} options={OPTIONS} />
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