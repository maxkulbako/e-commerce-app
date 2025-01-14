import { Navbar, Nav, Container } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from "react-router";
import logo from "../assets/logo.png";

const Header = () => {
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
