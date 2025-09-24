import { createBrowserRouter } from "react-router-dom";
import SharedLayout from "../../pages/SharedLayout/SharedLayout";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import { GoogleOAuthProvider } from "../../app/providers/GoogleOAuthProvider";
import { ROUTES } from "../../constants/routes";

// eslint-disable-next-line react-refresh/only-export-components
const HomePage = async () => {
  try {
    const mod = await import("../../pages/HomePage/HomePage");
    return { Component: mod.default };
  } catch (err) {
    console.error("Error loading HomePage:", err);
    throw err;
  }
};

// eslint-disable-next-line react-refresh/only-export-components
const AuthPage = async () => {
  try {
    const mod = await import("../../pages/AuthPage/AuthPage");
    return { Component: mod.default };
  } catch (err) {
    console.error("Error loading AuthPage:", err);
    throw err;
  }
};

// eslint-disable-next-line react-refresh/only-export-components
const ShopPage = async () => {
  try {
    const mod = await import("../../pages/ShopPage/ShopPage");
    return { Component: mod.default };
  } catch (err) {
    console.error("Error loading ShopPage:", err);
    throw err;
  }
};

// eslint-disable-next-line react-refresh/only-export-components
const CreateShopPage = async () => {
  try {
    const mod = await import("../../pages/CreateShopPage/CreateShopPage");
    return { Component: mod.default };
  } catch (err) {
    console.error("Error loading CreateShopPage:", err);
    throw err;
  }
};

// eslint-disable-next-line react-refresh/only-export-components
const EditShopPage = async () => {
  try {
    const mod = await import("../../pages/EditShopPage/EditShopPage");
    return { Component: mod.default };
  } catch (err) {
    console.error("Error loading EditShopPage:", err);
    throw err;
  }
};

// eslint-disable-next-line react-refresh/only-export-components
const MedicinePage = async () => {
  try {
    const mod = await import("../../pages/MedicinePage/MedicinePage");
    return { Component: mod.default };
  } catch (err) {
    console.error("Error loading MedicinePage:", err);
    throw err;
  }
};

// eslint-disable-next-line react-refresh/only-export-components
const OAuthCallbackPage = async () => {
  try {
    const mod = await import("../../pages/OAuthCallbackPage/OAuthCallbackPage");
    return { Component: mod.default };
  } catch (err) {
    console.error("Error loading OAuthCallbackPage:", err);
    throw err;
  }
};


export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <GoogleOAuthProvider>
        <SharedLayout />
      </GoogleOAuthProvider>
    ),
    errorElement: <NotFoundPage />,
    children: [
      { index: true, lazy: HomePage },
      { path: ROUTES.REGISTER, lazy: AuthPage },
      { path: ROUTES.LOGIN, lazy: AuthPage },
      { path: ROUTES.SHOP, lazy: ShopPage },
      { path: ROUTES.CREATE_SHOP, lazy: CreateShopPage },
      { path: ROUTES.EDIT_SHOP, lazy: EditShopPage },
      { path: ROUTES.MEDICINE, lazy: MedicinePage },
      { path: "/oauth/callback", lazy: OAuthCallbackPage },
    ],
    loader: () => new Promise((res) => setTimeout(res, 500)),
  },
]);
