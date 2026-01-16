import { useState, useEffect } from 'react';
import logo_tb from './assests/logo_tb.png';
import { FaBars, FaTimes} from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Header() {
    const [lastScrollY, setLastScrollY] = useState(0);
    const [showNavbar, setShowNavbar] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); 


    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;

                    if (currentScrollY > lastScrollY && currentScrollY > 100) {
                        setShowNavbar(false);
                    } else {
                        setShowNavbar(true);
                    }

                    setLastScrollY(currentScrollY);
                    ticking = false;
                });

                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    // Función para abrir/cerrar el sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };


    return (
        <header>
        <nav className={`navbar ${showNavbar ? 'navbar-visible' : 'navbar-hidden'}`}>
            <div className="container nav-container">
                <div className="logo">
                    <Link to="/supermarket">
                        <img src={logo_tb} alt="Logo" className="logo-image" />
                    </Link>
                </div>

                <div className="search-bar">
                    <input type="text" placeholder="¿Qué estas buscando?" />
                </div>

                <div className="nav-icons">
                    {/* Informational only - no login logic */}
                    <div className="icon-item" onClick={toggleSidebar}>
                        <FaBars />
                    </div>
                </div>
            </div>
        </nav>

              {/* Overlay oscuro cuando el sidebar está abierto */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <h2>Menú</h2>
          <div className="sidebar-close" onClick={toggleSidebar}>
            <FaTimes />
          </div>
        </div>
        
        <div className="sidebar-content">
          <ul className="sidebar-menu">
            <li>
              <Link to="/about" onClick={toggleSidebar}>
                Más sobre nosotros
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={toggleSidebar}>
                Contáctanos
              </Link>
            </li>
            <li>
              <Link to="/history" onClick={toggleSidebar}>
                Nuestra historia
              </Link>
            </li>
            <li>
              <Link to="/mission" onClick={toggleSidebar}>
                Nuestra misión
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>

    );
}

export default Header;
