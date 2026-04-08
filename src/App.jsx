import { HashRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import HomePage from "./assets/pages/HomePage";
import MenuPage from "./assets/pages/MenuPage";
import CartPage from "./assets/pages/CartPage";
import NavigationBar from "./assets/components/NavigationBar";
import cocktails from "./assets/data/cocktails";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (cocktail) => {
    setCart((prev) => [...prev, cocktail]);
  };

  const removeFromCart = (indexToRemove) => {
    setCart((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <HashRouter>
      <NavigationBar cartCount={cart.length} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/menu"
          element={<MenuPage cocktails={cocktails} addToCart={addToCart} />}
        />
        <Route
          path="/cart"
          element={<CartPage cart={cart} removeFromCart={removeFromCart} />}
        />
      </Routes>
    </HashRouter>
  );
}

export default App;