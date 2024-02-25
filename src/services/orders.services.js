import axios from "axios";

export const getOrdersByUserServicio = (email, token) => {
  return axios.get(`/order/${email}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getOrdersByIdServicio = (id) => {
  return axios.get(`/order/comfirmation/${id}/`, {
    /*  headers: {
      Authorization: `Bearer ${token}`,
    }, */
  });
};
