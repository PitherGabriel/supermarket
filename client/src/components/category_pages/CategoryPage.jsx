import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';

import Header from '../../Header';
import './Categories.css';
import { data } from 'react-router-dom';

export default function CategoryPage() {
    const { slug } = useParams();
    console.log(slug);
    const [category, setCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState("ALL");
    const [offers, setOffers] = useState([]);
    const [visibleCount, setVisibleCount] = useState(8);

    // Fetch data from our Node backend
    useEffect(() => {
        fetch('http://https://supermarket-cfwf.onrender.com/api/categories')
            .then(res => res.json())
            .then(data => {
                const found = data.find(c => c.slug === slug);
                if (found) setCategory(found);
            });
    }, [slug]);

    useEffect(() => {
        if (!category) return;
        fetch(`http://https://supermarket-cfwf.onrender.com/api/offers/products/${encodeURIComponent(category.nombre.toUpperCase())}`)
            .then(res => res.json())
            .then(data => setOffers(data));
    }, [category]);

    const subcategories = [
        "ALL",
        ...Array.from(new Set(offers.map(o => o.Subcategoria))).filter(Boolean),
    ];

    const filteredOffers =
        selectedSubcategory === "ALL"
            ? offers
            : offers.filter(o => o.Subcategoria === selectedSubcategory);

    if (!category) {
        return <div className="loading">Cargando...</div>;
    }
    return <div className="alcohol-drinks-page">

        {/* Header Section (Circular Icons) */}
        <Header></Header>

        {/* Banner Section */}
        <div className='page-banner-container'>
            <img
                src={category.banner_url}
                className="banner-image"
                loading="lazy"
            />
            {/* Texto superpuesto */}
            <div className="banner-text-overlay">
                <h1>{category.nombre}</h1>
            </div>
        </div>


        {/*Products title section*/}
        <section className="title-section">
            <div className="title-container">
                <h2 className="title">Los mejores productos alcoholicos y bebidas</h2>
            </div>
        </section>

        {/*Products grid section*/}
        <section className="offers-section">
            <div className="offers-container">
                <div className="subcategory-bar">
                    <div className="subcategory-scroll">
                        {subcategories.map((sub) => (
                            <button
                                key={sub}
                                className={`subcategory-btn ${selectedSubcategory === sub ? "active" : ""
                                    }`}
                                onClick={() => {
                                    setSelectedSubcategory(sub);
                                    setVisibleCount(8); // reset grid when switching
                                }}
                            >
                                {sub}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="offers-grid">

                    {filteredOffers
                        .sort((a, b) => {
                            if (a.Oferta && !b.Oferta) return -1;
                            if (a.Oferta && b.Oferta) return 1;
                            return 0;
                        })
                        .slice(0, visibleCount)
                        .map((offer) => (
                            <div key={offer.id} className='offer-card'>
                                {offer.Oferta && (
                                    <div className='badge-container'>
                                        <span className='badge-cheaper'>
                                            DESCUENTO
                                        </span>
                                    </div>
                                )}

                                <div className='card-image'>
                                    <img src={offer.Image_url} alt={offer.Nombre} />
                                </div>

                                <div className='card-details'>
                                    <h3 className='product-title'>{offer.Nombre}</h3>

                                    <div className='price-section'>
                                        {offer.Oferta && offer.PVP1_IVA && (
                                            <span className='original-price'> {offer.PVP1_IVA}</span>
                                        )}
                                        <div className='current-price'>
                                            {offer.Oferta && <span className='offer-label'>DESCUENTO</span>}
                                            <span className='price-amount'>
                                                $ {offer.Oferta ? offer.PVP2_IVA : offer.PVP1_IVA}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
                {visibleCount < filteredOffers.length && (
                    <div className="load-more-container">
                        <button
                            className="load-more-btn"
                            onClick={() => setVisibleCount(prev => prev + 8)}
                        >
                            Ver más
                        </button>
                    </div>
                )}
            </div>
        </section>
    </div >;
}