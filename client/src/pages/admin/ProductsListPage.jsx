import { Link } from "react-router";
import { Table, Button, Row, Col } from "react-bootstrap";
import Loader from "../../components/Loader";
import {
  useGetProductsQuery,
  useCreateProductMutation,
} from "../../slices/productsApiSlice";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const ProductsListPage = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  const [createProduct, { isLoading: createProductLoading }] =
    useCreateProductMutation();

  const deleteHandler = (id) => {
    console.log(id);
  };

  const createProductHandler = async () => {
    try {
      await createProduct();
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button onClick={() => createProductHandler()}>
            <FaEdit />
            <strong> Create Product</strong>
          </Button>
        </Col>
      </Row>
      {createProductLoading && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <Button
                      as={Link}
                      to={`/admin/product/${product._id}/edit`}
                      className="btn-sm mx-2"
                      variant="outline-warning"
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      className="btn-sm mx-2"
                      variant="outline-danger"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default ProductsListPage;
