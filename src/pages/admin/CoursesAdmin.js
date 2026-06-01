import { useEffect, useState } from "react";

import api from "../../api/axios";

function CoursesAdmin() {
  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await api.get("/admin/courses");

      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (id) => {
    const confirmDelete = window.confirm("Delete this course?");

    if (!confirmDelete) return;

    try {
      await api.delete(`/admin/courses/${id}`);

      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <h3>Loading courses...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Courses</h2>

        <button
          className="btn btn-primary"
          onClick={() => (window.location.href = "/admin/courses/create")}
        >
          Add Course
        </button>
      </div>

      <table className="table table-bordered shadow">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Slug</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.title}</td>

              <td>{course.slug}</td>

              <td>₹{course.price}</td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() =>
                    (window.location.href = `/admin/courses/edit/${course.id}`)
                  }
                >
                  Edit
                </button>

                <button
                  className="btn btn-info btn-sm me-2"
                  onClick={() =>
                    (window.location.href = `/admin/courses/${course.id}/lessons`)
                  }
                >
                  Lessons
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteCourse(course.id)}
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

export default CoursesAdmin;
