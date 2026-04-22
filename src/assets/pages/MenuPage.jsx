import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CocktailCard from "../components/CocktailCard";

function MenuPage({ cocktails, addToCart }) {
  const navigate = useNavigate();

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-center">Our Menu</h2>
      <Row>
        {cocktails.map((cocktail) => (
          <Col key={cocktail.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <CocktailCard cocktail={cocktail} addToCart={addToCart} />
          </Col>
        ))}

        <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
          <Card className="h-100 shadow-sm d-flex">
            <Card.Body className="d-flex flex-column justify-content-center text-center">
              <Card.Title style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
                Build Your Own
              </Card.Title>
              <Card.Text style={{ marginBottom: "1.5rem" }}>
                Create your own custom cocktail.
              </Card.Text>
              <Button
                variant="dark"
                className="mt-auto"
                onClick={() => navigate("/build-your-own")}
              >
                Start Building
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default MenuPage;