import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Header from './Header';
import './Categories.css';

export default function CategoryPage() {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState("TODO");
  const [offers, setOffers] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);
  const [imgErrors, setImgErrors] = useState({});

  useEffect(() => {
    setLoading(true);
    fetch('https://supermarket-cfwf.onrender.com/api/categories')
      .then(res => res.json())
      .then(data => {
        const found = data.find(c => c.slug === slug);
        if (found) setCategory(found);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (!category) return;
    fetch(`https://supermarket-cfwf.onrender.com/api/offers/products/${encodeURIComponent(category.nombre.toUpperCase())}`)
      .then(res => res.json())
      .then(data => setOffers(data));
  }, [category]);

  const subcategories = [
    "TODO",
    ...Array.from(new Set(offers.map(o => o.Subcategoria))).filter(Boolean),
  ];

  const filteredOffers =
    selectedSubcategory === "TODO"
      ? offers
      : offers.filter(o => o.Subcategoria === selectedSubcategory);

  const sortedOffers = [...filteredOffers].sort((a, b) => {
    if (a.Oferta && !b.Oferta) return -1;
    if (!a.Oferta && b.Oferta) return 1;
    return 0;
  });

  const handleImgError = (id) => {
    setImgErrors(prev => ({ ...prev, [id]: true }));
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
        <p>Cargando...</p>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="loading-screen">
        <p>Categoría no encontrada.</p>
      </div>
    );
  }

  return (
    <div className="category-page">
      <Header />

      {/* ── Banner ── */}
      <div className="page-banner-container">
        <img
          src={category.banner_url}
          className="banner-image"
          loading="lazy"
          alt={category.nombre}
        />
        <div className="banner-gradient" />
        <div className="banner-text-overlay">
          <span className="banner-eyebrow">Categoría</span>
          <h1 className="banner-title">{category.nombre}</h1>
        </div>
      </div>

      {/* ── Description ── */}
      <section className="title-section">
        <p className="title-description">{category.descripcion}</p>
      </section>

      {/* ── Products ── */}
      <section className="offers-section">
        <div className="offers-container">

          {/* Subcategory pills */}
          <div className="subcategory-bar">
            <div className="subcategory-scroll">
              {subcategories.map((sub) => (
                <button
                  key={sub}
                  className={`subcategory-btn${selectedSubcategory === sub ? " active" : ""}`}
                  onClick={() => {
                    setSelectedSubcategory(sub);
                    setVisibleCount(8);
                  }}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p className="results-count">
            {filteredOffers.length} producto{filteredOffers.length !== 1 ? "s" : ""}
            {selectedSubcategory !== "TODO" ? ` en "${selectedSubcategory}"` : ""}
          </p>

          {/* Grid */}
          <div className="offers-grid">
            {sortedOffers.slice(0, visibleCount).map((offer) => (
              <div key={offer.id} className="offer-card">

                {offer.Oferta && (
                  <div className="badge-discount">DESCUENTO</div>
                )}

                <div className="card-image">
                  {imgErrors[offer.id] ? (
                    <div className="img-placeholder">Sin imagen</div>
                  ) : (
                    <img
                      src={offer.Image_url}
                      alt={offer.Nombre}
                      onError={() => handleImgError(offer.id)}
                    />
                  )}
                </div>

                <div className="card-details">
                  <p className="product-subcategory">{offer.Subcategoria}</p>
                  <h3 className="product-title">{offer.Nombre}</h3>

                  <div className="price-section">
                    {offer.Oferta && offer.PVP1_IVA && (
                      <span className="original-price">
                        ${offer.PVP1_IVA.toFixed(2)}
                      </span>
                    )}
                    <div className="current-price-row">
                      <span className="price-amount">
                        ${(offer.Oferta ? offer.PVP2_IVA : offer.PVP1_IVA).toFixed(2)}
                      </span>
                      {offer.Oferta && offer.PVP1_IVA && (
                        <span className="savings-badge">
                          -{((1 - offer.PVP2_IVA / offer.PVP1_IVA) * 100).toFixed(0)}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load more */}
          {visibleCount < sortedOffers.length && (
            <div className="load-more-container">
              <button
                className="load-more-btn"
                onClick={() => setVisibleCount(prev => prev + 8)}
              >
                Ver más productos
                <span className="load-more-count">
                  ({sortedOffers.length - visibleCount} restantes)
                </span>
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}