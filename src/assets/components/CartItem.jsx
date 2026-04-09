import { Card, Button } from "react-bootstrap";

function CartItem({ item, removeFromCart }) {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body className="d-flex justify-content-between align-items-center">
        <div>
          <h5 className="mb-1">{item.name}</h5>
          <p className="mb-1">{item.ingredients}</p>
          <p className="mb-0">
            <strong>Quantity:</strong> {item.quantity}
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