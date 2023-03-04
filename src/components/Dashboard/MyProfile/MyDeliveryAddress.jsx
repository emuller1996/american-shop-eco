import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormDeliverAddressComponent from "./FormDeliveryAddress";
import Spinner from "react-bootstrap/Spinner";
import { toast } from "react-toastify";

export default function MyDeliveryAddressComponent() {
  const [deliveryAddress, setDeliverAddress] = useState(undefined);
  const { user } = useAuth0();
  const [deliveryAddressInsert, setDeliverAddressInsert] = useState(undefined);

  useEffect(() => {
    getDeliverAddress();
  }, []);

  const getDeliverAddress = async () => {
    setDeliverAddress(undefined);
    try {
      const result = await axios.get(`/deliveryAddress/${user.email}`);
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
      const result = await axios.post('/deliveryAddress/',data);
      toast.success(result.data.response);
      getDeliverAddress();
    } catch (error) {
      toast.error('ERRO : AL INGRESAR LA DIRECION');
      
    }
    

  };

  const onHandleInput = (e) => {
    setDeliverAddressInsert({
      ...deliveryAddressInsert,
      [e.target.name]: e.target.value,
    });
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
                        <button type="button" class="btn btn-sm btn-primary">Editar</button>
                      </div>
                      <div className="col-12">Direccion : {c.address} {c.reference}</div>
                      <div className="col"> {c.departament} {c.city}</div>
                      <div className="col">Telefono : {c.phone}</div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center p-4">
                <Spinner animation="border" variant="danger" role="danger">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
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
        />
      </Modal>
    </div>
  );
}
