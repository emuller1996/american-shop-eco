import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FormDeliverAddressComponent from "./FormDeliveryAddress";
import Spinner from 'react-bootstrap/Spinner';


export default function MyDeliveryAddressComponent() {

  const [deliveryAddress, setDeliverAddress] = useState(undefined);
  const { user } = useAuth0();
  useEffect(() => {

    getDeliverAddress();

  }, [])

  const getDeliverAddress = async () => {


    try {
      const result = await axios.get(`/deliveryAddress/${user.email}`)
      console.log(result.data[0].DeliveryAddresses)
      setDeliverAddress(result.data[0].DeliveryAddresses)

    } catch (error) {


    }

  }


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

            {deliveryAddress && deliveryAddress.length === 0 && (<p> No Tiene Direcciones Guardas </p>)}
            {deliveryAddress ? deliveryAddress.map(c => (
              <div className="col-12 mb-3">
                <div className="card p-2">
                  <p className="p-0 m-0 fw-semibold">Mi Casa </p>
                  <div className="row">
                    <div className="col">
                      Direccion : {c.address}
                    </div>

                    <div className="col">
                      Barrio : {c.neighborhood}
                    </div>
                    <div className="col">
                      Cudiad : {c.city}
                    </div>
                    <div className="col">
                      Telefono : {c.phone}
                    </div>
                  </div>
                </div>
              </div>
            )) : (<div className="col-12 text-center p-4">
              <Spinner animation="border" variant="danger" role="danger">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>)}


          </div>
        </div>
      </div>



      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nueva Direccion</Modal.Title>
        </Modal.Header>

        <FormDeliverAddressComponent handleClose={handleClose} />
      </Modal>
    </div>
  );
}
