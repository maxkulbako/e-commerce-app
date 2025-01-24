import { Link } from "react-router";
import { Table, Button } from "react-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useGetUsersQuery, useDeleteUserMutation } from "../../slices/usersApi";
import { FaTimes, FaCheck, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
const UsersListPage = () => {
  const { data: users, isLoading, error } = useGetUsersQuery();

  const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();

  const deleteHandler = async (userId) => {
    try {
      await deleteUser(userId);
      toast.success("User deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <>
      <h1>Users</h1>
      {isLoading || deleteLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>{user.isAdmin ? <FaCheck /> : <FaTimes />}</td>
                  <td>
                    <Button
                      variant="outline-info"
                      className="btn-sm mx-2"
                      as={Link}
                      to={`/admin/user/${user._id}/edit`}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      className="btn-sm mx-2"
                      onClick={() => deleteHandler(user._id)}
                      disabled={user.isAdmin}
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

export default UsersListPage;
