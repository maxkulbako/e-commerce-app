import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { useLoginMutation } from "../slices/usersApi";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));

      navigate(redirect);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-3" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          className="mt-2"
          disabled={isLoading}
        >
          Sign In
        </Button>
        {isLoading && <Loader />}
      </Form>
      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginPage;
