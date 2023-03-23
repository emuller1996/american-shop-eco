import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ListOrderComponent from "./ListOrder";
import SpinnerComponent from '../../Spinner'
import { Button, Modal } from "react-bootstrap";

export default function MyOrderComponent() {

    const [orders, setOrders] = useState(undefined);
    const [ordersDetail, setOrdersDetail] = useState(undefined);

    const { user } = useAuth0();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    useEffect(() => {
        getOrderByEmail();
    }, [user])


    const getOrderByEmail = async () => {

        const result = await axios.get(`/order/${user.email}`);
        console.log(result.data)
        setOrders(result.data)

    }

    return (
        <>
            <h4>Mis Pedidos</h4>
            {orders ? (<ListOrderComponent setOrdersDetail={setOrdersDetail} handleShow={handleShow} orders={orders} />) : <SpinnerComponent />}


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> Order # {ordersDetail && ordersDetail.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="row justify-content-center align-items-center g-2">
                        <div class="col-4">Fecha : {ordersDetail && ordersDetail.purchase_date.substring(0, 10)}</div>
                        <div class="col-8">
                            <p className=" fs-2 fw-bold text-success text-end"> 
                                ${ordersDetail && ordersDetail.total_payment.toLocaleString()}
                            </p>
                        </div>
                        <div class="col-12">
                            <p className="mb-1 text-center fw-semibold">Productos del Pedido </p>
                            {
                                ordersDetail ? ordersDetail.Products.map(p => (
                                    <div class="card mb-2">

                                        <div class="card-body">
                                            <h4 class="card-title">{p.name}</h4>
                                            <p class="card-text"> {p.OrderDetail.units} x {p.OrderDetail.unitPrice.toLocaleString()}     <span className="text-end fw-bold fs-4 ms-4">$ { (p.OrderDetail.totalPrice).toLocaleString() }</span></p>
                                        </div>
                                    </div>
                                )) : <SpinnerComponent />
                            }
                        </div>
                        <div class="col-12">
                            <p className="mb-1 text-center fw-semibold">Dirrecion del Pedido </p>
                            <div class="card mb-2">

                                <div class="card-body">
                                    <h4 class="card-title" >{ordersDetail && ordersDetail.DeliveryAddress.name}</h4>
                                    <p class="card-text m-0">
                                        Direccion : {ordersDetail && `${ordersDetail.DeliveryAddress.address} -  ${ordersDetail.DeliveryAddress.reference} Br : ${ordersDetail.DeliveryAddress.neighborhood}`}
                                    </p>

                                    <p class="card-text  m-0">
                                        {ordersDetail && `${ordersDetail.DeliveryAddress.department} -  ${ordersDetail.DeliveryAddress.city} Tel : ${ordersDetail.DeliveryAddress.phone}`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    
                </Modal.Footer>
            </Modal>


        </>
    )
}