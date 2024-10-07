import axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeLoginStatus } from "../features/login";

export default function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/login`,
        values,
        { withCredentials: true }
      );
      dispatch(changeLoginStatus({ loggedIn: true, user: response.data }));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center">
      <div
        className="card w-100"
        style={{ maxWidth: 500, marginInline: "auto" }}
      >
        <div className="card-header">
          <h5 className="text-center">Sign in to Dashboard</h5>
        </div>
        <div className="card-body">
          <Form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
              <Form.Label htmlFor="email">Email</Form.Label>
            </div>
            <div className="form-floating mb-3">
              <Form.Control
                type="password"
                placeholder="password"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
              <Form.Label htmlFor="password">Password</Form.Label>
            </div>
            <div className="d-grid">
              <Button type="submit" className="rounded-pill">
                Sign in
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
