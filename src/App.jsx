import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeLoginStatus } from "./features/login";
import axios from "axios";
import { Spinner } from "react-bootstrap";

export default function App() {
  const [isPending, setIsPending] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/auth/verify`,
          { withCredentials: true }
        );
        dispatch(
          changeLoginStatus({
            loggedIn: true,
            user: res.data,
          })
        );
      } catch (error) {
        console.log(error);
        dispatch(changeLoginStatus({ loggedIn: false, user: null }));
      } finally {
        setIsPending(false);
      }
    };

    fetchMe();
  }, []);

  return isPending ? <Spinner /> : <RouterProvider router={router} />;
}
