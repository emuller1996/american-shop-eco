import axios from "axios";

export const getNotificacionByUserServicio = (email, token) => {
    return axios.get(`/user/check/${email}/notifications`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };