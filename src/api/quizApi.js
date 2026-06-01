import api from './axios';

// Get quiz by course
export const getQuizByCourse = async (
  slug,
) => {

  const response = await api.get(
    '/quizzes',
  );

  return response.data.filter(
    (quiz) =>
      quiz.course.slug === slug,
  );
};
// Submit quiz attempt
export const submitQuiz = async (data) => {
  const response = await api.post(
    '/quiz-attempts',
    data,
  );

  return response.data;
};