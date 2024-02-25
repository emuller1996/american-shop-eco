import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import SpinnerComponent from "../../components/Spinner";
import { getDeliveryAddressByIdUser } from "../../services/delivery.services";
import { Modal, Offcanvas } from "react-bootstrap";
import FormDeliverAddressComponent from "../../components/Dashboard/MyProfile/FormDeliveryAddress";
import { Button, Card, TextField } from "@mui/material";

export default function SelectShippingAddressComponent({
  setShippingAddress,
  shippingAddress,
  setErrorDirecion,
}) {
  const [deliveryAddress, setDeliverAddress] = useState(undefined);
  const [showDe, setshowDe] = useState(false);
  const { user, getAccessTokenSilently } = useAuth0();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getDeliverAddress();
  }, [user]);

  const getDeliverAddress = async () => {
    setDeliverAddress(undefined);
    try {
      const token = await getAccessTokenSilently();
      const result = await getDeliveryAddressByIdUser(user.email, token);
      console.log(result.data[0].DeliveryAddresses);
      setDeliverAddress(result.data[0].DeliveryAddresses);
    } catch (error) {}
  };

  return (
    <div class="card text-center border-0">
      <div class="card-body p-0">
        <div
          className="p-1 "
          style={{
            maxHeight: "500px",
            overflowX: "hidden",
            overflowY: "scroll",
          }}
        >
          {deliveryAddress && (
            <button
              className=" button-6 rounded-2   w-100 mb-3 "
              onClick={() => {
                /* setshowDe(true); */
                handleShow();
              }}
            >
              <div class="d-flex gap-3" style={{ color: "#707070" }}>
                <i class="fas fa-plus-circle me-3 fa-2x"></i>
                <span class="align-self-center ">Registra Dirreccion</span>
              </div>
            </button>
          )}

          {deliveryAddress && deliveryAddress.length === 0 && (
            <p className="fw-bold"> No tiene Registradas Direciones</p>
          )}
          {deliveryAddress ? (
            deliveryAddress.map((d) => (
              <div
                class={
                  shippingAddress?.id === d.id
                    ? "card-new-envio-selected w-100 mb-3"
                    : " card-new-envio  w-100 mb-3"
                }
              >
                <div
                  onClick={() => {
                    setShippingAddress(d);
                    setErrorDirecion(undefined);
                  }}
                  class="px-md-4 py-2"
                >
                  <div className="d-flex gap-4  ">
                    <div className="align-self-center ">
                      <i class="fas fa-map-marker-alt fa-2x"></i>
                    </div>
                    <div className="w-100">
                      <div className="d-flex  justify-content-between flex-wrap  ">
                        <span className="fw-bold fs-5">{`${d.name}`}</span>
                        <span>{`${d.phone}`}</span>
                      </div>
                      <div className="d-flex justify-content-between flex-wrap ">
                        <span className="">{`${d.city}`}</span>
                        <span className="">{`${d.department}`} </span>
                      </div>
                      <div className="d-flex justify-content-between flex-wrap ">
                        <span>{`${d.address}`}</span>
                        <span>{`${d.neighborhood}`}</span>
                      </div>
                      <div className="d-flex justify-content-center gap-2  ">
                        <Button
                          startIcon={<i className="far fa-edit"></i>}
                          variant="contained"
                          size="small"
                          color="info"
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log(e);
                          }}
                        >
                          Editar
                        </Button>
                        <Button
                          startIcon={<i className="fas fa-trash-alt"></i>}
                          variant="contained"
                          size="small"
                          color="warning"
                        >
                          Borrar
                        </Button>
                      </div>
                    </div>
                  </div>
                  {/* <div className=" align-self-center">
                    <i class="fas fa-map-marker-alt fa-2x"></i>
                  </div>
                  <div class="">
                    <div className=" d-flex flex-column">
                      <span>{`${d.name} - ${d.phone}`}</span>
                      <span className="">{`${d.city}, ${d.department}`}</span>
                      <span className="">{`${d.neighborhood}, ${d.reference}`}</span>
                    </div>
                  </div> */}
                </div>
              </div>
            ))
          ) : (
            <SpinnerComponent />
          )}
        </div>
      </div>
      <Modal
        backdrop="static"
        keyboard={false}
        centered
        show={showDe}
        onHide={() => setshowDe(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Registrando Dirrecion de Envio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormDeliverAddressComponent
            getDeliverAddress={getDeliverAddress}
            handleClose={() => setshowDe(false)}
          />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={() => setshowDe(false)}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Registrando Informacion de Envio</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <FormDeliverAddressComponent
            getDeliverAddress={getDeliverAddress}
            handleClose={() => setShow(false)}
          />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
