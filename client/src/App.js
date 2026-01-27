import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import CategoryPage from './components/category_pages/CategoryPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/supermarket" element={<HomePage />} />
        <Route path="/supermarket/categoria/:slug" element={<CategoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;