import { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { FaDeleteLeft } from "react-icons/fa6";

const SearchBox = () => {
  const { keyword } = useParams();
  const [query, setQuery] = useState(keyword || "");

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search/${query}`);
    } else {
      navigate("/");
    }
  };

  const clearQuery = () => {
    setQuery("");
    navigate("/");
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex">
      <InputGroup>
        <Form.Control
          type="text"
          name="q"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          placeholder="Search Products..."
          className="mr-sm-2 ml-sm-5"
        ></Form.Control>
        {query && (
          <InputGroup.Text>
            <FaDeleteLeft onClick={clearQuery} style={{ cursor: "pointer" }} />
          </InputGroup.Text>
        )}
      </InputGroup>
      <Button type="submit" variant="outline-light" className="p-2 mx-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
