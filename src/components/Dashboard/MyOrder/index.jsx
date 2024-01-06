import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ListOrderComponent from "./ListOrder";
import SpinnerComponent from "../../Spinner";
import { Button, Modal } from "react-bootstrap";
import MessageComponent from "./Message";
import { getOrdersByUserServicio } from "../../../services/orders.services";

export default function MyOrderComponent() {
  const [orders, setOrders] = useState(undefined);
  const [ordersDetail, setOrdersDetail] = useState(undefined);

  const { user, getAccessTokenSilently } = useAuth0();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getOrderByEmail();
  }, [user]);

  const getOrderByEmail = async () => {
    const token = await getAccessTokenSilently();
    const result = await getOrdersByUserServicio(user.email, token);
    console.log(result.data);
    setOrders(result.data);
  };
  const setOrdersDetailOn = async (o) => {
    try {
      const r = await axios.get(`/order/comfirmation/${o.id}`);
      console.log(r.data);
      setOrdersDetail(r.data.order);
    } catch (error) {}
  };

  return (
    <div className="container " style={{ minHeight: "65vh" }}>
      <h4 className="mt-4">Mis Pedidos</h4>

      {orders ? (
        <ListOrderComponent
          setOrdersDetail={setOrdersDetailOn}
          handleShow={handleShow}
          orders={orders}
        />
      ) : (
        <SpinnerComponent />
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Order # {ordersDetail && ordersDetail.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row justify-content-center align-items-center g-2">
            <div className="col-4">
              Fecha :{" "}
              {ordersDetail && ordersDetail.purchase_date.substring(0, 10)}
            </div>
            <div className="col-8">
              <p className=" fs-2 fw-bold text-success text-end">
                ${ordersDetail && ordersDetail.total_payment.toLocaleString()}
              </p>
            </div>
            <div className="col-12 text-center">
              Estado:{" "}
              <span className="badge bg-primary">
                {ordersDetail && ordersDetail.status}
              </span>
            </div>
            <div className="col-12">
              <p className="mb-1 text-center fw-semibold">
                Productos del Pedido{" "}
              </p>
              {ordersDetail ? (
                ordersDetail.OrderDetails.map((p) => (
                  <div className="card mb-2">
                    <div className="card-body">
                      <h4 className="card-title">{p?.name}</h4>
                      <p className="card-text">
                        {" "}
                        {p?.units} x {p?.unitPrice.toLocaleString()}{" "}
                        <span className="text-end fw-bold fs-4 ms-4">
                          $ {p?.totalPrice.toLocaleString()}
                        </span>
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <SpinnerComponent />
              )}
            </div>
            <div className="col-12">
              <p className="mb-1 text-center fw-semibold">
                Dirrecion del Pedido{" "}
              </p>
              <div className="card mb-2">
                <div className="card-body">
                  <h4 className="card-title">
                    {ordersDetail && ordersDetail.DeliveryAddress.name}
                  </h4>
                  <p className="card-text m-0">
                    Direccion :{" "}
                    {ordersDetail &&
                      `${ordersDetail.DeliveryAddress.address} -  ${ordersDetail.DeliveryAddress.reference} Br : ${ordersDetail.DeliveryAddress.neighborhood}`}
                  </p>

                  <p className="card-text  m-0">
                    {ordersDetail &&
                      `${ordersDetail.DeliveryAddress.department} -  ${ordersDetail.DeliveryAddress.city} Tel : ${ordersDetail.DeliveryAddress.phone}`}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12">
              <p className="mb-1 text-center fw-semibold">Datos de Pago</p>
              <div className="card mb-2">
                <div className="card-body">
                  <h6 className="card-title m-0">
                    Estado : {ordersDetail && ordersDetail?.Payments[0].status}
                  </h6>
                  <p className="m-0">
                    Monto Total :
                    {ordersDetail && ordersDetail?.Payments[0].net_amount}
                  </p>
                  <p className="m-0">
                    Metodo de Pago{" : "}
                    {ordersDetail && ordersDetail?.Payments[0].payment_method}
                  </p>
                  <p className="m-0">
                    Estado Detalle{" : "}
                    {ordersDetail && ordersDetail?.Payments[0].status_detail}
                  </p>
                  {ordersDetail &&
                    ordersDetail?.Payments[0].external_resource_url && (
                      <a
                        target="_blank"
                        without
                        rel="noreferrer"
                        href={
                          ordersDetail &&
                          ordersDetail?.Payments[0].external_resource_url
                        }
                      >
                        Link Pagar
                      </a>
                    )}
                </div>
              </div>
            </div>
            {ordersDetail && <MessageComponent id={ordersDetail.id} />}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
