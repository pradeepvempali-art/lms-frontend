import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { AuthContext } from '../../context/AuthContext';
import { enrollInCourse } from '../../api/enrollmentApi';

function CourseDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const auth = useContext(AuthContext);
  const user = auth?.user;

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch course details
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await api.get(`/courses/${slug}`);
        setCourse(response.data);
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [slug]);

  // Handle enrollment
  const handleEnroll = async () => {
    // If user is not logged in
    if (!user) {
      setMessage('Please login first.');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
      return;
    }

    try {
      setEnrolling(true);
      setMessage('');

      // Debug logs
      console.log('User ID:', user.id);
      console.log('Course ID:', course.id);

      // Send correct payload
      const result = await enrollInCourse({
        userId: user.id,
        courseId: course.id,
      });

      setMessage(result.message || 'Enrollment successful!');
    } catch (error) {
      const errorMessage = error.response?.data?.message;

      if (Array.isArray(errorMessage)) {
        setMessage(errorMessage.join(', '));
      } else {
        setMessage(errorMessage || 'Enrollment failed.');
      }
    } finally {
      setEnrolling(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="container mt-5">
        <h3>Loading course...</h3>
      </div>
    );
  }

  // Course not found
  if (!course) {
    return (
      <div className="container mt-5">
        <h3>Course not found.</h3>
      </div>
    );
  }

  // Check enrollment status
  const isAlreadyEnrolled =
    message === 'Enrollment successful!' ||
    message === 'Enrollment successful.' ||
    message === 'Student already enrolled in this course';

  return (
    <div className="container mt-5">
      <h1>{course.title}</h1>
      <p className="lead">{course.description}</p>

      <p>
        <strong>Price:</strong> ₹{course.price}
      </p>

      <p>
        <strong>Level:</strong> {course.level}
      </p>

      <p>
        <strong>Status:</strong> {course.status}
      </p>

      {/* Message */}
      {message && (
        <div
          className={`alert mt-3 ${
            isAlreadyEnrolled
              ? 'alert-success'
              : message === 'Please login first.'
              ? 'alert-warning'
              : 'alert-info'
          }`}
        >
          {message}
        </div>
      )}

      {/* Enroll Button */}
      <button
        className="btn btn-primary mt-3"
        onClick={handleEnroll}
        disabled={enrolling || isAlreadyEnrolled}
      >
        {isAlreadyEnrolled
          ? 'Already Enrolled'
          : enrolling
          ? 'Enrolling...'
          : 'Enroll Now'}
      </button>
    </div>
  );
}

export default CourseDetails;