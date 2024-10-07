import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  // Fetch products from the server
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/products`,
          { withCredentials: true }
        );
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProducts();
  }, []);

  // Handle product deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_SERVER_URL}/products/${id}`, {
        withCredentials: true,
      });
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Products</h2>
        {/* Add product button */}
        <Button variant="primary" onClick={() => navigate("/new")}>
          Add Product
        </Button>
      </div>

      {/* Product table */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Images</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Categories</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id}>
              <td>{index + 1}</td>
              <td>{product.title}</td>
              <td>{truncate(product.description)}</td>
              <td>
                {product.images && (
                  <img
                    src={product.images[0]} // Assuming images is an array, show the first image
                    alt={product.title}
                    style={{ width: "50px", height: "50px" }}
                  />
                )}
              </td>
              <td>${product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.categories?.join(", ")}</td>
              <td>
                {/* Edit and Delete buttons */}
                <Button
                  variant="warning"
                  className="me-2"
                  onClick={() => navigate(`/products/edit/${product._id}`)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

function truncate(text) {
  return text.length >= 150 ? text.slice(0, 150) + "..." : text;
}
