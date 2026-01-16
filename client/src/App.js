import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import PersonalCare from './components/category_pages/PersonalCare';
import Cleaning from './components/category_pages/Cleaning';
import FarmingProducts from './components/category_pages/FarmingProducts';
import CookiesAndSweets from './components/category_pages/CookiesAndSweets';
import Food from './components/category_pages/Food';
import AlcoholAndDrinks from './components/category_pages/AlcoholAndDrinks';
import Others from './components/category_pages/Others';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/supermarket" element={<HomePage />} />
        <Route path="/sobre_nosotros" element={<AboutPage />} />
        <Route path="/cuidado_personal" element={<PersonalCare />} />
        <Route path="/limpieza" element={<Cleaning />} />
        <Route path="/productos_agropecuarios" element={<FarmingProducts />} />
        <Route path="/galletas_dulces" element={<CookiesAndSweets />} />
        <Route path="/alimentacion" element={<Food />} />
        <Route path="/licores_bebidas" element={<AlcoholAndDrinks />} />
        <Route path="/otros" element={< Others/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;