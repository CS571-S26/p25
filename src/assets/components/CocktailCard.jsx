import { Card, Button, Form } from "react-bootstrap";
import { useState } from "react";

function CocktailCard({ cocktail, addToCart }) {
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    addToCart(cocktail, quantity);
    setQuantity(1);
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={cocktail.image}
        alt={cocktail.name}
        style={{ height: "250px", objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{cocktail.name}</Card.Title>
        <Card.Text>
          <strong>Ingredients:</strong> {cocktail.ingredients}
        </Card.Text>

        <Form.Group className="mb-3">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </Form.Group>

        <Button variant="dark" className="mt-auto" onClick={handleAdd}>
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
}

export default CocktailCard;