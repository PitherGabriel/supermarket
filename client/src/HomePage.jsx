import React, { useEffect, useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import Slider from './components/slider';


const API_BASE = 'https://supermarket-cfwf.onrender.com/api';

// ── Skeleton loaders ──────────────────────────────────────
function CategorySkeleton() {
  return (
    <div className="category-item skeleton-item">
      <div className="skeleton skeleton-icon" />
      <div className="skeleton skeleton-label" />
    </div>
  );
}

function OfferCardSkeleton() {
  return (
    <div className="offer-card skeleton-card">
      <div className="skeleton skeleton-card-img" />
      <div className="skeleton-card-body">
        <div className="skeleton skeleton-text short" />
        <div className="skeleton skeleton-text" />
        <div className="skeleton skeleton-text medium" />
        <div className="skeleton skeleton-price" />
      </div>
    </div>
  );
}

// ── Scroll-to-top button ──────────────────────────────────
function ScrollTopBtn() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return visible ? (
    <button
      className="scroll-top-btn"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Volver arriba"
    >
      ↑
    </button>
  ) : null;
}

// ── Main component ────────────────────────────────────────
export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const [loadingOffers, setLoadingOffers] = useState(true);
  const [visibleOffers, setVisibleOffers] = useState(8);

  useEffect(() => {
    fetch(`${API_BASE}/categories`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(console.error)
      .finally(() => setLoadingCats(false));

    fetch(`${API_BASE}/offers`)
      .then(res => res.json())
      .then(data => setOffers(data))
      .catch(console.error)
      .finally(() => setLoadingOffers(false));
  }, []);

  const sliderOptions = {
    type: 'carousel',
    startAt: 0,
    perView: 1,
    gap: 20,
    autoplay: 5000,
    hoverpause: true,
  };

  return (
    <div className="app">
      {/* ── Header (navbar) — always first ── */}
      <Header />

      {/* ── Promo strip ── 
      <div className="promo-strip">
        <span>🚚 Envío gratis en compras mayores a $50</span>
        <span className="strip-divider">|</span>
        <span>⭐ Nuevas ofertas cada semana</span>
        <span className="strip-divider">|</span>
        <span>🛡️ Compra segura garantizada</span>
      </div>
      */}

      {/* ── Hero banner ── */}
      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-eyebrow">Bienvenido a Centro Comercial TB</p>
          <h1 className="hero-title">
            Las mejores<br />
            <span className="hero-accent">ofertas</span> te esperan
          </h1>
          <p className="hero-subtitle">
            Descubre productos de calidad, descuentos exclusivos y todo lo que necesitas en un solo lugar.
          </p>
          <div className="hero-actions">
            <a href="#ofertas" className="btn-primary">Ver ofertas</a>
            <a href="#categorias" className="btn-secondary">Explorar categorías</a>
          </div>
        </div>
        <div className="hero-decoration">
          <div className="hero-blob blob-1" />
          <div className="hero-blob blob-2" />
          <div className="hero-badge">
            <span className="hero-badge-number">100+</span>
            <span className="hero-badge-label">productos<br/>en oferta</span>
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="categories-section" id="categorias">
        <div className="section-header">
          <h2 className="section-title">Explora por categoría</h2>
          <p className="section-subtitle">Encuentra exactamente lo que buscas</p>
        </div>
        <div className="category-grid">
          {loadingCats
            ? Array.from({ length: 6 }).map((_, i) => <CategorySkeleton key={i} />)
            : categories.map((cat) => (
                <Link
                  to={`categoria/${cat.slug}`}
                  key={cat.id}
                  className="category-item"
                >
                  <div className="category-icon-wrap">
                    <img
                      src={cat.icono}
                      className="category-icon"
                      alt={cat.nombre}
                      loading="lazy"
                    />
                  </div>
                  <span className="category-label">{cat.nombre}</span>
                </Link>
              ))
          }
        </div>
      </section>

      {/* ── Slider ── */}
      {offers.length > 0 && (
        <section className="slider-section">
          <div className="section-header">
            <h2 className="section-title">Ofertas destacadas</h2>
            <p className="section-subtitle">No te pierdas estas promociones</p>
          </div>
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
                    alt={offer.title || `Oferta ${index + 1}`}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </section>
      )}

      {/* ── Offers grid ── */}
      <section className="main-offers-section" id="ofertas">
        <div className="section-header">
          <h2 className="section-title">Descubre nuestras promociones del mes</h2>
          <p className="section-subtitle">Precios increíbles todos los días</p>
        </div>

        {loadingOffers ? (
          <div className="offers-grid">
            {Array.from({ length: 8 }).map((_, i) => <OfferCardSkeleton key={i} />)}
          </div>
        ) : offers.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">🛒</span>
            <p>No hay ofertas disponibles por el momento.</p>
            <span>Vuelve pronto para ver las novedades.</span>
          </div>
        ) : (
          <>
            <div className="offers-grid">
              {offers.slice(0, visibleOffers).map((offer) => (
                <div key={offer.id} className="offer-card">
                  <div className="card-image">
                    {offer.Oferta && <span className="badge">OFERTA</span>}
                    <img
                      src={offer.image_url || offer.Image_url || offer.image}
                      alt={offer.Nombre || offer.title}
                      loading="lazy"
                      onError={e => { e.target.style.opacity = '0.3'; }}
                    />
                  </div>
                  <div className="card-details">
                    {(offer.Subcategoria || offer.category) && (
                      <span className="category-tag">
                        {offer.Subcategoria || offer.category}
                      </span>
                    )}
                    <h3 className="offer-title">{offer.Nombre || offer.title}</h3>
                    <div className="price-row">
                      {offer.PVP1_IVA && offer.Oferta && (
                        <span className="original-price">${offer.PVP1_IVA.toFixed(2)}</span>
                      )}
                      <span className="price-tag">
                        ${(offer.Oferta ? offer.PVP2_IVA : offer.PVP1_IVA || offer.price || '—')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {visibleOffers < offers.length && (
              <div className="load-more-wrap">
                <button
                  className="load-more-btn"
                  onClick={() => setVisibleOffers(v => v + 8)}
                >
                  Ver más ofertas
                  <span className="load-more-count">
                    ({offers.length - visibleOffers} restantes)
                  </span>
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* ── Trust strip ── 
      <section className="trust-section">
        {[
          { icon: '🚚', title: 'Envío rápido', desc: 'Recibe tu pedido en tiempo récord' },
          { icon: '✅', title: 'Calidad garantizada', desc: 'Productos seleccionados con cuidado' },
          { icon: '💳', title: 'Pago seguro', desc: 'Transacciones 100% protegidas' },
          { icon: '🔄', title: 'Devoluciones fáciles', desc: 'Sin complicaciones, sin preguntas' },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="trust-card">
            <span className="trust-icon">{icon}</span>
            <strong className="trust-title">{title}</strong>
            <p className="trust-desc">{desc}</p>
          </div>
        ))}
      </section>
      */}
      {/* ── Footer ── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <p className="footer-name">Centro Comercial TB</p>
            <p className="footer-tagline">Tu supermercado de confianza</p>
          </div>
          <div className="footer-links">
            <Link to="/">Inicio</Link>
            {categories.slice(0, 4).map(cat => (
              <Link key={cat.id} to={`categoria/${cat.slug}`}>{cat.nombre}</Link>
            ))}
          </div>
          <div className="footer-bottom">
            <p>© 2026 Centro Comercial TB. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      <ScrollTopBtn />
    </div>
  );
}