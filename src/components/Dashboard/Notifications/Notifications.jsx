import React, { useEffect, useState } from "react";
import { getNotificacionByUserServicio } from "../../../services/notifications.services";
import { useAuth0 } from "@auth0/auth0-react";
import ReactTimeAgo from "react-time-ago";
import { Link } from "react-router-dom";
import axios from "axios";
export default function Notifications() {
  const { user } = useAuth0();
  const [AllNoti, setAllNoti] = useState(null);

  useEffect(() => {
    getAllNotificacion();
  }, []);

  const getAllNotificacion = async () => {
    try {
      const r = await getNotificacionByUserServicio(user?.email);
      setAllNoti(r.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container  p-4" style={{ minHeight: "65vh" }}>
        <h2 className> Notificaciones</h2>
        <div className="row g-3">
          {AllNoti &&
            AllNoti.map((n) => (
              <div key={n.id} className="col-md-6">
                <div
                  class="card position-relative"
                  onClick={async () => {
                    if (n.status === false) {
                      try {
                        const r = await axios.patch(
                          `/user/check/notifications/${n?.id}/`
                        );
                        getAllNotificacion();

                        console.log(r.data);
                      } catch (error) {
                        console.log(error);
                      }
                    }
                  }}
                >
                  {n.status === false && (
                    <span class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                      <span class="visually-hidden">New alerts</span>
                    </span>
                  )}
                  <div class="card-body">
                    <div className="d-flex text-muted justify-content-between">
                      <small class="m-0">Notificacion : {n?.type}</small>
                      <ReactTimeAgo date={n?.createdAt} locale="en-CO" />
                    </div>
                    <p class="m-0">{n?.message}</p>
                    <div className="text-center">

                    <Link to={n?.link} class="m-0">
                      Ver Detalle
                    </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
