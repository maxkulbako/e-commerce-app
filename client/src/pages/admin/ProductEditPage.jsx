import { useParams, useNavigate, Link } from "react-router";
import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useGetProductDetailsQuery } from "../../slices/productsApiSlice";
import { useUpdateProductMutation } from "../../slices/productsApiSlice";
import FormContainer from "../../components/FormContainer";
import { useForm } from "react-hook-form";

const ProductEditPage = () => {
  const { productId } = useParams();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      price: "",
      description: "",
      brand: "",
      category: "",
      countInStock: "",
    },
  });

  console.log("render");

  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: updateProductLoading }] =
    useUpdateProductMutation();

  useEffect(() => {
    if (product) {
      reset(product);
    }
  }, [product, reset]);

  const onSubmit = async (data) => {
    try {
      await updateProduct({
        productId,
        ...data,
      }).unwrap();
      toast.success("Product updated successfully");
      navigate("/admin/productslist");
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <>
      <Button as={Link} to="/admin/productslist" className="btn btn-light my-3">
        Go Back
      </Button>
      <FormContainer>
        <h1>Edit Product</h1>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form
            onSubmit={handleSubmit(onSubmit)}
            style={{ gap: "10px", display: "flex", flexDirection: "column" }}
          >
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                {...register("name")}
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" {...register("price")} />
            </Form.Group>

            {/* TODO: Add image upload */}

            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product brand"
                {...register("brand")}
              />
            </Form.Group>
            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control type="number" {...register("countInStock")} />
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product category"
                {...register("category")}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product description"
                {...register("description")}
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-3">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditPage;
