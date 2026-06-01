import {
  useEffect,
  useState,
} from 'react';

import {
  useParams,
  useNavigate,
} from 'react-router-dom';

import api from '../../api/axios';

function EditCourse() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      title: '',
      slug: '',
      description: '',
      price: '',
      thumbnail: '',
    });

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {

    try {

      const response =
        await api.get(
          `/courses/${id}`
        );

      setFormData(response.data);

    } catch (error) {

      console.error(
        'Error fetching course:',
        error,
      );
    }
  };

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

      await api.patch(
        `/admin/courses/${id}`,
        {
          ...formData,
          price:
            Number(formData.price),
        }
      );

      alert('Course updated!');

      navigate('/admin/courses');

    } catch (error) {

      console.error(
        'Error updating course:',
        error,
      );
    }
  };

  return (
    <div className="container mt-5">

      <div className="card shadow">

        <div className="card-body">

          <h2 className="mb-4">
            Edit Course
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
                value={formData.title}
                onChange={handleChange}
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
                value={formData.slug}
                onChange={handleChange}
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
                value={formData.description}
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
                value={formData.price}
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
                value={formData.thumbnail}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
            >
              Update Course
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default EditCourse;