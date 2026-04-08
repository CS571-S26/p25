import { Card, Button } from "react-bootstrap";

function CartItem({ item, index, removeFromCart }) {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body className="d-flex justify-content-between align-items-center">
        <div>
          <h5 className="mb-1">{item.name}</h5>
          <p className="mb-0">{item.ingredients}</p>
        </div>
        <Button variant="danger" onClick={() => removeFromCart(index)}>
          Remove
        </Button>
      </Card.Body>
    </Card>
  );
}

export default CartItem;