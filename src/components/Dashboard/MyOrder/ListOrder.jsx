import React from "react";


export default function ListOrderComponent({ orders,setOrdersDetail,handleShow }) {


    return (
        <div class="row justify-content-start align-items-center g-2">

            {
                orders &&  orders.length===0 && 
                ( 
                <div className="col">
                        <p>No tienes Ordens Registradas</p>
                </div> 
                )
            }

            {
                orders && orders.map(o => (
                    <div class="col-md-6">
                        <div class="card rounded-3 border-secondary shadow-sm">
                            <div class="card-body">
                                <div class="row justify-content-center align-items-center g-2">
                                    <div class="col-6">
                                        <p class="card-text">Dirrecion de Envio  <span class="fw-bold text-dark">{o.DeliveryAddress.name}</span></p>
                                    </div>
                                    <div class="col-6">
                                        <p class="card-text"> Fecha : {o.purchase_date.substring(0, 10)}</p>
                                    </div>
                                    <div class="col"><p class="card-text fs-4"> $ {o.total_payment.toLocaleString()}</p></div>
                                    <div class="col">
                                    <button type="button" onClick={() => {setOrdersDetail(o);handleShow()}} class="btn btn-secondary btn-sm rounded-3">
                                    <i class="far fa-eye me-2"></i>
                                    Detalles
                                    </button>
                                    </div>

                                </div>



                            </div>
                        </div>
                    </div>
                ))
            }


        </div>
    )
}