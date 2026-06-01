import {
  useEffect,
  useState,
} from 'react';

import {
  useParams,
  useNavigate,
} from 'react-router-dom';

import api from '../../api/axios';

function EditLesson() {

  const { id } = useParams();

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      title: '',
      videoUrl: '',
      position: '',
      sectionId: '',
    });

  useEffect(() => {
    fetchLesson();
  }, []);

  const fetchLesson = async () => {

    try {

      const response =
        await api.get(
          `/lessons/${id}`
        );

      setFormData(
        response.data
      );

    } catch (error) {

      console.error(error);
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
        `/lessons/${id}`,
        {
          ...formData,
          position:
            Number(
              formData.position
            ),
        }
      );

      alert(
        'Lesson Updated'
      );

      navigate(-1);

    } catch (error) {

      console.error(error);
    }
  };

  return (
    <div className="container mt-5">

      <h2>Edit Lesson</h2>

      <form
        onSubmit={
          handleSubmit
        }
      >

        <input
          className="form-control mb-3"
          name="title"
          value={
            formData.title
          }
          onChange={
            handleChange
          }
        />

        <input
          className="form-control mb-3"
          name="videoUrl"
          value={
            formData.videoUrl || ''
          }
          onChange={
            handleChange
          }
        />

        <input
          className="form-control mb-3"
          name="position"
          value={
            formData.position
          }
          onChange={
            handleChange
          }
        />

        <button
          className="btn btn-primary"
          type="submit"
        >
          Update Lesson
        </button>

      </form>

    </div>
  );
}

export default EditLesson;