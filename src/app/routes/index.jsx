import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import { GoogleOAuthProvider } from "../../app/providers/GoogleOAuthProvider";
import { ROUTES } from "../../constants/routes";
import SharedLayout from "../../pages/SharedLayout/SharedLayout";
import PublicGuard from "../../shared/guards/PublicGuard/PublicGuard";
import PrivateGuard from "../../shared/guards/PrivateGuard/PrivateGuard";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const AuthPage = lazy(() => import("../../pages/AuthPage/AuthPage"));
const ShopPage = lazy(() => import("../../pages/ShopPage/ShopPage"));
const CreateShopPage = lazy(() =>
  import("../../pages/CreateShopPage/CreateShopPage")
);
const EditShopPage = lazy(() =>
  import("../../pages/EditShopPage/EditShopPage")
);
const MedicinePage = lazy(() =>
  import("../../pages/MedicinePage/MedicinePage")
);
const OAuthCallbackPage = lazy(() =>
  import("../../pages/OAuthCallbackPage/OAuthCallbackPage")
);

const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage")
);

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
      { index: true, element: <HomePage /> },
      {
        path: ROUTES.REGISTER,
        element: (
          <PublicGuard>
            <AuthPage />
          </PublicGuard>
        ),
      },
      {
        path: ROUTES.LOGIN,
        element: (
          <PublicGuard>
            <AuthPage />
          </PublicGuard>
        ),
      },
      {
        path: ROUTES.SHOP,
        element: (
          <PrivateGuard>
            <ShopPage />
          </PrivateGuard>
        ),
      },
      {
        path: ROUTES.CREATE_SHOP,
        element: (
          <PrivateGuard>
            <CreateShopPage />
          </PrivateGuard>
        ),
      },
      {
        path: ROUTES.EDIT_SHOP,
        element: (
          <PrivateGuard>
            <EditShopPage />
          </PrivateGuard>
        ),
      },
      {
        path: ROUTES.MEDICINE,
        element: (
          <PrivateGuard>
            <MedicinePage />
          </PrivateGuard>
        ),
      },
      {
        path: "/oauth/callback",
        element: (
          <PublicGuard>
            <OAuthCallbackPage />
          </PublicGuard>
        ),
      },
    ],
  },
]);
