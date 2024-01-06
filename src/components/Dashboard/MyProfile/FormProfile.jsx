import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";

export default function FormProfileComponent() {
  const [userDb, setUserDb] = useState(undefined);
  const { user } = useAuth0();

  useEffect(() => {
    getUser();
    console.log(userDb);
  }, []);

  const onHadleInputUser = (e) => {
    setUserDb({
      ...userDb,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    console.log("onSubmitForm", userDb);

    const result = await axios.put(`/user/${userDb.email}`, userDb);
    if (result.status === 202) {
      toast.success(result.data.response, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const getUser = async () => {
    const result = await axios.get(`/user/${user.email}`);
    setUserDb(result.data);
    console.log(result.data);
  };

  return (
    <>
      <form action="" onSubmit={onSubmitForm}>
        <div className="form-floating mb-3">
          <input
            type="text"
            name="name"
            className="form-control"
            id="nameUser"
            value={userDb ? userDb.name : ""}
            disabled
          />
          <label for="nameUser">Nombre</label>
        </div>
        <div className="form-floating  mb-3">
          <input
            type="email"
            className="form-control"
            id="emailUser"
            value={userDb ? userDb.email : ""}
            disabled
          />
          <label for="emailUser">Correo</label>
        </div>

        <div className="row">
          <div className="col-md-3">
            <div className="form-floating mb-3">
              <select
                className="form-select"
                name="documentType"
                id="tipoDocumento"
                aria-label="Floating label select example"
                onChange={onHadleInputUser}
              >
                <option
                  selected={
                    userDb && userDb.documentType === "CC" ? true : false
                  }
                  value="CC"
                >
                  CC : CEDULA DE CIUDADANIA
                </option>
                <option
                  selected={
                    userDb && userDb.documentType === "CE" ? true : false
                  }
                  value="CE"
                >
                  CE : CEDULA EXTRANJERA
                </option>
                <option
                  selected={
                    userDb && userDb.documentType === "PP" ? true : false
                  }
                  value="PP"
                >
                  PP : PASAPORTE
                </option>
              </select>
              <label for="tipoDocumento">Tipo Documento</label>
            </div>
          </div>
          <div className="col-md-5">
            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                id="numeroDocumento"
                name="documentNumber"
                value={userDb ? userDb.documentNumber : ""}
                onChange={onHadleInputUser}
              />
              <label for="numeroDocumento">Numero Documento.</label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-floating mb-3">
              <input
                type="number"
                name="phone"
                className="form-control"
                id="telefono"
                value={userDb ? userDb.phone : ""}
                onChange={onHadleInputUser}
              />
              <label for="telefono">Telefono</label>
            </div>
          </div>

          <div className="col-12 text-center">
            <input
              type="submit"
              value="Actualizar"
              className=" btn btn-success "
            />
          </div>
        </div>
      </form>
    </>
  );
}
