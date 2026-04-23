import { useState } from "react";
import { Container, Row, Col, Card, Button, Alert, Dropdown, DropdownButton } from "react-bootstrap";

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

function SelectedIngredient({ name, quantity, onIncrement, onDecrement, onRemove }) {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body className="d-flex justify-content-between align-items-center">
        <div>
          <h5 className="mb-0">{name}</h5>
        </div>
        <div className="d-flex align-items-center gap-3">
          <div className="d-flex align-items-center">
            <Button variant="secondary" size="sm" onClick={onDecrement}>
              -
            </Button>
            <span style={{ margin: "0 10px", fontSize: "16px", minWidth: "25px", textAlign: "center" }}>
              {quantity}
            </span>
            <Button variant="secondary" size="sm" onClick={onIncrement}>
              +
            </Button>
          </div>
          <Button variant="danger" size="sm" onClick={onRemove}>
            Remove
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

function BuildYourOwnPage({ addCustomCocktailToCart }) {
  // Store selected ingredients with their quantities
  // Format: { "Base|Vodka": 2, "Sweetener|Simple Syrup": 1, etc. }
  const [selectedIngredients, setSelectedIngredients] = useState({});
  const [message, setMessage] = useState("");

  // Determine how many non-garnish and garnish items are selected
  const getNonGarnishCount = () => {
    return Object.entries(selectedIngredients)
      .filter(([key]) => !key.startsWith("Garnish|"))
      .reduce((sum, [, quantity]) => sum + quantity, 0);
  };

  const getGarnishCount = () => {
    return Object.entries(selectedIngredients)
      .filter(([key]) => key.startsWith("Garnish|"))
      .reduce((sum, [, quantity]) => sum + quantity, 0);
  };

  const addIngredient = (category, ingredientName) => {
    const key = `${category}|${ingredientName}`;
    
    // Check garnish limit (max 2 total quantity)
    if (category === "Garnish" && getGarnishCount() >= 2 && !selectedIngredients[key]) {
      setMessage("Total garnish quantity cannot exceed 2.");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    // Check non-garnish limit (max 8 total quantity)
    if (category !== "Garnish" && getNonGarnishCount() >= 8 && !selectedIngredients[key]) {
      setMessage("Total non-garnish quantity cannot exceed 8.");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    // Add the ingredient with quantity 1 if not already selected
    if (!selectedIngredients[key]) {
      setSelectedIngredients(prev => ({ ...prev, [key]: 1 }));
      setMessage("");
    }
  };

  const removeIngredient = (key) => {
    setSelectedIngredients(prev => {
      const newIngredients = { ...prev };
      delete newIngredients[key];
      return newIngredients;
    });
  };

  const incrementQuantity = (key) => {
    const isGarnish = key.startsWith("Garnish|");
    const currentGarnishTotal = getGarnishCount();
    const currentNonGarnishTotal = getNonGarnishCount();

    // Check if incrementing would exceed limits
    if (isGarnish && currentGarnishTotal >= 2) {
      setMessage("Total garnish quantity cannot exceed 2.");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    if (!isGarnish && currentNonGarnishTotal >= 8) {
      setMessage("Total non-garnish quantity cannot exceed 8.");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    setSelectedIngredients(prev => ({
      ...prev,
      [key]: prev[key] + 1
    }));
  };

  const decrementQuantity = (key) => {
    setSelectedIngredients(prev => ({
      ...prev,
      [key]: Math.max(prev[key] - 1, 1)
    }));
  };

  const buildIngredientList = () => {
    return Object.entries(selectedIngredients).map(([key, quantity]) => {
      const [category, name] = key.split("|");
      return category === "Garnish" ? name : `${quantity} ${name}`;
    });
  };

  const resetSelections = () => {
    setSelectedIngredients({});
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

  const renderCategoryDropdown = (categoryTitle, options) => (
    <Col xs={12} md={6} lg={3} className="mb-4">
      <DropdownButton
        id={`dropdown-${categoryTitle}`}
        title={categoryTitle}
        className="w-100"
        variant="outline-dark"
      >
        {options.map(option => (
          <Dropdown.Item
            key={option}
            onClick={() => addIngredient(categoryTitle, option)}
            disabled={selectedIngredients[`${categoryTitle}|${option}`] !== undefined}
          >
            {option}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </Col>
  );

  const getSelectedByCategory = (category) => {
    return Object.entries(selectedIngredients)
      .filter(([key]) => key.startsWith(category))
      .map(([key, quantity]) => ({ key, name: key.split("|")[1], quantity }));
  };

  return (
    <Container className="py-4">
      <h2 className="text-center mb-3">Build Your Own Cocktail</h2>
      <p className="text-center">
        Select ingredients from each category below and adjust quantities as needed.
      </p>
      <p className="text-center text-muted small">
        <em>* 1 quantity = 1 fluid ounce of that item</em>
      </p>

      {message && (
        <Alert variant={message.includes("Custom") ? "success" : "info"} className="text-center">
          {message}
        </Alert>
      )}

      <Card className="mb-4 p-3 bg-light">
        <h5 className="mb-0">
          Selected Ingredients: <strong>{Object.keys(selectedIngredients).length}</strong>
        </h5>
        <small className="text-muted">Non-garnish: {getNonGarnishCount()}/8 | Garnish: {getGarnishCount()}/2</small>
      </Card>

      {/* Dropdowns Section */}
      <h4 className="mb-3">Select Ingredients</h4>
      <Row className="mb-4">
        {renderCategoryDropdown("Base", BASE_OPTIONS)}
        {renderCategoryDropdown("Sweetener", SWEETENER_OPTIONS)}
        {renderCategoryDropdown("Sour", SOUR_OPTIONS)}
        {renderCategoryDropdown("Garnish", GARNISH_OPTIONS)}
      </Row>

      {/* Selected Ingredients Section */}
      {Object.keys(selectedIngredients).length > 0 && (
        <>
          <h4 className="mb-3">Your Selection</h4>
          <Row className="mb-4">
            <Col xs={12} md={8} className="mx-auto">
              {["Base", "Sweetener", "Sour", "Garnish"].map(category => {
                const items = getSelectedByCategory(category);
                return items.length > 0 ? (
                  <div key={category}>
                    <h6 className="text-muted mt-3 mb-2">{category}</h6>
                    {items.map(({ key, name, quantity }) => (
                      <SelectedIngredient
                        key={key}
                        name={name}
                        quantity={quantity}
                        onIncrement={() => incrementQuantity(key)}
                        onDecrement={() => decrementQuantity(key)}
                        onRemove={() => removeIngredient(key)}
                      />
                    ))}
                  </div>
                ) : null;
              })}
            </Col>
          </Row>
        </>
      )}

      <div className="text-center mt-4">
        <Button variant="dark" size="lg" onClick={handleAddToCart}>
          Add Custom Cocktail to Cart
        </Button>
      </div>
    </Container>
  );
}

export default BuildYourOwnPage;