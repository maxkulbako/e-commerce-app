import { Container } from "react-bootstrap";
import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <Container
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "60vh" }}
    >
      <div className="text-center">
        <h1 className="display-1 fw-bold text-primary">404</h1>
        <h2 className="mb-4">Page not found</h2>
        <p className="text-muted mb-4">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="btn btn-primary px-4 py-2"
          style={{
            borderRadius: "25px",
            fontSize: "1.1rem",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          Return to home page
        </Link>
      </div>
    </Container>
  );
};

export default NotFoundPage;
