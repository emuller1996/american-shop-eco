import axios from "axios";
import React, { useEffect, useState } from "react";
import InputSelect from "../../components/Atomos/InputSelect";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { Payment } from "@mercadopago/sdk-react";
import SpinnerComponent from "../../components/Spinner";
import { useDispatch } from "react-redux";
import { resetCart } from "../../features/Car/carSlice";
import { useHistory } from "react-router-dom";
initMercadoPago(process.env.REACT_APP_MERCA_PUBLIC_KEY);
const options = [
  { value: "Natural", label: "Natural" },
  { value: "Juridica", label: "Juridica" },
];

export default function SelectPaymentMethodsComponent({ data }) {
  const [AllInsFinance, setAllInsFinance] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  let history = useHistory();

  const [referenceId, setreferenceId] = useState(null);

  useEffect(() => {
    getInstuticionFinancieras();
  }, []);

  const getInstuticionFinancieras = async () => {
    try {
      const r = await axios.get(
        `https://api.mercadolibre.com/v1/payment_methods/search?public_key=${process.env.REACT_APP_MERCA_PUBLIC_KEY}&id=pse`
      );
      const al = r.data.results[0].financial_institutions;

      setAllInsFinance(
        al.map((c) => {
          return { label: c.description, value: c.id };
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const initialization = {
    amount: parseInt(data.total_payment),
    preferenceId: referenceId,
  };
  const customization = {
    paymentMethods: {
      bankTransfer: "all",
      /* creditCard: "all",
      debitCard: "all",
      mercadoPago: "all", */
    },
    visual: {
      hideFormTitle: true,
      style: {
        theme: "default",
      },
    },
  };
  const onSubmit = async ({ selectedPaymentMethod, formData }) => {
    // callback llamado al hacer clic en el botón enviar datos
    return new Promise((resolve, reject) => {
      const datas = formData;

      datas.products = data.products;
      datas.DeliveryAddressId = data.DeliveryAddressId;
      datas.purchase_date = data.purchase_date;
      datas.user_email = data.user_email;
      axios
        .post("/Order", datas, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
        .then((response) => {
          // recibir el resultado del pago
          console.log(response);
          console.log(response.data.payment_data.status === "approved");
          dispatch(resetCart());
          if (response.data.payment_data.external_resource_url) {
            window.location.replace(
              response.data.payment_data.external_resource_url
            );
          }
          if (response.data.payment_data.status === "approved") {
            history.push(`/compra-exitosa/${response.data.order.id}`);
          }
          if (response.data.payment_data.status === "rejected") {
            history.push(`/pago-rechazado/${response.data.order.id}`);
          }
          resolve();
        })
        .catch((error) => {
          // manejar la respuesta de error al intentar crear el pago
          console.log(error);
          reject();
        });
    });
  };
  const onError = async (error) => {
    // callback llamado para todos los casos de error de Brick
    console.log(error);
  };
  const onReady = async () => {
    /*
      Callback llamado cuando el Brick está listo.
      Aquí puede ocultar cargamentos de su sitio, por ejemplo.
    */
    console.log("ready");
    setIsLoading(false);
  };

  console.log(initialization);
  return (
    <div className="card border-0">
      <div className="">
        <Payment
          initialization={initialization}
          customization={customization}
          onSubmit={onSubmit}
          onReady={onReady}
          onError={onError}
        />
      </div>
    </div>
  );
}
