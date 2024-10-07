import axios from "axios";
import { Button } from "react-bootstrap";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import { Link, useLoaderData } from "react-router-dom";

export async function loader() {
  const response = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/categories`
  );
  const categories = response.data;
  return { categories };
}

export default function Categories() {
  const { categories } = useLoaderData();

  // Delete a category by id
  const deleteCategory = () => {};

  return (
    <div className="container mt-4">
      {/* Header with Add Button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Categories</h2>
        <Button as={Link} to={"/add"}>
          <AiOutlinePlus className="me-2" />
          Add Category
        </Button>
      </div>

      {/* Categories Table */}
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((category) => (
            <tr key={category._id}>
              <td>{category._id}</td>
              <td>{category.title}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteCategory(category._id)}
                >
                  <AiOutlineDelete className="me-1" />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
