import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getUserEnrollments } from '../api/enrollmentApi';
import { Link } from 'react-router-dom';
import api from '../api/axios';

function MyEnrollments() {
  const { user } = useContext(AuthContext);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
  try {

    const data = await getUserEnrollments(user.id);

    const updatedEnrollments =
      await Promise.all(

        data.map(async (enrollment) => {

          const progressResponse =
  await api.get(
    `/courses/${enrollment.course.id}/progress/${user.id}`
  );
          return {
            ...enrollment,
            progress:
              progressResponse.data.progressPercentage,
          };
        })

      );

    setEnrollments(updatedEnrollments);

  } catch (error) {
    console.error(
      'Error fetching enrollments:',
      error,
    );
  } finally {
    setLoading(false);
  }
};
  if (loading) {
    return (
      <div className="container mt-5">
        <h3>Loading enrollments...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>My Enrollments</h2>

      {enrollments.length === 0 ? (
        <p>You have not enrolled in any courses yet.</p>
      ) : (
        <div className="row">
          {enrollments.map((enrollment) => (
            <div className="col-md-4 mb-4" key={enrollment.id}>
              <div className="card h-100 shadow">
                <div className="card-body">
                  <h5>{enrollment.course.title}</h5>
                  <p>{enrollment.course.description}</p>

                  <p>
  <strong>Progress:</strong>{' '}
  {enrollment.progress ?? 0}%
</p>

<div className="progress mb-3">
  <div
  className={`progress-bar ${
    enrollment.progress === 100
      ? 'bg-success'
      : 'bg-primary'
  }`}
    role="progressbar"
    style={{
      width: `${
        enrollment.progress ?? 0
      }%`,
    }}
  >
    {enrollment.progress ?? 0}%
  </div>
</div>

<p>
  <strong>Status:</strong>{' '}

  {enrollment.progress === 100 ? (
  <span className="badge bg-success">
    Completed
  </span>
) : (
  <span className="badge bg-warning text-dark">
    In Progress
  </span>
)}
</p>

<Link
  to={`/learn/${enrollment.course.slug}`}
  className="btn btn-primary"
>
  {enrollment.progress === 100
  ? 'Review Course'
  : 'Continue Learning'}
</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyEnrollments;