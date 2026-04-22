import { HashRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import HomePage from "./assets/pages/HomePage";
import MenuPage from "./assets/pages/MenuPage";
import CartPage from "./assets/pages/CartPage";
import NavigationBar from "./assets/components/NavigationBar";
import cocktails from "./assets/data/cocktails";
import BuildYourOwnPage from "./assets/pages/BuildYourOwnPage";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (cocktail, quantity) => {
  setCart((prev) => {
    const existingItem = prev.find((item) => item.id === cocktail.id);

    if (existingItem) {
      return prev.map((item) =>
        item.id === cocktail.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    }

    return [...prev, { ...cocktail, quantity }];
  });
};

  const removeFromCart = (idToRemove) => {
    setCart((prev) => prev.filter((item) => item.id !== idToRemove));
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
        <Route path="/build-your-own" element={<BuildYourOwnPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;