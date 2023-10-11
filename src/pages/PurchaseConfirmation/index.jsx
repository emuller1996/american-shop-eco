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
  const [shippingAddress, setShippingAddress] = useState({});
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
      (accumulator, currentValue) => accumulator + currentValue.price,
      0
    );
    setTotal(sumWithInitial);
  };

  const onSaveOrder = async () => {
    console.log(
      Object.assign({
        products: cartState,
        DeliveryAddressId: shippingAddress.id,
        user_email: user.email,
        purchase_date: new Date().toISOString(),
        total_payment: total,
      })
    );

    try {
      const result = await axios.post(
        "/Order",
        Object.assign({
          products: cartState,
          DeliveryAddressId: shippingAddress.id,
          user_email: user.email,
          purchase_date: new Date().toISOString(),
          total_payment: total,
        })
      );
      console.log(result.data);
      toast.success(result.data.message);
      dispatch(resetCart());
      history.push(`OrderPlaced/${result.data.order.id}`);
    } catch (error) {}
  };

  return (
    <div className="row justify-content-center align-items-center g-4">
      <div className="col-md-6 ">
        <ListProductsOrder products={cartState} />
      </div>

      <div className="col-md-6 ">
        <SelectShippingAddressComponent
          setShippingAddress={setShippingAddress}
          shippingAddress={shippingAddress}
        />
      </div>

      <div className="col-md-6">
        <SelectPaymentMethodsComponent />
      </div>

      <div className="col-md-6">
        <button
          type="button"
          onClick={onSaveOrder}
          class="btn btn-success w-100 py-4 fs-4 fw-bold"
        >
          COMPRAR
        </button>
      </div>
    </div>
  );
}