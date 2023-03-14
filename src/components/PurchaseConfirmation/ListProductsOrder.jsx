import React from "react";

export default function ListProductsOrder({ products }) {
  return (
    <div class="card text-center border-0 ">
      <div class="card-body m-0 p-0 ">
        <div class="table-responsive rounded ">
          <table
            class="table table-striped
                table-hover	
                table-borderless
                table-dark
                align-middle
                "
          >
            <thead class="table-dark ">
              <tr>
                <th>Img</th>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Valor Unitario</th>
                <th>Valor Total</th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              {products &&
                products.map((p) => (
                  <tr class="table-primary">
                    <td>
                    <img src={p.image} width={'150px'} height={'100px'} class="img-thumbnail" alt="..."/>
                    </td>
                    <td scope="row">{p.name}</td>
                    <td>{p.cant}</td>
                    <td>{p.price}</td>
                    <td>{p.price * p.cant}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
