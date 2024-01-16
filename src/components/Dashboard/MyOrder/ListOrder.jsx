import React from "react";

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
            <div className="card rounded-3  card-carrito-producto shadow-sm">
              <div className="card-body">
                <div className="row justify-content-center align-items-center g-2">
                  <div className="col-6">
                    <p className="card-text">
                      Dirrecion de Envio{" "}
                      <span className="fw-bold text-dark">
                        {o.DeliveryAddress.name}
                      </span>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="card-text">
                      {" "}
                      Fecha : {o.purchase_date.substring(0, 10)}
                    </p>
                  </div>
                  <div className="col">
                    <p className="card-text fs-4">
                      {" "}
                      $ {o.total_payment.toLocaleString()}
                    </p>
                  </div>
                  <div className="col">
                    <button
                      type="button"
                      onClick={async () => {
                        await setOrdersDetail(o);
                        handleShow();
                      }}
                      className="btn btn-secondary btn-sm rounded-3"
                    >
                      <i className="far fa-eye me-2"></i>
                      Detalles
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
