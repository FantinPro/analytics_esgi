import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useRouterMiddleware = () => {
  const location = useLocation();

  useEffect(() => {
    console.log('Current route:', location.pathname);
  }, [location]);
}

export default useRouterMiddleware;
