// components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const password = localStorage.getItem('password');

  if (!password) {
    return <Navigate to="/login" replace />; // Redirect to login if no user password
  }

  return children; // Render the child component (Admin)
};

export default ProtectedRoute;