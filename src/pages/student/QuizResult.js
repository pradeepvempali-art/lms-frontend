import {
  useLocation,
  Link,
} from 'react-router-dom';

function QuizResult() {

  const location = useLocation();

  const {
    score,
    totalQuestions,
    passed,
  } = location.state || {};

  return (
    <div className="container mt-5">

      <div className="card shadow p-4">

        <h2 className="mb-4">
          Quiz Result
        </h2>

        <h4>
  Score: {score}%
</h4>

<p>
  Total Questions: {totalQuestions}
</p>

        <h4 className="mt-3">

          Result:{' '}

          {passed ? (
            <span className="text-success">
              PASSED ✅
            </span>
          ) : (
            <span className="text-danger">
              FAILED ❌
            </span>
          )}

        </h4>

        <div className="mt-4">

          <Link
            to="/my-enrollments"
            className="btn btn-primary me-3"
          >
            My Enrollments
          </Link>

          <Link
            to="/courses"
            className="btn btn-secondary"
          >
            Browse Courses
          </Link>

        </div>

      </div>

    </div>
  );
}

export default QuizResult;