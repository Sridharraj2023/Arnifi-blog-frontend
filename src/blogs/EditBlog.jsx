import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

const EditBlog = () => {
  const { id } = useParams();
  const [inputs, setInputs] = useState({ title: '', category: '', content: '', image: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`https://arnifi-blog-backend-3s0g.onrender.com/api/blogs/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setInputs(res.data);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error fetching blog');
      }
    };
    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`https://arnifi-blog-backend-3s0g.onrender.com/api/blogs/${id}`, inputs, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Blog updated successfully!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">Edit Blog</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <input
            type="text"
            name="title"
            className="form-control"
            placeholder="Title"
            value={inputs.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="category"
            className="form-control"
            placeholder="Category"
            value={inputs.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            name="content"
            className="form-control"
            placeholder="Content"
            rows="5"
            value={inputs.content}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="image"
            className="form-control"
            placeholder="Image URL (optional)"
            value={inputs.image}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
