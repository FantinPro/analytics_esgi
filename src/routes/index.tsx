import { useRouterMiddleware } from "@omaziarz/esgi-analytics-sdk-front";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "../App";

const RouterModule: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  useRouterMiddleware();
  return <>{children}</>;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RouterModule>
        <App />
      </RouterModule>
    ),
    children: [
      {
        path: "home",
        element: <div>Home</div>,
      },
    ],
  },
]);

const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default Router;
