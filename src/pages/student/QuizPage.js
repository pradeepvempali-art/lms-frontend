import {
  useEffect,
  useState,
  useContext
} from 'react';


import { useParams,useNavigate } from 'react-router-dom';

import {
  getQuizByCourse,
  submitQuiz,
} from '../../api/quizApi';

import { AuthContext } from '../../context/AuthContext';

function QuizPage() {
const { slug } = useParams();
const navigate = useNavigate();
  const { user } =
    useContext(AuthContext);

  const [quiz, setQuiz] = useState(null);

  const [answers, setAnswers] =
    useState({});

  const [loading, setLoading] =
    useState(true);

  const [result, setResult] =
    useState(null);

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
  try {
    console.log("PARAM SLUG:", slug);

    const data = await getQuizByCourse(slug);

    console.log("QUIZZES FOUND:", data);

    setQuiz(data[0]);
  } catch (error) {
    console.error("Error fetching quiz:", error);
  } finally {
    setLoading(false);
  }
};

  const handleOptionChange = (
    questionId,
    value,
  ) => {
    setAnswers({
      ...answers,
      [questionId]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      let score = 0;

      quiz.questions.forEach((q) => {
        if (
          answers[q.id] ===
          q.correctAnswer
        ) {
          score++;
        }
      });

      const percentage = Math.round(
        (score / quiz.questions.length) *
          100,
      );

      const passed =
        percentage >=
        quiz.passingScore;

      const payload = {
        userId: user.id,
        quizId: quiz.id,
        score: percentage,
        passed,
      };

      await submitQuiz(payload);

setResult({
  score: percentage,
  passed,
});

// REDIRECT TO RESULT PAGE
navigate('/quiz-result', {
  state: {
    score: percentage,
    totalQuestions:
      quiz.questions.length,
    passed,
  },
});
    } catch (error) {
      console.error(
        'Error submitting quiz:',
        error,
      );
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <h3>Loading quiz...</h3>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="container mt-5">
        <h3>No quiz found.</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>{quiz.title}</h2>

      <p>{quiz.description}</p>

      {quiz.questions.map(
        (question, index) => (
          <div
            className="card mb-4"
            key={question.id}
          >
            <div className="card-body">
              <h5>
                Q{index + 1}.{' '}
                {question.question}
              </h5>

              {[
                question.optionA,
                question.optionB,
                question.optionC,
                question.optionD,
              ]
                .filter(Boolean)
                .map((option, i) => (
                  <div
                    className="form-check"
                    key={i}
                  >
                    <input
                      type="radio"
                      className="form-check-input"
                      name={question.id}
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(
                          question.id,
                          e.target.value,
                        )
                      }
                    />

                    <label className="form-check-label">
                      {option}
                    </label>
                  </div>
                ))}
            </div>
          </div>
        ),
      )}

      <button
        className="btn btn-primary"
        onClick={handleSubmit}
      >
        Submit Quiz
      </button>

      {result && (
        <div className="alert alert-info mt-4">
          <h4>
            Score: {result.score}%
          </h4>

          <h5>
            {result.passed
              ? 'Passed ✅'
              : 'Failed ❌'}
          </h5>
        </div>
      )}
    </div>
  );
}

export default QuizPage;