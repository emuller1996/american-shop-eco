import React, { useState } from "react";
import { MostrarPesoCOP } from "../../utils";
import { useEffect } from "react";

export default function ListProductsOrder({ products }) {
  const [total, setTotal] = useState(
    products
      ? products.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.price * currentValue.cant,
          0
        )
      : 0
  );

  useEffect(() => {
    setTotal(
      products &&
        products.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.price * currentValue.cant,
          0
        )
    );
  }, [products]);

  return (
    <div class="card text-center border-0 ">
      <div class="card-body m-0 p-0 ">
        <p>Detalles de Pedido </p>
        <div className="row">
          {products &&
            products.map((p) => (
              <div className="col-12 text-center mt-2">
                <div className="p-2 card-detalle-producto d-flex justify-content-around text-center gap-4">
                  <span>{p.name}</span>
                  <span>{p.cant}</span>
                  <span>{`${p.cant} x ${MostrarPesoCOP(p.price).substring(
                    4
                  )}`}</span>
                  <span>{`${MostrarPesoCOP(p.price * p.cant).substring(
                    4
                  )}`}</span>
                </div>
              </div>
            ))}
        </div>
        <p>Total a Pagar</p>
        <h3>{MostrarPesoCOP(total)}</h3>
      </div>
    </div>
  );
}
