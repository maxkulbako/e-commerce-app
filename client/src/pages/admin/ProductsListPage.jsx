import { Link } from "react-router";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Paginate from "../../components/Paginate";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../slices/productsApiSlice";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const ProductsListPage = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    pageNumber: pageNumber || 1,
  });

  const [createProduct, { isLoading: createProductLoading }] =
    useCreateProductMutation();

  const [deleteProduct, { isLoading: deleteProductLoading }] =
    useDeleteProductMutation();

  const deleteHandler = async (id) => {
    try {
      await deleteProduct(id);
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
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
      {deleteProductLoading && <Loader />}
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
              {data.products.map((product) => (
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
          <Paginate pages={data.pages} page={data.page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductsListPage;
