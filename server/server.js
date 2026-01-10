const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors()); // Allow frontend to fetch data
app.use(express.json());

// --- Mock Data (Database Replacement) ---

const categories = [
  { id: 1, label: "Comida y bebidas", icon: "🍎", color: "#008631" },
  { id: 2, label: "Ganadería", icon: "🍳", color: "#777" },
  { id: 3, label: "Construcción", icon: "🛠️", color: "#3B5E2B" },
  { id: 4, label: "Escolar", icon: "🏋️", color: "#F05524" },
  { id: 5, label: "Juguetes", icon: "🧸", color: "#0050AA" },
];

const weeklyOffers = [
  {
    id: 1,
    title: "Fresh Danish Apples",
    category: "Fruit & Veg",
    price: "12 DKK",
    description: "Crisp and sweet, locally sourced.",
    image: "https://via.placeholder.com/300x200?text=Apples" 
  },
  {
    id: 2,
    title: "Power Drill 20V",
    category: "Tools",
    price: "299 DKK",
    description: "High torque, includes battery.",
    image: "https://via.placeholder.com/300x200?text=Drill"
  },
  {
    id: 3,
    title: "XXL Air Fryer",
    category: "Kitchen",
    price: "499 DKK",
    description: "Cook healthy meals with less oil.",
    image: "https://via.placeholder.com/300x200?text=Air+Fryer"
  },
  {
    id: 4,
    title: "Running Shoes",
    category: "Sports",
    price: "199 DKK",
    description: "Lightweight and breathable.",
    image: "https://via.placeholder.com/300x200?text=Shoes"
  }
];

// --- Routes ---

app.get('/api/categories', (req, res) => {
  res.json(categories);
});

app.get('/api/offers', (req, res) => {
  res.json(weeklyOffers);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});