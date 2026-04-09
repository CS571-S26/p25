import { Card, Button } from "react-bootstrap";
import { useState } from "react";

function CocktailCard({ cocktail, addToCart }) {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

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

        {/* Quantity selector */}
        <div className="d-flex align-items-center justify-content-center mb-3">
          <Button variant="secondary" onClick={decrement}>
            -
          </Button>

          <span style={{ margin: "0 15px", fontSize: "18px" }}>
            {quantity}
          </span>

          <Button variant="secondary" onClick={increment}>
            +
          </Button>
        </div>

        <Button variant="dark" className="mt-auto" onClick={handleAdd}>
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
}

export default CocktailCard;