import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import logo from "../assets/logo.png";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Navbar.Brand
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={logo}
                  alt="E-Commerce-App"
                  style={{
                    width: "150%",
                    height: "150%",
                    objectFit: "cover",
                  }}
                />
              </div>
              Techify
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Link to="/pcsaca" className="nav-link">
                <FaShoppingCart /> Cart
                {cartItems.length > 0 && (
                  <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                  </Badge>
                )}
              </Link>
              <Link to="/login" className="nav-link">
                <FaUser /> Sing In
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
