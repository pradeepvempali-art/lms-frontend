import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { markLessonCompleted } from '../../api/lessonProgressApi';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
function CourseLearn() {
  const { courseId } = useParams();
  const { user } = useContext(AuthContext);

  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    fetchLessons();
  }, [courseId]);

  const fetchLessons = async () => {
  try {
    const response = await api.get(
      `/courses/${courseId}`,
    );

    const course = response.data;
    console.log("COURSE DATA:", course);

    // collect all lessons from sections
    const allLessons =
      course.sections.flatMap(
        (section) => section.lessons,
      );

    setLessons(allLessons);

    if (allLessons.length > 0) {
      setSelectedLesson(allLessons[0]);
    }
  } catch (error) {
    console.error(
      'Error fetching lessons:',
      error,
    );
  } finally {
    setLoading(false);
  }
};
  const handleCompleteLesson = async () => {
    if (!user) {
      setMessage('Please login first.');
      return;
    }

    if (!selectedLesson) {
      setMessage('Please select a lesson.');
      return;
    }

    try {
      setCompleting(true);
      setMessage('');

      const result = await markLessonCompleted({
        userId: user.id,
        lessonId: selectedLesson.id,
      });

      setMessage(
        result.message || 'Lesson marked as completed.'
      );
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          'Failed to mark lesson as completed.'
      );
    } finally {
      setCompleting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <h3>Loading lessons...</h3>
      </div>
    );
  }

  if (loading) {
  return (
    <div className="container mt-5">
      <h3>Loading lessons...</h3>
    </div>
  );
}

  const noLessons = lessons.length === 0;

  return (

    
    <div className="container mt-4">
      {noLessons && (
  <div className="mb-4">
    <h3>
      No lessons available for this course.
    </h3>
  </div>
)}
      <div className="row">
        {/* Left Side: Video Player */}
        <div className="col-md-8">
          {selectedLesson && (
            <>
              <h2>{selectedLesson.title}</h2>

              <div className="ratio ratio-16x9 mb-3">
                <iframe
                  src={selectedLesson.videoUrl}
                  title={selectedLesson.title}
                  allowFullScreen
                ></iframe>
              </div>

              <p>{selectedLesson.description}</p>

              <p>
                <strong>Duration:</strong>{' '}
                {selectedLesson.duration} minutes
              </p>

              {/* Success/Error Message */}
              {message && (
                <div className="alert alert-info mt-3">
                  {message}
                </div>
              )}

              {/* Mark Completed Button */}
              <button
                className="btn btn-success mt-3"
                onClick={handleCompleteLesson}
                disabled={completing}
              >
                {completing
                  ? 'Saving...'
                  : 'Mark as Completed'}
              </button>
            </>
          )}
        </div>

        

        {/* Right Side: Lesson List */}
        <div className="col-md-4">
          <h4>Lessons</h4>

          <div className="list-group">
            {lessons.map((lesson, index) => (
              <button
                key={lesson.id}
                className={`list-group-item list-group-item-action ${
                  selectedLesson?.id === lesson.id
                    ? 'active'
                    : ''
                }`}
                onClick={() => {
                  setSelectedLesson(lesson);
                  setMessage('');
                }}
              >
                Lesson {index + 1}: {lesson.title}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
  <Link
  to={`/quiz/${selectedLesson?.courseId}`}
  className="btn btn-warning"
>
  Take Quiz
</Link>
</div>
      </div>
    </div>
  );
}

export default CourseLearn;