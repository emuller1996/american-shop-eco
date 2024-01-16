import axios from "axios";

export const getPaymnetByIdMercadoPagoServicio = (id) => {
  return axios.get(`/payments/${id}/order/`, {
    /* headers: {
      Authorization: `Bearer ${token}`,
    }, */
  });
};
