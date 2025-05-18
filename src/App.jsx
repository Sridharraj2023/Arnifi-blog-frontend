import { Routes, Route } from 'react-router-dom';
import Signup from './auth/Signup';
import Login from './auth/Login';
import AllBlogs from './blogs/AllBlogs';
import CreateBlog from './blogs/CreateBlog';
import EditBlog from './blogs/EditBlog';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css'

import { ToastContainer } from 'react-toastify';  // Import ToastContainer

function App() {
  return (
    <div>
      <Navbar />
      
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<ProtectedRoute><AllBlogs /></ProtectedRoute>} />
        <Route path="/create" element={<ProtectedRoute><CreateBlog /></ProtectedRoute>} />
        <Route path="/edit/:id" element={<ProtectedRoute><EditBlog /></ProtectedRoute>} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} /> {/* Add ToastContainer here */}
    </div>
  );
}

export default App;

