import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getPaymnetByIdMercadoPagoServicio } from "../../services/paymnets.services";
import { MostrarPesoCOP } from "../../utils";

export default function PagoPage() {
  const { id } = useParams();
  const [paymentData, setpaymentData] = useState(undefined);

  useEffect(() => {
    getPaymentData(id);
  }, [id]);

  const getPaymentData = async (id) => {
    try {
      const r = await getPaymnetByIdMercadoPagoServicio(id);
      console.log(r.data);
      setpaymentData(r.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container my-5" style={{ minHeight: "60vh" }}>
      <div className="row justify-content-center py-4">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header ">
              <h4>Detalles del Pago</h4>
            </div>
            <div className="card-body">
              <div className="d-flex flex-column gap-2  ">
                <div className="d-flex  justify-content-around ">
                  <strong>Fecha del Pago:</strong>
                  <span>
                    {paymentData &&
                      paymentData.payment?.Order?.purchase_date.substring(
                        0,
                        10
                      )}
                  </span>
                </div>
                <div className="d-flex  justify-content-around ">
                  <strong>Cantidad Pagada:</strong>{" "}
                  <span>
                    {paymentData &&
                      MostrarPesoCOP(paymentData.payment?.Order?.total_payment)}
                  </span>
                </div>
                <div className="d-flex  justify-content-around ">
                  <strong>ID Orden:</strong>
                  <span>{paymentData && paymentData.payment?.Order?.id}</span>
                </div>
                <div className="d-flex  justify-content-around ">
                  <strong>ID Pago:</strong>
                  <span>
                    {paymentData && paymentData.payment?.id_pago_merca}
                  </span>
                </div>
                <div className="d-flex  justify-content-around ">
                  <strong>Estado:</strong>

                  {paymentData &&
                    paymentData.paymentMercado?.status === "approved" && (
                      <div className="alert alert-success" role="alert">
                        <strong>APROBADO</strong>
                      </div>
                    )}
                  {paymentData &&
                    paymentData.paymentMercado?.status === "pending" && (
                      <div className="alert alert-warning" role="alert">
                        <strong>PENDIENTE</strong>
                      </div>
                    )}
                  {paymentData &&
                    paymentData.paymentMercado?.status === "rejected" && (
                      <div className="alert alert-danger" role="alert">
                        <strong>CANCELADO</strong>
                      </div>
                    )}
                </div>
              </div>

              <p>¡Gracias por elegir nuestros servicios!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
