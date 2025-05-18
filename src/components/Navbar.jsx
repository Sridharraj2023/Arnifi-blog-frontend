import React, { useContext } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
      <Link className="navbar-brand px-3" to="/">Arnifi Blog</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/">All Blogs</Link>
          </li>
          {user && (
            <>
              
              <li className="nav-item">
                <Link className="nav-link" to="/create">Create Blog</Link>
              </li>
            </>
          )}
        </ul>

        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          {!user ? (
            <>
              <li className="nav-item">
                <Link className="nav-link mx-3" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mx-3" to="/signup">Sign Up</Link>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
