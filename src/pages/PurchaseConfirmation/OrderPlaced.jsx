import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const OrderPlaced = () => {
  const params = useParams();
  const history = useHistory();
  const [order, setOrder] = useState(undefined);

  useEffect(() => {
    getOrder();
    return () => {
      console.log("DESMONTE ORDER PLACED");
    };
  }, []);

  const getOrder = async () => {
    try {
      const result = await axios.get(`/order/comfirmation/${params.idOrder}`);
      console.log(result.data);
      setOrder(result.data.order);
    } catch (error) {
      history.push(`/Shop`);
      alert(error.messagge);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center">Su pedido ha realizo con exito</h3>
      <hr className="border-danger" />
      <div class="row justify-content-center align-items-start g-2">
        <div class="col-md-7">
          <div class="table-responsive">
            <table class="table table-white">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Valor Unit.</th>
                  <th scope="col">Cantidad.</th>
                  <th scope="col">Valor Total.</th>
                </tr>
              </thead>
              <tbody>
                {order ? (
                  order.Products.map((o) => (
                    <tr class="">
                      <td scope="row">
                        <img
                          src={o.image}
                          class="rounded-circle shadow-4"
                          style={{ width: "60px" }}
                          alt="Avatar"
                        />
                      </td>
                      <td className="text-nowrap">{o.name}</td>
                      <td>
                        $
                        {o.OrderDetail.unitPrice.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}
                      </td>
                      <td>{o.OrderDetail.units}</td>
                      <td>
                        $
                        {o.OrderDetail.totalPrice.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr class="placeholder-glow">
                    <td>
                      <span class="placeholder col-12  bg-danger p-3 rounded"></span>
                    </td>
                    <td>
                      <span class="placeholder col-12  bg-danger p-3 rounded"></span>
                    </td>
                    <td>
                      <span class="placeholder col-12  bg-danger p-3 rounded"></span>
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                
                  <th colSpan={6} className="fw-bold text-danger fs-4 text-end pe-4">$ {order && order.total_payment.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}</th>
                
              </tfoot>
            </table>
          </div>
        </div>
        <div class="col-md-5">
          <div class="card text-start  border-0">
            <div class="card-body row justify-content-center align-items-start">
              <h4 class="text-center card-title col-12">Dirreccion de Envio</h4>
              <hr className="border-danger" />
              <p class="card-text fw-semibold  col-12 placeholder-glow m-0">
                {order ? (
                  order.DeliveryAddress.name
                ) : (
                  <span class="placeholder col-4  bg-danger p-1 rounded"></span>
                )}
              </p>
              <p class="card-text col-12 placeholder-glow m-0 ">
                {order ? (
                  `${order.DeliveryAddress.address} - ${order.DeliveryAddress.neighborhood} - ${order.DeliveryAddress.reference}`
                ) : (
                  <span class="placeholder col-4  bg-danger p-1 rounded"></span>
                )}
              </p>
              <p class="card-text col-12 placeholder-glow m-0">
                {order ? (
                  `${order.DeliveryAddress.department} - ${order.DeliveryAddress.city}`
                ) : (
                  <span class="placeholder col-4  bg-danger p-1 rounded"></span>
                )}
              </p>
            </div>
          </div>
        </div>
        <div class="col"></div>
      </div>
    </div>
  );
};

export default OrderPlaced;
