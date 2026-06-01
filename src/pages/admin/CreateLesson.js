import { useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/axios';

function CreateLesson() {
  const { courseId } = useParams();

  const [formData, setFormData] = useState({
    title: '',
    position: '',
    duration: '',
    videoUrl: '',
    sectionId: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/lessons', {
        ...formData,
        position: Number(formData.position),
        duration: Number(formData.duration),
      });

      alert('Lesson Created');

      window.location.href =
        `/admin/courses/${courseId}/lessons`;

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">

      <h2>Create Lesson</h2>

      <form onSubmit={handleSubmit}>

        <input
          className="form-control mb-3"
          placeholder="Title"
          name="title"
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          placeholder="Position"
          name="position"
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          placeholder="Duration"
          name="duration"
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          placeholder="Video URL"
          name="videoUrl"
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          placeholder="Section Id"
          name="sectionId"
          onChange={handleChange}
        />

        <button
          className="btn btn-primary"
          type="submit"
        >
          Save Lesson
        </button>

      </form>

    </div>
  );
}

export default CreateLesson;