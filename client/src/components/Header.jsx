import { useState, useEffect, useRef, useCallback } from 'react';
import logo_tb from '../assests/logo_tb.png';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const API_BASE = 'https://supermarket-cfwf.onrender.com/api';

export default function Header() {
  const [showNavbar, setShowNavbar]       = useState(true);
  const [scrolled, setScrolled]           = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen]   = useState(false);
  const [searchQuery, setSearchQuery]     = useState('');
  const [logoAnimated, setLogoAnimated]   = useState(false);
  const [categories, setCategories]       = useState([]);

  const lastScrollY   = useRef(0);
  const searchInputRef = useRef(null);
  const navigate      = useNavigate();

  // ── Fetch categories for sidebar ──────────────────────
  useEffect(() => {
    fetch(`${API_BASE}/categories`)
      .then(r => r.json())
      .then(setCategories)
      .catch(() => {});
  }, []);

  // ── Scroll handler (stale-closure safe with useRef) ───
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const docH     = document.documentElement.scrollHeight - window.innerHeight;

        // hide/show navbar
        if (currentY > lastScrollY.current && currentY > 100) {
          setShowNavbar(false);
        } else {
          setShowNavbar(true);
        }

        // blur effect threshold
        setScrolled(currentY > 20);

        // progress bar
        setScrollProgress(docH > 0 ? Math.min((currentY / docH) * 100, 100) : 0);

        lastScrollY.current = currentY;
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Sidebar: lock body scroll & Escape key ────────────
  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isSidebarOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setIsSidebarOpen(false);
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // ── Focus search input when opened ───────────────────
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  // ── Handlers ─────────────────────────────────────────
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(v => !v);
    setIsSearchOpen(false);
  }, []);

  const toggleSearch = useCallback(() => {
    setIsSearchOpen(v => !v);
    if (!isSearchOpen) setSearchQuery('');
  }, [isSearchOpen]);

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearchOpen(false);
    navigate(`/buscar?q=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery('');
  }, [searchQuery, navigate]);

  const handleLogoClick = () => {
    setLogoAnimated(true);
    setTimeout(() => setLogoAnimated(false), 700);
  };

  const closeSidebar = () => setIsSidebarOpen(false);

  // ── Render ────────────────────────────────────────────
  return (
    <header className="header-root">

      {/* ── Navbar ── */}
      <nav className={[
        'navbar',
        showNavbar  ? 'navbar-visible' : 'navbar-hidden',
        scrolled    ? 'navbar-scrolled' : '',
      ].join(' ')}>

        {/* Scroll progress bar */}
        <div
          className="scroll-progress"
          style={{ width: `${scrollProgress}%` }}
          role="progressbar"
          aria-valuenow={Math.round(scrollProgress)}
          aria-valuemin={0}
          aria-valuemax={100}
        />

        <div className="nav-container">

          {/* Logo */}
          <Link
            to="/supermarket"
            className="logo"
            onClick={handleLogoClick}
            aria-label="Inicio"
          >
            <img
              src={logo_tb}
              alt="Centro Comercial TB"
              className={['logo-image', logoAnimated ? 'logo-bounce' : ''].join(' ')}
            />
          </Link>

          {/* Desktop search */}
          <form className="search-bar desktop-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="¿Qué estás buscando?"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              aria-label="Buscar productos"
            />
            <button type="submit" className="search-btn" aria-label="Buscar">     
              <SearchIcon />
            </button>
          </form>

          {/* Right icons */}
          <div className="nav-right">
            {/* Mobile search toggle */}
            <button
              className="icon-btn mobile-search-btn"
              onClick={toggleSearch}
              aria-label={isSearchOpen ? 'Cerrar búsqueda' : 'Abrir búsqueda'}
              aria-expanded={isSearchOpen}
            >
              {isSearchOpen ? <CloseIcon /> : <SearchIcon />}
            </button>

            {/* Hamburger / close — animated CSS lines */}
            <button
              className={['icon-btn', 'hamburger', isSidebarOpen ? 'is-open' : ''].join(' ')}
              onClick={toggleSidebar}
              aria-label={isSidebarOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isSidebarOpen}
              aria-controls="sidebar"
            >
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
            </button>
          </div>
        </div>

        {/* Mobile search panel */}
        <div className={['mobile-search-panel', isSearchOpen ? 'panel-open' : ''].join(' ')}>
          <form onSubmit={handleSearch} className="mobile-search-form">
            <span className="search-icon-left" aria-hidden="true">
              <SearchIcon />
            </span>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="¿Qué estás buscando?"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              aria-label="Buscar productos"
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Limpiar"
              >
                <CloseIcon />
              </button>
            )}
          </form>
        </div>
      </nav>

      {/* ── Sidebar overlay ── */}
      {isSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        id="sidebar"
        className={['sidebar', isSidebarOpen ? 'sidebar-open' : ''].join(' ')}
        aria-hidden={!isSidebarOpen}
      >
        <div className="sidebar-header">
          <span className="sidebar-title">Menú</span>
          <button
            className="icon-btn sidebar-close"
            onClick={closeSidebar}
            aria-label="Cerrar menú"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="sidebar-body">

          {/* Categories group */}
          {categories.length > 0 && (
            <nav className="sidebar-group" aria-label="Categorías">
              <p className="sidebar-group-label">Categorías</p>
              <ul className="sidebar-menu">
                {categories.map((cat, i) => (
                  <li
                    key={cat.id}
                    style={{ '--item-index': i }}
                  >
                    <Link
                      to={`/supermarket/categoria/${cat.slug}`}
                      className="sidebar-link"
                      onClick={closeSidebar}
                    >
                      <span>{cat.nombre}</span>
                      <ChevronIcon />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div className="sidebar-divider" />

          {/* Pages group */}
          <nav className="sidebar-group" aria-label="Información">
            <p className="sidebar-group-label">Información</p>
            <ul className="sidebar-menu">
              {[
                { to: '/about',   label: 'Más sobre nosotros' },
                { to: '/contact', label: 'Contáctanos' },
                { to: '/history', label: 'Nuestra historia' },
                { to: '/mission', label: 'Nuestra misión' },
              ].map(({ to, label }, i) => (
                <li key={to} style={{ '--item-index': i + (categories.length || 0) + 1 }}>
                  <Link
                    to={to}
                    className="sidebar-link sidebar-link--page"
                    onClick={closeSidebar}
                  >
                    <span>{label}</span>
                    <ChevronIcon />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="sidebar-footer">
          <p>© 2026 Centro Comercial TB</p>
        </div>
      </aside>
    </header>
  );
}

/* ── Inline SVG icons (no extra dependency) ──────────── */
function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}