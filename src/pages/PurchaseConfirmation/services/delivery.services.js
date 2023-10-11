import axios from "axios";

export const getDeliveryAddressByIdUser = (email, token) => {
  return axios.get(`/deliveryAddress/${email}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
