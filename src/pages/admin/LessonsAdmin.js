import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import api from "../../api/axios";

function LessonsAdmin() {
  const { courseId } = useParams();

  const [lessons, setLessons] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const response = await api.get(`/lessons/course/${courseId}`);

      setLessons(response.data);
    } catch (error) {
      console.error("Error fetching lessons:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteLesson = async (id) => {
    const confirmDelete = window.confirm("Delete this lesson?");

    if (!confirmDelete) return;

    try {
      await api.delete(`/admin/lessons/${id}`);

      fetchLessons();
    } catch (error) {
      console.error("Error deleting lesson:", error);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <h3>Loading lessons...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Lessons</h2>

        <button
          className="btn btn-primary"
          onClick={() =>
            (window.location.href = `/admin/courses/${courseId}/lessons/create`)
          }
        >
          Add Lesson
        </button>
      </div>

      <table className="table table-bordered shadow">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Position</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {lessons.map((lesson) => (
            <tr key={lesson.id}>
              <td>{lesson.title}</td>

              <td>{lesson.position}</td>

              <td>{lesson.duration || 0} mins</td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() =>
                    (window.location.href = `/admin/lessons/edit/${lesson.id}`)
                  }
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteLesson(lesson.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LessonsAdmin;
