import api from './axios';

export const enrollInCourse = async (data) => {
  const response = await api.post('/enrollments', data);
  return response.data;
};

export const getUserEnrollments = async (userId) => {
  const response = await api.get(`/enrollments/user/${userId}`);
  return response.data;
};