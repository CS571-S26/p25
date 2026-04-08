import CocktailList from "../components/CocktailList";

function MenuPage({ cocktails, addToCart }) {
  return <CocktailList cocktails={cocktails} addToCart={addToCart} />;
}

export default MenuPage;