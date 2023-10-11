import axios from "axios";

export const getOrdersByUserServicio = (email, token) => {
  return axios.get(`/order/${email}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
