import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [filters, setFilters] = useState({ category: '', author: '' });
  const loggedInUserId = localStorage.getItem('userId');  // <-- use userId here
  const token = localStorage.getItem('token');

  const fetchBlogs = async () => {

     const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You must be logged in to view blogs');
      return;
    }

    try {
      const queryParams = new URLSearchParams();
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.author) queryParams.append('author', filters.author);

      const res = await axios.get(`https://arnifi-blog-backend-3s0g.onrender.com/api/blogs?${queryParams.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBlogs(res.data);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      toast.error(err.response?.data?.message || 'Failed to fetch blogs');
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [filters]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;

    try {
      await axios.delete(`https://arnifi-blog-backend-3s0g.onrender.com/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Blog deleted successfully!');
      fetchBlogs();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete blog');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Blogs</h2>

      <div className="mb-4 d-flex gap-3 flex-wrap">
        <input
          className="form-control"
          style={{ maxWidth: '300px' }}
          placeholder="Filter by category"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        />
        <input
          className="form-control"
          style={{ maxWidth: '300px' }}
          placeholder="Filter by author"
          value={filters.author}
          onChange={(e) => setFilters({ ...filters, author: e.target.value })}
        />
      </div>

      <div className="row g-4">
        {blogs.length === 0 && (
          <p className="text-muted">No blogs found matching filters.</p>
        )}

        {blogs.map((blog) => (
          <div className="col-12 col-md-6 col-lg-4" key={blog._id}>
            <div className="card shadow-sm h-100" style={{ minHeight: '400px' }}>
              {blog.image && (
                <img
                  src={blog.image}
                  className="card-img-top"
                  alt="blog"
                  style={{ height: '180px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{blog.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Category: {blog.category} | Author: {blog.author /* or blog.userId.name if populated */}
                </h6>
                <div
                  className="card-text flex-grow-1 mb-3"
                  style={{
                    overflowY: 'auto',
                    maxHeight: '140px',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {blog.content}
                </div>

                {/* Show Edit/Delete only if logged in user owns the blog */}
                {blog.userId && blog.userId._id === loggedInUserId && (
                  <div className="mt-auto d-flex justify-content-between">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => window.location.href = `/edit/${blog._id}`}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(blog._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;
