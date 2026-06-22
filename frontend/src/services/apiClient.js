import axios from 'axios';

// This client prepends "/api" on every call, so the base URL must be the
// bare origin WITHOUT a trailing /api. Normalize accordingly: if the env
// value already includes /api, strip it; otherwise use it as-is.
const rawApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
const API_URL = rawApiUrl.replace(/\/$/, '').replace(/\/api$/, '');

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// AI Services
export const analyzeJobDescription = async (jdText) => {
  const response = await api.post('/api/ai/analyze-jd', { jdText });
  return response.data;
};

export const rewriteBullet = async (bullet, keyword) => {
  const response = await api.post('/api/ai/rewrite', { bullet, keyword });
  return response.data;
};

export const calculateATSScore = async (resumeText, jdText) => {
  const response = await api.post('/api/ai/ats-score', { resumeText, jdText });
  return response.data;
};

export const generateCoverLetter = async (resumeText, jdText, tone = 'professional') => {
  const response = await api.post('/api/ai/cover-letter', { resumeText, jdText, tone });
  return response.data;
};

export const chatWithAI = async (message, chatHistory = [], resumeContext = '') => {
  const response = await api.post('/api/ai/chat', { message, chatHistory, resumeContext });
  return response.data;
};

export const generateInterviewQuestions = async (jobTitle, company = '', jobDescription = '') => {
  const response = await api.post('/api/ai/interview-questions', { jobTitle, company, jobDescription });
  return response.data;
};

// Resume Services
export const saveResume = async (resumeData, token) => {
  const response = await api.post('/api/resume', resumeData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getResumes = async (token) => {
  const response = await api.get('/api/resume', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const generatePDF = async (htmlContent, token) => {
  const response = await api.post('/api/resume/pdf', { htmlContent }, {
    headers: { Authorization: `Bearer ${token}` },
    responseType: 'blob',
  });
  return response.data;
};

// Auth Services
export const register = async (userData) => {
  const response = await api.post('/api/auth/register', userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post('/api/auth/login', credentials);
  return response.data;
};

export default api;
