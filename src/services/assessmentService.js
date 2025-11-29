import api from './api';

export const submitAssessment = async (payload) => {
  // TODO: When backend is ready, uncomment this:
  // const { data } = await api.post('/api/assessment', payload);
  // return data;

  // Mock response for now
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "Assessment saved",
        data: {
          ...payload,
          createdAt: new Date().toISOString()
        }
      });
    }, 1500);
  });
};

export const getAssessmentResults = async (userId) => {
    // const { data } = await api.get(`/api/assessment/${userId}`);
    // return data;
    return null;
};
