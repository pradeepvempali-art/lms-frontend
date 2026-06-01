import api from './axios';

// Get all lessons for a course
export const getLessonsByCourse = async (courseId) => {
  const response = await api.get(`/lessons/course/${courseId}`);
  return response.data;
};