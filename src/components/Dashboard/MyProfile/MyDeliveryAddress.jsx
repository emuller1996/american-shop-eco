import React from "react";

export default function MyDeliveryAddressComponent() {
  return (
    <div className="mt-3">
      <div className="card">
        <div className="card-body">
          <p className="fw-semibold fs-5">Mis Direciones de Envio</p>

          <div className="row">
            <div className="col-12">
              <div className="card p-2">
                <p className="p-0 m-0 fw-semibold">Mi Casa </p>
                <div className="row">
                    <div className="col">
                        Direccion : Cra 13 ° N #3 a 13
                    </div>
                    <div className="col">
                        Apt : 201
                    </div>
                    <div className="col">
                        Barrio : Bellavista
                    </div>
                    <div className="col">
                        Cudiad : Buevantetura
                    </div>
                    <div className="col">
                        Telefono : 3184612011
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
