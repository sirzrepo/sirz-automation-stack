// Redirect.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Redirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const password = localStorage.getItem('password');
    if (password) {
      navigate('/admin'); // Redirect to admin if the user exists in localStorage
    }
  }, [navigate]);

  return null; // Render nothing
};

export default Redirect;
