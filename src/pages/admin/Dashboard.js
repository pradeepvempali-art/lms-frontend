import {
  useEffect,
  useState,
} from 'react';

import { getAdminStats }
from '../../api/adminApi';

function Dashboard() {

  const [stats, setStats] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {

      const data =
        await getAdminStats();

      setStats(data);

    } catch (error) {

      console.error(
        'Error fetching stats:',
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
        Admin Dashboard
      </h2>

      <div className="row">

        {/* COURSES */}
        <div className="col-md-3 mb-4">
          <div className="card shadow text-center h-100">
            <div className="card-body">
              <h3>
                {stats.totalCourses}
              </h3>

              <p>Total Courses</p>
            </div>
          </div>
        </div>

        {/* USERS */}
        <div className="col-md-3 mb-4">
          <div className="card shadow text-center h-100">
            <div className="card-body">
              <h3>
                {stats.totalUsers}
              </h3>

              <p>Total Users</p>
            </div>
          </div>
        </div>

        {/* ENROLLMENTS */}
        <div className="col-md-3 mb-4">
          <div className="card shadow text-center h-100">
            <div className="card-body">
              <h3>
                {stats.totalEnrollments}
              </h3>

              <p>Enrollments</p>
            </div>
          </div>
        </div>

        {/* CERTIFICATES */}
        <div className="col-md-3 mb-4">
          <div className="card shadow text-center h-100">
            <div className="card-body">
              <h3>
                {stats.totalCertificates}
              </h3>

              <p>Certificates</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;