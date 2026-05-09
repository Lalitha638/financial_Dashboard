import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

// All API calls in one place — easy to change the URL later
export const getSummary = () => axios.get(`${BASE_URL}/summary`);
export const getByCategory = () => axios.get(`${BASE_URL}/by-category`);
export const getMonthly = () => axios.get(`${BASE_URL}/monthly`);
export const getTransactions = () => axios.get(`${BASE_URL}/transactions`);

export const addTransaction = (data) =>
  axios.post(`${BASE_URL}/transactions`, data);

export const deleteTransaction = (id) =>
  axios.delete(`${BASE_URL}/transactions/${id}`);