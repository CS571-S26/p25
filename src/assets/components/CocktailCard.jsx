import { Card, Button } from "react-bootstrap";

function CocktailCard({ cocktail, addToCart }) {
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
        <Button
          variant="dark"
          className="mt-auto"
          onClick={() => addToCart(cocktail)}
        >
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
}

export default CocktailCard;