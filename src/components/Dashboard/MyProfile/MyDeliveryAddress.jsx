import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormDeliverAddressComponent from "./FormDeliveryAddress";
import Spinner from "react-bootstrap/Spinner";
import { toast } from "react-toastify";
import SpinnerComponent from "../../Spinner";
import {
  getDeliveryAddressByIdUser,
  postCreateDeliveryAddressByIdUser,
  putEditDeliveryAddressByIdUser,
} from "../../../services/delivery.services";

export default function MyDeliveryAddressComponent() {
  const [deliveryAddress, setDeliverAddress] = useState(undefined);
  const { user, getAccessTokenSilently } = useAuth0();
  const [deliveryAddressInsert, setDeliverAddressInsert] = useState(undefined);
  const [show, setShow] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [addressUpdated, setAddressUpdated] = useState(undefined);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getDeliverAddress();
  }, []);

  const getDeliverAddress = async () => {
    setDeliverAddress(undefined);
    try {
      const token = await getAccessTokenSilently();
      const result = await getDeliveryAddressByIdUser(user.email, token);
      console.log(result.data[0].DeliveryAddresses);
      setDeliverAddress(result.data[0].DeliveryAddresses);
    } catch (error) {}
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    var data = Object.assign(
      { data: deliveryAddressInsert },
      { email: user.email }
    );

    try {
      const token = await getAccessTokenSilently();
      const result = await postCreateDeliveryAddressByIdUser(data, token);
      toast.success(result.data.response);
      getDeliverAddress();
    } catch (error) {
      toast.error("ERRO : AL INGRESAR LA DIRECION");
    }
  };

  const onHandleSubmitEdit = async (e) => {
    e.preventDefault();
    var data = Object.assign({ data: addressUpdated }, { email: user.email });
    console.log(data);

    try {
      const token = await getAccessTokenSilently();
      const result = await putEditDeliveryAddressByIdUser(data, token);
      toast.success(result.data.response);
      getDeliverAddress();
      setShowModalEdit(false);
    } catch (error) {
      toast.error("ERRO : AL INGRESAR LA DIRECION");
    }
  };

  const onHandleInput = (e) => {
    setDeliverAddressInsert({
      ...deliveryAddressInsert,
      [e.target.name]: e.target.value,
    });
  };

  const onHandleInputEdit = (e) => {
    setAddressUpdated({
      ...addressUpdated,
      [e.target.name]: e.target.value,
    });
  };

  const onSetAddress = (e) => {
    setShowModalEdit(true);
    setAddressUpdated(e);
  };

  return (
    <div className="mt-3">
      <div className="card">
        <div className="card-body">
          <p className="fw-semibold fs-5">Mis Direciones de Envio</p>
          <Button variant="danger" className="mb-3" onClick={handleShow}>
            Agregar Nueva Direccion.
          </Button>
          <div className="row">
            {deliveryAddress && deliveryAddress.length === 0 && (
              <p> No Tiene Direcciones Guardas </p>
            )}
            {deliveryAddress ? (
              deliveryAddress.map((c) => (
                <div className="col-12 mb-3">
                  <div className="card p-2">
                    <div className="row">
                      <div className="col-6">
                        <p className="p-0 m-0 fw-semibold"> {c.name} </p>
                      </div>
                      <div className="col-6">
                        <button
                          onClick={() => onSetAddress(c)}
                          type="button"
                          className="btn btn-sm btn-primary"
                        >
                          Editar
                        </button>
                      </div>
                      <div className="col-12">
                        Direccion : {c.address} {c.reference}
                      </div>
                      <div className="col">
                        {" "}
                        {c.departament} {c.city}
                      </div>
                      <div className="col">Telefono : {c.phone}</div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <SpinnerComponent />
            )}
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nueva Direccion</Modal.Title>
        </Modal.Header>

        <FormDeliverAddressComponent
          handleClose={handleClose}
          onHandleSubmit={onHandleSubmit}
          onHandleInput={onHandleInput}
          deliveryAddress={deliveryAddressInsert}
        />
      </Modal>

      <Modal show={showModalEdit} onHide={() => setShowModalEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Direccion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormDeliverAddressComponent
            handleClose={handleClose}
            deliveryAddress={addressUpdated}
            onHandleInput={onHandleInputEdit}
            onHandleSubmit={onHandleSubmitEdit}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" type="submit" onClick={handleClose}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
