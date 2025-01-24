import { useParams, useNavigate, Link } from "react-router";
import { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../slices/usersApi";
import FormContainer from "../../components/FormContainer";
import { useForm } from "react-hook-form";

const UserEditPage = () => {
  const { userId } = useParams();

  const { register, handleSubmit, reset } = useForm();

  const { data: user, isLoading, error } = useGetUserDetailsQuery(userId);

  const [updateUser, { isLoading: updateUserLoading }] =
    useUpdateUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      await updateUser(data).unwrap();
      toast.success("User updated successfully");
      navigate("/admin/userslist");
    } catch (err) {
      toast.error(err?.data?.message || err?.error || "Update failed");
    }
  };

  return (
    <>
      <Button as={Link} to="/admin/userslist" className="btn btn-light my-3">
        Go Back
      </Button>
      <FormContainer>
        <h1>Edit User</h1>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error?.message}
          </Message>
        ) : (
          <Form
            onSubmit={handleSubmit(onSubmit)}
            style={{ gap: "10px", display: "flex", flexDirection: "column" }}
          >
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter user name"
                {...register("name")}
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" {...register("email")} />
            </Form.Group>
            <Form.Group controlId="isAdmin">
              <Form.Label>Is Admin</Form.Label>
              <Form.Check type="checkbox" {...register("isAdmin")} />
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

export default UserEditPage;
