import React, { useState, useEffect } from "react";
import MyDeliveryAddressComponent from "../../components/Dashboard/MyProfile/MyDeliveryAddress";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import SpinnerComponent from "../../components/Spinner";
import { getDeliveryAddressByIdUser } from "../../services/delivery.services";

export default function SelectShippingAddressComponent({
  setShippingAddress,
  shippingAddress,
}) {
  const [deliveryAddress, setDeliverAddress] = useState(undefined);
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
        <h4 class="card-title">Selecionar de Dirrecion de Envio</h4>
        <p class="card-text">
          {deliveryAddress && deliveryAddress.length === 0 && (
            <p> No tiene Registradas Direciones</p>
          )}

          {deliveryAddress ? (
            deliveryAddress.map((d) => (
              <div
                class={
                  shippingAddress.id === d.id
                    ? "card border-dark bg-light  border-3 w-100 mb-3"
                    : "card border-secondary w-100 mb-3"
                }
              >
                <div class="card-body m-0 p-0">
                  <div class="form-check ms-2">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="direccionEnvio"
                      id={d.name}
                      onClick={() => {
                        setShippingAddress(d);
                      }}
                    />
                    <label class="form-check-label w-100" for={d.name}>
                      <div className=" d-flex flex-column">
                        <span>{`${d.name} - ${d.phone}`}</span>
                        <span className="text-muted">{`${d.city}, ${d.department}`}</span>
                        <span className="text-muted">{`${d.neighborhood}, ${d.reference}`}</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <SpinnerComponent />
          )}
          {deliveryAddress && <div className="card border-secondary w-100 mb-3"> Registra Dirreccion</div>}
        </p>
      </div>
    </div>
  );
}
