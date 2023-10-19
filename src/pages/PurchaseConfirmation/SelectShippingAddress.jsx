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
        <h4 class="card-title">Informacion de Envio</h4>
        <hr className="border-danger" />
        <p class="card-text">
          {deliveryAddress && (
            <div className="card-new-envio border-secondary w-100 mb-3">
              Registra Dirreccion
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
                <div class="">
                  <div
                    class=" ms-2"
                    onClick={() => {
                      setShippingAddress(d);
                    }}
                  >
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
    </div>
  );
}
