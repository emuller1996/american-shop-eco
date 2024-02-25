import { Button, Card, CardContent, Chip } from "@mui/material";
import React from "react";
import ReactTimeAgo from "react-time-ago";
import "./ListOrder.css";
import { MostrarPesoCOP } from "../../../utils";
import { Link } from "react-router-dom";

export default function ListOrderComponent({
  orders,
  setOrdersDetail,
  handleShow,
}) {
  return (
    <div className="row justify-content-start align-items-center g-2 pb-2">
      {orders && orders.length === 0 && (
        <div className="col">
          <p>No tienes Ordens Registradas</p>
        </div>
      )}

      {orders &&
        orders.map((o) => (
          <div className="col-md-6">
            <Card className="PedidoItemCard border ">
              <CardContent className="card-body">
                <div className="d-flex justify-content-between ">
                  <p className="card-text">
                    Pedido #<span className="fw-bold text-dark">{o.id}</span>
                  </p>
                  <Chip
                    label={o.status}
                    color="default"
                    size="medium"
                    variant="outlined"
                    className="rounded-1  shadow-sm "
                  />
                  <p className="card-text">
                    <ReactTimeAgo date={o.purchase_date} locale="en-CO" />
                  </p>
                </div>
                <div className="d-flex justify-content-between ">
                  <Link to={`/d/mis-pedidos/${o?.id}/`}>

                  <Button
                    variant="outlined"
                    type="button"
                    color="inherit"
                   /*  onClick={async () => {
                      await setOrdersDetail(o);
                      handleShow();
                    }} */
                    className=" "
                  >
                    <i className="far fa-eye me-2"></i>
                    Ver Detalle
                  </Button>
                  </Link>
                  <p className="card-text fs-4">
                    {MostrarPesoCOP(o.total_payment)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
    </div>
  );
}
