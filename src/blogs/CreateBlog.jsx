import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

const CreateBlog = () => {
  const [inputs, setInputs] = useState({ title: '', category: '', content: '', image: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/blogs', inputs, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Blog created successfully!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Blog creation failed');
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">Create Blog</h2>
      <form onSubmit={handleSubmit}>
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
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
