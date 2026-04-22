import { useState } from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";

const BASE_OPTIONS = [
  "Vodka",
  "Gin",
  "Tequila",
  "Rum",
  "Whiskey",
  "Bourbon",
  "Triple Sec",
  "Brandy"
];

const SWEETENER_OPTIONS = [
  "Simple Syrup",
  "Agave Syrup",
  "Honey Syrup",
  "Grenadine",
  "Maple Syrup",
  "Orgeat",
  "Coconut Syrup",
  "Brown Sugar Syrup"
];

const SOUR_OPTIONS = [
  "Lime Juice",
  "Lemon Juice",
  "Grapefruit Juice",
  "Orange Juice",
  "Cranberry Juice",
  "Pineapple Juice",
  "Passionfruit Juice",
  "Sour Mix"
];

const GARNISH_OPTIONS = [
  "Orange Peel",
  "Lemon Peel",
  "Lime Wheel",
  "Cherry",
  "Mint",
  "Rosemary",
  "Orange Slice",
  "Salt Rim"
];

function IngredientCard({ name, count, onIncrement, onDecrement }) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Body className="d-flex flex-column justify-content-between text-center">
        <Card.Title>{name}</Card.Title>

        <div className="d-flex align-items-center justify-content-center mt-3">
          <Button variant="secondary" onClick={onDecrement}>
            -
          </Button>
          <span style={{ margin: "0 15px", fontSize: "18px", minWidth: "20px" }}>
            {count}
          </span>
          <Button variant="secondary" onClick={onIncrement}>
            +
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

function BuildYourOwnPage({ addCustomCocktailToCart }) {
  const [baseCounts, setBaseCounts] = useState(
    Object.fromEntries(BASE_OPTIONS.map((item) => [item, 0]))
  );
  const [sweetenerCounts, setSweetenerCounts] = useState(
    Object.fromEntries(SWEETENER_OPTIONS.map((item) => [item, 0]))
  );
  const [sourCounts, setSourCounts] = useState(
    Object.fromEntries(SOUR_OPTIONS.map((item) => [item, 0]))
  );
  const [garnishCounts, setGarnishCounts] = useState(
    Object.fromEntries(GARNISH_OPTIONS.map((item) => [item, 0]))
  );
  const [message, setMessage] = useState("");

  const totalNonGarnish =
    Object.values(baseCounts).reduce((a, b) => a + b, 0) +
    Object.values(sweetenerCounts).reduce((a, b) => a + b, 0) +
    Object.values(sourCounts).reduce((a, b) => a + b, 0);

  const totalGarnish = Object.values(garnishCounts).reduce((a, b) => a + b, 0);

  const incrementItem = (name, counts, setCounts, isGarnish = false) => {
    if (isGarnish) {
      if (totalGarnish >= 1) return;
      setCounts((prev) => ({ ...prev, [name]: 1 }));
      return;
    }

    if (totalNonGarnish >= 8) return;
    if (counts[name] >= 8) return;

    setCounts((prev) => ({ ...prev, [name]: prev[name] + 1 }));
  };

  const decrementItem = (name, setCounts) => {
    setCounts((prev) => ({
      ...prev,
      [name]: Math.max(prev[name] - 1, 0)
    }));
  };

  const buildIngredientList = () => {
    const ingredients = [];

    Object.entries(baseCounts).forEach(([name, count]) => {
      if (count > 0) ingredients.push(`${count} ${name}`);
    });

    Object.entries(sweetenerCounts).forEach(([name, count]) => {
      if (count > 0) ingredients.push(`${count} ${name}`);
    });

    Object.entries(sourCounts).forEach(([name, count]) => {
      if (count > 0) ingredients.push(`${count} ${name}`);
    });

    Object.entries(garnishCounts).forEach(([name, count]) => {
      if (count > 0) ingredients.push(name);
    });

    return ingredients;
  };

  const resetSelections = () => {
    setBaseCounts(Object.fromEntries(BASE_OPTIONS.map((item) => [item, 0])));
    setSweetenerCounts(Object.fromEntries(SWEETENER_OPTIONS.map((item) => [item, 0])));
    setSourCounts(Object.fromEntries(SOUR_OPTIONS.map((item) => [item, 0])));
    setGarnishCounts(Object.fromEntries(GARNISH_OPTIONS.map((item) => [item, 0])));
  };

  const handleAddToCart = () => {
    const ingredients = buildIngredientList();

    if (ingredients.length === 0) {
      setMessage("Please choose at least one ingredient.");
      return;
    }

    addCustomCocktailToCart(ingredients);
    setMessage("Custom cocktail added to cart!");
    resetSelections();
  };

  const renderColumn = (title, options, counts, setCounts, isGarnish = false) => (
    <Col xs={12} md={6} lg={3}>
      <h3 className="text-center mb-3">{title}</h3>
      <Row>
        {options.map((item) => (
          <Col xs={12} className="mb-3" key={item}>
            <IngredientCard
              name={item}
              count={counts[item]}
              onIncrement={() => incrementItem(item, counts, setCounts, isGarnish)}
              onDecrement={() => decrementItem(item, setCounts)}
            />
          </Col>
        ))}
      </Row>
    </Col>
  );

  return (
    <Container className="py-4">
      <h2 className="text-center mb-3">Build Your Own Cocktail</h2>
      <p className="text-center">
        Choose up to 8 total items across Base, Sweetener, and Sour. Choose up to 1 garnish.
      </p>

      <div className="text-center mb-4">
        <strong>Selected non-garnish items:</strong> {totalNonGarnish} / 8
        <br />
        <strong>Selected garnish:</strong> {totalGarnish} / 1
      </div>

      {message && (
        <Alert variant="info" className="text-center">
          {message}
        </Alert>
      )}

      <Row>
        {renderColumn("Base", BASE_OPTIONS, baseCounts, setBaseCounts)}
        {renderColumn("Sweetener", SWEETENER_OPTIONS, sweetenerCounts, setSweetenerCounts)}
        {renderColumn("Sour", SOUR_OPTIONS, sourCounts, setSourCounts)}
        {renderColumn("Garnish", GARNISH_OPTIONS, garnishCounts, setGarnishCounts, true)}
      </Row>

      <div className="text-center mt-4">
        <Button variant="dark" size="lg" onClick={handleAddToCart}>
          Add Custom Cocktail to Cart
        </Button>
      </div>
    </Container>
  );
}

export default BuildYourOwnPage;