import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Login from "./pages/login";
import New, { newLoader } from "./pages/products/new";
import Home from "./pages/home";
import Add from "./pages/categories/add";
import Categories, {
  loader as categoriesLoader,
} from "./pages/categories/landingCat";
import ProductList from "./pages/products/landingProduct";
import Layout from "./components/layout";
import PublicLayout from "./components/public-layout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route Component={Layout}>
        <Route path="/" Component={Home} />
        <Route path="/new" Component={New} loader={newLoader} />
        <Route path="/add" Component={Add} />
        <Route
          path="/categories"
          Component={Categories}
          loader={categoriesLoader}
        />
        <Route path="/productlist" Component={ProductList} />
      </Route>
      <Route Component={PublicLayout}>
        <Route path="/login" Component={Login} />
      </Route>
    </>
  )
);

export { router };
