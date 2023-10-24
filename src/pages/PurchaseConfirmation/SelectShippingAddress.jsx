import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import SpinnerComponent from "../../components/Spinner";
import { getDeliveryAddressByIdUser } from "../../services/delivery.services";
import { Button, Modal } from "react-bootstrap";
import FormDeliverAddressComponent from "../../components/Dashboard/MyProfile/FormDeliveryAddress";

export default function SelectShippingAddressComponent({
  setShippingAddress,
  shippingAddress,
}) {
  const [deliveryAddress, setDeliverAddress] = useState(undefined);
  const [showDe, setshowDe] = useState(false);
  const { user, getAccessTokenSilently } = useAuth0();

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
      <div class="card-body ">
        <h4 class="card-title">Informacion de Envio</h4>
        <hr className="border-danger" />
        <p class="card-text">
          {deliveryAddress && (
            <div className="card-new-envio border-secondary w-100 mb-3 ">
              <div
                onClick={() => {
                  setshowDe(true);
                }}
                class="row justify-content-evenly"
              >
                <div className="col-2  align-self-center">
                  <i class="fas fa-plus-circle me-3 fa-2x"></i>
                </div>
                <div class="col-10 align-self-center ">Registra Dirreccion</div>
              </div>
            </div>
          )}

          {deliveryAddress && deliveryAddress.length === 0 && (
            <p> No tiene Registradas Direciones</p>
          )}
          {deliveryAddress ? (
            deliveryAddress.map((d) => (
              <div
                class={
                  shippingAddress.id === d.id
                    ? "card-new-envio-selected  border-secondary w-100 mb-3"
                    : " card-new-envio  w-100 mb-3"
                }
              >
                <div
                  onClick={() => {
                    setShippingAddress(d);
                  }}
                  class="row justify-content-evenly"
                >
                  <div className="col-2  align-self-center">
                    <i class="fas fa-map-marker-alt fa-3x"></i>
                  </div>
                  <div class="col-10 ">
                    <div className=" d-flex flex-column">
                      <span>{`${d.name} - ${d.phone}`}</span>
                      <span className="">{`${d.city}, ${d.department}`}</span>
                      <span className="">{`${d.neighborhood}, ${d.reference}`}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <SpinnerComponent />
          )}
        </p>
      </div>
      <Modal backdrop="static"
        keyboard={false} centered show={showDe} onHide={() => setshowDe(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Registrando Dirrecion de Envio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormDeliverAddressComponent
            /* handleClose={handleClose}
            onHandleSubmit={onHandleSubmit}
            onHandleInput={onHandleInput}
            deliveryAddress={deliveryAddressInsert} */
          />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={() => setshowDe(false)}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
}
