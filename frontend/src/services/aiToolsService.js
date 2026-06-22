import axios from 'axios';

// Normalize the base URL so it always ends with /api, regardless of whether
// VITE_API_URL includes the /api suffix (e.g. "http://localhost:5001/api")
// or just the origin (e.g. "http://localhost:5001"). The Express server
// mounts all routes under /api/*, so calls like `${API_URL}/ai/advanced/...`
// must resolve to http://localhost:5001/api/ai/advanced/...
const rawApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
const API_URL = rawApiUrl.replace(/\/$/, '').endsWith('/api')
  ? rawApiUrl.replace(/\/$/, '')
  : `${rawApiUrl.replace(/\/$/, '')}/api`;

// Brutal Honest Review
export const getBrutalHonestReview = async (resumeText) => {
  const response = await axios.post(`${API_URL}/ai/advanced/brutal-review`, {
    resumeText
  });
  return response.data;
};

// ATS Optimizer
export const optimizeForATS = async (resumeText, jobDescription) => {
  const response = await axios.post(`${API_URL}/ai/advanced/ats-optimizer`, {
    resumeText,
    jobDescription
  });
  return response.data;
};

// Bullet Point Transformer
export const transformBullets = async (bullets, jobContext = '') => {
  const response = await axios.post(`${API_URL}/ai/advanced/transform-bullets`, {
    bullets,
    jobContext
  });
  return response.data;
};

// Industry Tone Match
export const matchIndustryTone = async (resumeText, targetCompanies, targetRole) => {
  const response = await axios.post(`${API_URL}/ai/advanced/industry-tone`, {
    resumeText,
    targetCompanies,
    targetRole
  });
  return response.data;
};

// Final Polish Review
export const getFinalPolishReview = async (resumeText) => {
  const response = await axios.post(`${API_URL}/ai/advanced/final-polish`, {
    resumeText
  });
  return response.data;
};

// Parse PDF/DOCX Resume
// NOTE: Do NOT set Content-Type manually — axios auto-generates the
// multipart boundary when given a FormData body. Setting it manually
// strips the boundary and corrupts the upload.
export const parseResumeFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(`${API_URL}/resume/parse`, formData, {
    headers: {
      // Let the browser set the correct multipart Content-Type w/ boundary
    },
  });
  return response.data;
};

// Export Resume
export const exportResume = async (resumeData, format = 'pdf') => {
  const response = await axios.post(`${API_URL}/resume/export`, {
    resumeData,
    format
  }, {
    responseType: 'blob'
  });
  return response.data;
};
