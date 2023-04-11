import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import App from '../App';
import useRouterMiddleware from '../hooks/useRouterMiddleware';

const RouterModule: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  useRouterMiddleware();
  return <>{children}</>;
};

const router = createBrowserRouter([
  {
    path: '/',
    element:
      <RouterModule>
        <App />
      </RouterModule>
    ,
    children: [
      {
        path: 'home',
        element: <div>Home</div>,
      },
    ],
  },
]);

const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};


export default Router;
