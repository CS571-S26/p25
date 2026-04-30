import { Card, Button } from "react-bootstrap";

function CartItem({ item, removeFromCart }) {
  const itemTotal = (item.price || 0) * item.quantity;

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body className="d-flex justify-content-between align-items-center">
        <div>
          <h5 className="mb-1">{item.name}</h5>
          <p className="mb-1">{item.ingredients}</p>
          <p className="mb-1">
            <strong>Price:</strong> ${(item.price || 0).toFixed(2)}
          </p>
          <p className="mb-0">
            <strong>Quantity:</strong> {item.quantity}
          </p>
          <p className="mb-0">
            <strong>Total:</strong> ${itemTotal.toFixed(2)}
          </p>
        </div>
        <Button variant="danger" onClick={() => removeFromCart(item.id)}>
          Remove
        </Button>
      </Card.Body>
    </Card>
  );
}

export default CartItem;