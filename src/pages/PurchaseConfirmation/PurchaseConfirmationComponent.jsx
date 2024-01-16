import React, { useEffect, useState } from "react";
import ListProductsOrder from "./ListProductsOrder";
import SelectPaymentMethodsComponent from "./SelectPaymentMethods";
import SelectShippingAddressComponent from "./SelectShippingAddress";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import { useHistory, useLocation } from "react-router-dom";
import { resetCart } from "../../features/Car/carSlice";

export default function PurchaseConfirmationComponent() {
  const cart = useSelector((state) => state.cart);
  const [total, setTotal] = useState();
  const [cartState, setCartState] = useState();
  const [shippingAddress, setShippingAddress] = useState(undefined);
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    getProducts();
  }, [cart]);

  const getProducts = async () => {
    var s = await cart.map(async (c) => {
      const resutl = await axios.get(`/products/${c.id}`);
      return Object.assign(resutl.data, c);
    });
    const result = await Promise.all(s);
    console.log(result);
    setCartState(result);
    const sumWithInitial = result.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.price * currentValue.cant,
      0
    );
    setTotal(sumWithInitial);
  };

  return (
    <div className="row justify-content-center align-items-center g-4">
      <div className="col-lg-4 order-0 order-md-1 ">
        <ListProductsOrder products={cartState} />
      </div>

      <div className="col-lg-8 ">
        <div className="container">
          <SelectShippingAddressComponent
            setShippingAddress={setShippingAddress}
            shippingAddress={shippingAddress}
          />
          {shippingAddress && (
            <SelectPaymentMethodsComponent
              data={{
                products: cartState,
                DeliveryAddressId: shippingAddress?.id,
                user_email: user.email,
                purchase_date: new Date().toISOString(),
                total_payment: total,
              }}
            />
          )}
          {/* <button
            type="button"
            onClick={onSaveOrder}
            class="btn btn-success w-100 py-4 fs-4 fw-bold"
          >
            COMPRAR
          </button> */}
        </div>
      </div>

      <div className="col-md-9 order-2">
        <h4 className="text-danger fs-1 ">Nota!</h4>
        <p>
          Es un placer Atenderte, Queremos informarle que el costo del envío para su
          pedido será manejado mediante el método de "Contra Entrega". Esto
          significa que el pago del
          <span className="text-uppercase  fw-bold  text-success ">
            {" valor del ENVIO "}
          </span>
          se realizará en el momento de la entrega de sus productos.
        </p>
        <p>
          Este método le debe pagar el envío directamente al mensajero al
          recibir solo del
          <span className="text-uppercase  fw-bold  text-success ">
            {" valor del ENVIO "}
          </span>
          su pedido. Agradecemos su confianza en nuestros servicios y estamos
          aquí para cualquier pregunta adicional que pueda tener.
        </p>
      </div>
    </div>
  );
}
