import { ReactElement } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from '../context/useAuthContext';

const ProtectedRoute = ({ ...routeProps }: RouteProps): ReactElement => {
  const { loggedInUser } = useAuth();

  if (!loggedInUser) {
    return <Redirect to="/unauthorized" />;
  }

  return <Route {...routeProps} />;
};

export default ProtectedRoute;
