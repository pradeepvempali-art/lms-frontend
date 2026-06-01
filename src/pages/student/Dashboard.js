import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getUserEnrollments } from '../../api/enrollmentApi';
import { getCourseProgress } from '../../api/lessonProgressApi';

function Dashboard() {
  const { user } = useContext(AuthContext);

  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progressMap, setProgressMap] = useState({});

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
  try {
    const enrollmentData =
      await getUserEnrollments(user.id);

    setEnrollments(enrollmentData);

    const progressData = {};

    for (const enrollment of enrollmentData) {
      const progress =
        await getCourseProgress(
          user.id,
          enrollment.course.id,
        );

      progressData[enrollment.course.id] =
        progress;
    }

    setProgressMap(progressData);
  } catch (error) {
    console.error(
      'Error fetching dashboard:',
      error,
    );
  } finally {
    setLoading(false);
  }
};

  if (loading) {
    return (
      <div className="container mt-5">
        <h3>Loading dashboard...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">
        Welcome, {user?.name}
      </h2>

      {/* Stats */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card shadow text-center">
            <div className="card-body">
              <h5>Total Enrollments</h5>
              <h2>{enrollments.length}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow text-center">
            <div className="card-body">
              <h5>Courses In Progress</h5>
              <h2>
                {
                  enrollments.filter(
                    (e) => !e.completedAt
                  ).length
                }
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow text-center">
            <div className="card-body">
              <h5>Completed Courses</h5>
              <h2>
                {
                  enrollments.filter(
                    (e) => e.completedAt
                  ).length
                }
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Courses */}
      <div className="card shadow">
        <div className="card-body">
          <h4 className="mb-3">
            My Recent Courses
          </h4>

          {enrollments.length === 0 ? (
            <p>
              You have not enrolled in any
              courses yet.
            </p>
          ) : (
            <ul className="list-group">
              {enrollments.map((enrollment) => (
                <li
                  key={enrollment.id}
                  className="list-group-item"
                >
                 <div>
  <strong>
    {enrollment.course.title}
  </strong>

  <div className="mt-2">
  <div className="progress">
  <div
    className="progress-bar"
    role="progressbar"
    style={{
      width: `${
        progressMap[
          enrollment.course.id
        ]?.percentage || 0
      }%`,
    }}
  >
    {progressMap[
      enrollment.course.id
    ]?.percentage > 0
      ? `${progressMap[
          enrollment.course.id
        ]?.percentage}%`
      : ''}
  </div>
</div>

<small className="text-muted">
  Progress:{' '}
  {progressMap[
    enrollment.course.id
  ]?.percentage || 0}
  %
</small>
</div>
</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;