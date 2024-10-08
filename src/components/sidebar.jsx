import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../features/login";

export default function Sidebar() {
  const dispatch = useDispatch();

  return (
    <div
      className="d-flex flex-column vh-100 bg-dark text-white p-3"
      style={{ width: "250px" }}
    >
      <h2 className="text-center mb-4">Admin Panel</h2>
      <nav>
        {/* Categories Section */}
        <div>
          <ul className="list-unstyled ps-0">
            <li className="mb-2">
              <Link
                to="/categories"
                className="text-white d-flex align-items-center"
              >
                <h5>Categories</h5>
              </Link>
            </li>
          </ul>
        </div>

        {/* Products Section */}
        <div className="mt-4">
          <ul className="list-unstyled ps-0">
            <li className="mb-2">
              <Link
                to="/productlist"
                className="text-white d-flex align-items-center"
              >
                <h5>Products</h5>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="d-flex justify-content-end ">
        <button
          className="px-4 py-2 bg-primary"
          onClick={() => {
            dispatch(logout());
            window.location.href = "/login";
          }}
        >
          logOut
        </button>
      </div>
    </div>
  );
}
