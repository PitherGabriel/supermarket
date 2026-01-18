import React, { useCallback, useEffect, useRef, useState } from 'react'
import './Categories.css';

import Header from '../../Header';

export default function FarmingProducts() {

  const [categories, setCategories] = useState([]);
  const [farmingOffers, setFarmingOffers] = useState([]);

  // Fetch data from our Node backend
  useEffect(() => {
    fetch('http://localhost:5000/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data));

    fetch('http://localhost:5000/api/categories')
      .then(res => res.json())
      .then(data => setFarmingOffers(data));

  }, []);


  return <div className="farming-page">
    {/* Header Section*/}
    <Header></Header>

    {/* Banner Section */}
    <div className='page-banner-container'>
      <img
        src={(() => {
          const category = categories.find(cat => cat.id === 2);
          return category ? category.banner_url : ""; // Usa image_url, no nombre
        })()}
        className="banner-image"
        loading="lazy"
      />
      {/* Texto superpuesto */}
      <div className="banner-text-overlay">
        <h1>Productos Agropecuarios</h1>
      </div>
    </div>

    {/*Products title section*/}
    <section className="title-section">
      <div className="title-container">
        <h2 className="title">Los mejores productos ganaderos para tus animales</h2>
      </div>
    </section>

    {/*Products grid section*/}
    <section className="offers-section">
      <div className="offers-container">
        <h2 className="offers-section-title">Grid</h2>
        <div className="offers-grid">
          {farmingOffers
            .sort((a, b) => {
              if (a.hasOffer && !b.hasOffer) return -1;
              if (a.hasOffer && b.hasOffer) return 1;
              return 0;
            })
            .map((offer) => (
              <div key={offer.id} className='offer-card'>
                {offer.hasOffer && (
                  <div className='badge-container'>
                    <span className='badge-cheaper'>
                      OFFER
                    </span>
                  </div>
                )}

                <div className='card-image'>
                  <img src={offer.image_url} alt={offer.nombre} />
                </div>

                <div className='card-details'>
                  <h3 className='product-title'>{offer.nombre}</h3>

                  <div className='price-section'>
                    {offer.hasOffer && offer.pvp1_iva && (
                      <span className='original-price'> {offer.pvp1_iva}</span>
                    )}
                    <div className='current-price'>
                      {offer.hasOffer && <span className='offer-label'>OFERTA</span>}
                      <span className='price-amount'>{offer.pvp2_iva}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  </div >;
}