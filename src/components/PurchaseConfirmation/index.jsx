import React,  { useEffect, useState } from "react";
import ListProductsOrder from "./ListProductsOrder";
import SelectPaymentMethodsComponent from "./SelectPaymentMethods";
import SelectShippingAddressComponent from "./SelectShippingAddress";
import { useSelector } from "react-redux";

import axios from "axios";
export default function PurchaseConfirmationComponent() {


    const cart = useSelector((state) => state.cart);
    const [total, setTotal] = useState();
    const [cartState, setCartState] = useState();
    useEffect(() => {
        getProducts();
    
    
      }, [cart]);

      const getProducts = async () => {
        var s = await cart.map(async (c) => {
          const resutl = await axios.get(`/products/${c.id}`);
          return Object.assign(resutl.data, c)
        });
        const result = await Promise.all(s);
        console.log(result);
        setCartState(result);
        const sumWithInitial = result.reduce(
          (accumulator, currentValue) => accumulator + currentValue.price,
          0
        );
        setTotal(sumWithInitial)
    
      };
  return (
    <div className="row g-2">
      <div className="col-md-6 ">
            <ListProductsOrder products={cartState} />
      </div>

      <div className="col-md-6 ">
        <SelectShippingAddressComponent />
      </div>

      <div className="col-md-6">
        <SelectPaymentMethodsComponent />
      </div>
    </div>
  );
}
