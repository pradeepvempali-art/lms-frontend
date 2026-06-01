import api from './axios';

export const getUserCertificates = async (
  userId
) => {
  const response = await api.get(
    `/certificates/user/${userId}`
  );

  return response.data;
};