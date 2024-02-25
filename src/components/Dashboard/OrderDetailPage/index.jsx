import { Avatar, Card, CardContent, Chip, Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getOrdersByIdServicio } from "../../../services/orders.services";
import ReactTimeAgo from "react-time-ago";
import { MostrarPesoCOP } from "../../../utils";

export default function OrderDetailPage() {
  const steps = [
    "Pendiente",
    "En Proceso",
    "En Camino",
    "Recibido / Entregado",
  ];
  const [activeStep, setActiveStep] = React.useState(2);
  const [DetailPedido, setDetailPedido] = useState(undefined);
  let { idOrder } = useParams();

  useEffect(() => {
    getDetailPedido(idOrder);
  }, [idOrder]);

  const getDetailPedido = async (id) => {
    try {
      console.log(id);
      const r = await getOrdersByIdServicio(id);
      const order = r.data.order;
      if (order.status === "PENDIENTE") setActiveStep(0);
      if (order.status === "EN PROCESO") setActiveStep(1);
      if (order.status === "EN CAMINO") setActiveStep(2);
      if (order.status === "RECIBIDA") setActiveStep(4);
      setDetailPedido(r.data.order);
    } catch (error) {
      console.log();
    }
  };

  return (
    <div className="container my-5" style={{ minHeight: "50vh" }}>
      <Card className="border border-light ">
        <CardContent>
          <div className="d-flex justify-content-between text-muted ">
            <p>Detalle De Pedido #{idOrder}</p>
            <p className="text-uppercase ">
              {DetailPedido && (
                <ReactTimeAgo
                  date={DetailPedido && DetailPedido?.purchase_date}
                />
              )}
            </p>
          </div>
          <Box
            sx={{ width: "100%" }}
            border={2}
            borderColor={"#e4e4e4"}
            borderRadius={2}
            padding={1}
          >
            <p className="text-center m-0 text-uppercase text-muted mb-2 ">
              Estado
              <Chip
                className="text-uppercase ms-2"
                label={DetailPedido?.status}
              />
            </p>
            <Stepper
              activeStep={activeStep}
              orientation={window.innerWidth > 600 ? "horizontal" : "vertical"}
            >
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};

                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Box>
          <Divider className="mt-3 fw-light text-uppercase text-muted">
            Productos
          </Divider>
          <div className="d-flex flex-column gap-2  ">
            {DetailPedido?.OrderDetails?.map((c) => (
              <Card>
                <div className="p-2" style={{ color: "#bb1515" }}>
                  <div className="d-flex gap-3 ">
                    <div>
                      <Avatar
                        style={{ width: "40px", height: "40px" }}
                        src={c?.Product?.image}
                      ></Avatar>
                    </div>
                    <div className="w-100 align-self-center ">
                      <div className="d-flex justify-content-between ">
                        <span className="col-5">{c?.Product?.name}</span>
                        <span>Talla : {c?.Size?.size}</span>
                        <span> {`${c?.units} x ${c?.unitPrice}`}</span>
                        <span> {`${MostrarPesoCOP(c?.totalPrice)} `}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="row g-5 " style={{ color: "#bb1515" }}>
            <div className="col-md-6">
              <Divider className="mt-3 text-uppercase text-muted ">
                Datos de Envio
              </Divider>
              <div className="d-flex justify-content-between ">
                <span>{DetailPedido?.DeliveryAddress?.name}</span>
                <span>{DetailPedido?.DeliveryAddress?.phone}</span>
              </div>
              <div className="d-flex justify-content-between ">
                <span>{DetailPedido?.DeliveryAddress?.department}</span>
                <span>{DetailPedido?.DeliveryAddress?.city}</span>
                <span>{DetailPedido?.DeliveryAddress?.address}</span>
              </div>
              <div className="d-flex justify-content-between ">
                <span>{DetailPedido?.DeliveryAddress?.neighborhood}</span>
                <span>{DetailPedido?.DeliveryAddress?.reference}</span>
              </div>
            </div>
            <div className="col-md-6">
              <Divider className="mt-3 text-uppercase text-muted ">
                Datos de Pago
              </Divider>
              <div className="d-flex justify-content-between ">
                <span>Estado</span>
                <Chip
                  className="text-uppercase "
                  label={DetailPedido?.Payments[0]?.status}
                />
              </div>
              <div className="d-flex justify-content-between ">
                <span>Total Pagado</span>
                <span>{MostrarPesoCOP(DetailPedido?.total_payment)}</span>
              </div>
              <div className="d-flex justify-content-between ">
                <span>Fecha</span>
                <span>
                  {DetailPedido?.Payments[0]?.updatedAt.substring(0, 10)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
