import api from './axios';


// Mark lesson completed
export const markLessonCompleted = async (
  data,
) => {
  const response = await api.post(
    '/lesson-progress',
    data,
  );

  return response.data;
};

// Get completed lessons
export const getCompletedLessons = async (
  userId,
) => {
  const response = await api.get(
    `/lesson-progress/user/${userId}`,
  );

  return response.data;
};

export const getCourseProgress = async (
  userId,
  courseId,
) => {
  const response = await api.get(
    `/lesson-progress/progress/${userId}/${courseId}`,
  );

  return response.data;
};