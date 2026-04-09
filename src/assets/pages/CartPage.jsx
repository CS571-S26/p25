import { Container } from "react-bootstrap";
import CartItem from "../components/CartItem";

function CartPage({ cart, removeFromCart }) {
  return (
    <Container className="py-4">
      <h2 className="mb-4 text-center">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            removeFromCart={removeFromCart}
          />
        ))
      )}
    </Container>
  );
}

export default CartPage;