import axios from "axios";

export const getProductByIdServicio = (id, token) => {
  return axios.get(`/Products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
