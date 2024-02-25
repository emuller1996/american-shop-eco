import React, { useEffect, useState } from "react";
import ListProductsOrder from "./ListProductsOrder";
import SelectPaymentMethodsComponent from "./SelectPaymentMethods";
import SelectShippingAddressComponent from "./SelectShippingAddress";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import { useHistory, useLocation } from "react-router-dom";
import { resetCart } from "../../features/Car/carSlice";
import { Alert } from "@mui/material";

export default function PurchaseConfirmationComponent() {
  const cart = useSelector((state) => state.cart);
  const [total, setTotal] = useState();
  const [cartState, setCartState] = useState();
  const [shippingAddress, setShippingAddress] = useState(undefined);
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const history = useHistory();
  const location = useLocation();

  const [ErrorDirecion, setErrorDirecion] = useState(undefined);

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    if (activeStep === 0) {
      if (!shippingAddress) {
        console.log("Valitacion", activeStep);
        setErrorDirecion("Debes Selecionar una Direccion de envio");
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

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
    const sumWithInitial = result.reduce((accumulator, currentValue) => {
      if (currentValue.is_discount) {
        return (
          accumulator +
          (currentValue.price -
            currentValue.price * (currentValue.discount_percentage / 100)) *
            currentValue.cant
        );
      } else {
        return accumulator + currentValue.price * currentValue.cant;
      }
    }, 0);
    setTotal(sumWithInitial);
  };

  const steps = [
    {
      label: "Informacion de Envio",
      description: (
        <>
          <SelectShippingAddressComponent
            setShippingAddress={setShippingAddress}
            shippingAddress={shippingAddress}
            setErrorDirecion={setErrorDirecion}
          />
          {ErrorDirecion && (
            <Alert className="my-3" severity="warning">{ErrorDirecion}</Alert>
          )}
        </>
      ),
    },
    {
      label: "Metodo de Pago",
      description: (
        <SelectPaymentMethodsComponent
          data={{
            products: cartState,
            DeliveryAddressId: shippingAddress?.id,
            user_email: user?.email,
            purchase_date: new Date().toISOString(),
            total_payment: total,
          }}
        />
      ),
    },
  ];
  return (
    <div className=" row justify-content-center align-items-center g-4">
      <div className="col-lg-4 order-0 order-md-1  align-self-start ">
        <ListProductsOrder products={cartState} />
      </div>

      <div className="col-lg-8 ">
        <div className="">
          <Box>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                    optional={
                      index === 2 ? (
                        <Typography variant="caption">Last step</Typography>
                      ) : null
                    }
                  >
                    <span className="fw-bold fs-4">{step.label}</span>
                  </StepLabel>
                  <StepContent>
                    <Typography>{step.description}</Typography>
                    <Box sx={{ mb: 2 }}>
                      <div>
                        {index === 0 && (
                          <>
                            <Button
                              variant="contained"
                              onClick={handleNext}
                              sx={{ mt: 1, mr: 1 }}
                            >
                              {index === steps.length - 1 ? "" : "Continuar"}
                              <i class="ms-2 fas fa-chevron-right"></i>
                            </Button>
                          </>
                        )}
                        <Button
                          disabled={index === 0}
                          onClick={handleBack}
                          variant="contained"
                          sx={{ mt: 1, mr: 1 }}
                        >
                          <i class="fas fa-chevron-left me-2"></i>
                          Atras
                        </Button>
                      </div>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Box>

          {/* <SelectShippingAddressComponent
            setShippingAddress={setShippingAddress}
            shippingAddress={shippingAddress}
          /> */}
          {/* {shippingAddress && (
            <SelectPaymentMethodsComponent
              data={{
                products: cartState,
                DeliveryAddressId: shippingAddress?.id,
                user_email: user.email,
                purchase_date: new Date().toISOString(),
                total_payment: total,
              }}
            />
          )} */}
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
          Es un placer Atenderte, Queremos informarle que el costo del envío
          para su pedido será manejado mediante el método de "Contra Entrega".
          Esto significa que el pago del
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
