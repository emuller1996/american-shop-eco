import axios from "axios";

export const getDeliveryAddressByIdUser = (email, token) => {
  return axios.get(`/deliveryAddress/${email}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const postCreateDeliveryAddressByIdUser = (data, token) => {
  return axios.post("/deliveryAddress/", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const putEditDeliveryAddressByIdUser = (data, token) => {
  return axios.put("/deliveryAddress/", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};