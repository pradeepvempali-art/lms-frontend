import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function Home() {

  const { user } = useContext(AuthContext);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
        <div className="container text-center">
          <h1 className="display-4 fw-bold">
            Welcome to LearnHub LMS
          </h1>

          <p className="lead mt-3">
            Learn modern technologies like React,
            NestJS, PostgreSQL, DevOps, and more.
          </p>

          <div className="mt-4">

            <Link
              to="/courses"
              className="btn btn-light btn-lg me-3"
            >
              Browse Courses
            </Link>

            {user ? (
              <Link
                to="/my-enrollments"
                className="btn btn-outline-light btn-lg"
              >
                Continue Learning
              </Link>
            ) : (
              <Link
                to="/register"
                className="btn btn-outline-light btn-lg"
              >
                Get Started
              </Link>
            )}

          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-5">
        <div className="container">

          <h2 className="text-center mb-5">
            Why Choose LearnHub?
          </h2>

          <div className="row">

            <div className="col-md-4 mb-4">
              <div className="card shadow h-100">
                <div className="card-body text-center">

                  <h4>Expert Instructors</h4>

                  <p>
                    Learn from industry professionals
                    with real-world experience.
                  </p>

                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card shadow h-100">
                <div className="card-body text-center">

                  <h4>Hands-on Projects</h4>

                  <p>
                    Build real applications to gain
                    practical skills.
                  </p>

                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card shadow h-100">
                <div className="card-body text-center">

                  <h4>Certificates</h4>

                  <p>
                    Earn certificates after completing
                    courses successfully.
                  </p>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;