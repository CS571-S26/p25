import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className="hero-section d-flex align-items-center justify-content-center text-center">
      <Container>
        <h1 className="display-3 fw-bold text-light mb-4">Cocktail Bar</h1>
        <Button variant="warning" size="lg" onClick={() => navigate("/menu")}>
          Start Order
        </Button>
      </Container>
    </div>
  );
}

export default HeroSection;