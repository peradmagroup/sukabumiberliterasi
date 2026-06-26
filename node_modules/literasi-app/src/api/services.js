import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : 'http://localhost:3000/api',
  withCredentials: true, // For sending cookies/sessions
});

// Info
export const fetchInfo = async (category) => {
  const params = category && category !== 'Semua' ? { category } : {};
  const { data } = await api.get('/info', { params });
  return data;
};

// Agenda
export const fetchAgenda = async (category) => {
  const params = category ? { category } : {};
  const { data } = await api.get('/agenda', { params });
  return data;
};

// Mitra
export const fetchMitra = async (type) => {
  const params = type ? { type } : {};
  const { data } = await api.get('/mitra', { params });
  return data;
};

// Konsul
export const fetchLiveAduan = async () => {
  const { data } = await api.get('/konsul/live');
  return data;
};

export const submitAduan = async (payload) => {
  const { data } = await api.post('/konsul', payload);
  return data;
};

// Donasi
export const fetchDonasiStats = async () => {
  const { data } = await api.get('/donasi/stats');
  return data;
};

export const fetchDropoffLocations = async () => {
  const { data } = await api.get('/donasi/dropoff');
  return data;
};

export const submitJemputDonasi = async (payload) => {
  const { data } = await api.post('/donasi/pickup', payload);
  return data;
};
