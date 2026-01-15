import React, { useEffect, useState } from 'react';
import './App.css';
import { FaSearch, FaBars, FaShoppingBasket, FaMapMarkerAlt } from 'react-icons/fa';
import EmblaCarousel from './EmblaCarousel';
import logo_tb from './assests/logo_tb.png'

function App() {
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

  return (
    <div className="app">
      {/* Main Navigation */}
      <nav className="navbar">
        <div className="container nav-container">
          <div className="logo">
            <img src={logo_tb} alt="Logo" className="logo-image" />
          </div>

          <div className="search-bar">
            <input type="text" placeholder="¿Qué estas buscando?" />
          </div>

          <div className="nav-icons">
            {/* Informational only - no login logic */}
            <div className="icon-item"><FaBars /></div>
          </div>
        </div>
      </nav>

      {/* Categories Section (Circular Icons) */}
      <section className="categories-section">
        <div className="container">
          <div className="category-grid">
            {categories.map((cat) => (
              <div key={cat.id} className="category-item">
                <div className="icon">
                  <img src={cat.image_url} className="category-icon"
                    alt={cat.categoria}
                    loading="lazy" ></img>
                </div>
                <span>{cat.categoria}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*Carousel*/}
      <EmblaCarousel slides={offers} options={OPTIONS} />
      {/* Weekly Offers Grid */}
      <section className="offers-section">
        <div className="container">
          <h2 className="section-title">Weekly Highlights</h2>
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

export default App;