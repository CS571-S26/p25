import { Container, Row, Col } from "react-bootstrap";
import CocktailCard from "./CocktailCard";

function CocktailList({ cocktails, addToCart }) {
  return (
    <Container className="py-4">
      <h2 className="mb-4 text-center">Our Menu</h2>
      <Row>
        {cocktails.map((cocktail) => (
          <Col key={cocktail.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <CocktailCard cocktail={cocktail} addToCart={addToCart} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CocktailList;