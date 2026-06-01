import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../../api/axios';

function CreateCourse() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      title: '',
      slug: '',
      description: '',
      price: '',
      thumbnail: '',
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.post(
        '/admin/courses',
        {
          ...formData,
          price:
            Number(formData.price),
        }
      );

      alert('Course created!');

      navigate('/admin/courses');

    } catch (error) {

      console.error(
        'Error creating course:',
        error,
      );
    }
  };

  return (
    <div className="container mt-5">

      <div className="card shadow">

        <div className="card-body">

          <h2 className="mb-4">
            Create Course
          </h2>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label>
                Title
              </label>

              <input
                type="text"
                name="title"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>
                Slug
              </label>

              <input
                type="text"
                name="slug"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>
                Description
              </label>

              <textarea
                name="description"
                className="form-control"
                rows="4"
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label>
                Price
              </label>

              <input
                type="number"
                name="price"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label>
                Thumbnail URL
              </label>

              <input
                type="text"
                name="thumbnail"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="btn btn-success"
            >
              Create Course
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default CreateCourse;