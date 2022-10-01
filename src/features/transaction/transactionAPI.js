import axios from "../../utils/axios";

export const getTransactions = async (type, search, page) => {
  let queryString = "";
  if (type === "all" || page !== "") {
    queryString += `_page=${page}&_limit=5`;
  }
  if (type === "income") {
    queryString = `&type=${type}`;
  }
  if (type === "expense") {
    queryString = `&type=${type}`;
  }
  if (search !== "") {
    queryString += `&name_like=${search}`;
  }
  const response = await axios.get(`/transactions?${queryString}`);
  return response.data;
};

export const addTransaction = async (data) => {
  const response = await axios.post("/transactions", data);
  return response.data;
};

export const editTransaction = async (id, data) => {
  const response = await axios.put(`/transactions/${id}`, data);
  return response.data;
};

export const deleteTransaction = async (id) => {
  const response = await axios.delete(`/transactions/${id}`);
  return id;
};
