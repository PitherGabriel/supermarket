require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors()); // Allow frontend to fetch data
app.use(express.json());

const supabase = require('./supabaseClient');


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

app.get('/api/categories', async (req, res) => {
  const { data, error } = await supabase
    .from('Categorias')
    .select('*')
    .order('id');
    console.log(data)

  if (error) {
    console.log(error.message)
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

app.get('/api/offers', async (req, res) => {
  const { data, error } = await supabase
    .from('Banners')
    .select('*')
    .order('id');
    console.log(data)

  if (error) {
    console.log(error.message)
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});