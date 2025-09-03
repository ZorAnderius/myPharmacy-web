import { createBrowserRouter } from "react-router-dom";
import SharedLayout from "../../pages/SharedLayout/SharedLayout";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";

const HomePage = () =>
  import("../../pages/HomePage/HomePage").then((mod) => ({
    Component: mod.default,
  }));

const RegisterPage = () =>
  import("../../pages/RegisterPage/RegisterPage").then((mod) => ({
    Component: mod.default,
  }));

const LoginPage = () =>
  import("../../pages/LoginPage/LoginPage").then((mod) => ({
    Component: mod.default,
  }));

const ShopPage = () =>
  import("../../pages/ShopPage/ShopPage").then((mod) => ({
    Component: mod.default,
  }));

const CreateShopPage = () =>
  import("../../pages/CreateShopPage/CreateShopPage").then((mod) => ({
    Component: mod.default,
  }));

const EditShopPage = () =>
  import("../../pages/EditShopPage/EditShopPage").then((mod) => ({
    Component: mod.default,
  }));

const MedicinePage = () =>
  import("../../pages/MedicinePage/MedicinePage").then((mod) => ({
    Component: mod.default,
  }));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SharedLayout />, // тут Outlet + Header/Footer + анімація
    errorElement: <NotFoundPage />,
    children: [
      { index: true, lazy: HomePage },
      { path: "register", lazy: RegisterPage },
      { path: "login", lazy: LoginPage },
      { path: "shop", lazy: ShopPage },
      { path: "shop/create", lazy: CreateShopPage },
      { path: "shop/edit/:id", lazy: EditShopPage },
      { path: "medicine/:id", lazy: MedicinePage },
    ],
    loader: () => new Promise((res) => setTimeout(res, 500)),
  },
]);
