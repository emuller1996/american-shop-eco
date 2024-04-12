import React, { useState, useEffect } from "react";
import LogoutButton from "./LogoutButton";
import { Dropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import isClient from "../../utils/isClient";
import axios from "axios";
import { toast } from "react-toastify";
import { getNotificacionByUserServicio } from "../../services/notifications.services";

export default function DropdownProfile() {
  const [client, setClient] = useState(true);
  const { user } = useAuth0();
  const [Noti, setNoti] = useState(null);

  useEffect(() => {
    isClient(user)
      .then((data) => setClient(data))
      .catch((error) => setClient(error));

    validationNotificaion();
  }, [user]);

  const validationNotificaion = async () => {
    try {
      const r = await getNotificacionByUserServicio(user?.email);
      const noA = r.data;
      console.log(noA.filter((i) => i.status === false));
      setNoti(noA.filter((i) => i.status === false));
      const aalgo = noA.filter((i) => i.status === false);
      if (aalgo.length > 0) {
        toast.info(`Tiene ${aalgo.length} Notificaciones sin leer.`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="white" id="dropdown-basic">
          <i className="fa fa-fw fa-user text-dark mr-3"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu id="example-fade-text">
          <Dropdown.ItemText>
            <div className="container bg-ligth  rounded-3 p-0">
              <div className="text-center">
                <img
                  src={user ? user.picture : "..."}
                  width="60px"
                  className="img-fluid rounded-pill mb-2"
                  alt="..."
                />
              </div>
              <small className="text-sm p-0 m-0 f-6 text-nowrap text-uppercase d-block">
                {user ? user.name : "..."}
              </small>

              <div className="d-flex  flex-column  gap-2 ">
                <NavLink
                  className="btn btn-sm btn-light
               w-100 rounded-3 text-decoration-none"
                  to={"/d/mi-perfil"}
                >
                  <i className="far fa-user-circle me-2"></i>Mi Perfil
                </NavLink>
                <NavLink
                  className="btn btn-sm btn-light
               w-100 rounded-3 text-decoration-none"
                  to={"/d/mis-pedidos"}
                >
                  <i className="fas fa-shipping-fast me-2"></i>
                  Mis Pedidos
                </NavLink>
                <NavLink
                  className="btn btn-sm btn-light
               w-100 rounded-3 text-decoration-none "
                  to={"/d/notificaciones"}
                >
                  <i class="fas fa-bell me-2"></i>
                  Notificaciones
                  <span class="ms-1 badge bg-secondary">
                    {Noti && Noti.length}
                  </span>
                </NavLink>
              </div>
              <small className="text-sm text-center p-0 m-0 f-6 text-nowrap text-uppercase d-block mt-2">
                <LogoutButton />
              </small>
            </div>
          </Dropdown.ItemText>
          <Dropdown.Item></Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}
