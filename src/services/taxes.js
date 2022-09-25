import axios from 'axios';
import { baseUrl } from '../constants/Urls';

const getSeasons = async () => {
  const response = await axios.get(`${baseUrl}/taxes`);
  return response.data;
};

const getForm = async (id) => {
  const response = await axios.get(`${baseUrl}/taxes/${id}/form`);
  return response.data;
};

const getSubmissions = async () => {
  const response = await axios.get(`${baseUrl}/submissions`);
  return response.data;
};

const addSubmission = async (submission, taxId) => {
  const response = await axios.post(`${baseUrl}/taxes/${taxId}/submissions`, submission);
  return response.data;
};

export default { getSeasons, getForm, addSubmission, getSubmissions };
