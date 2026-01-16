import React, { useCallback, useEffect, useRef, useState } from 'react'
import './Categories.css';

import Header from '../../Header';

export default function FarmingProducts() {

  const [categories, setCategories] = useState([]);

  // Fetch data from our Node backend
  useEffect(() => {
    fetch('http://localhost:5000/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data));
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
        <h2 className="alcohol-section-title">Grid</h2>
        <div className="offers-grid">
        </div>
      </div>
    </section>

  </div >;
}