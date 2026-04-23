import { Container, Nav, Navbar, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavigationBar({ cartCount }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Cocktail Bar
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/menu">
              Menu
            </Nav.Link>
            <Nav.Link as={Link} to="/build-your-own">
              Build Your Own!
            </Nav.Link>
            <Nav.Link as={Link} to="/cart">
              Cart <Badge bg="warning" text="dark">{cartCount}</Badge>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;