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
            <thead class="table-secondary ">
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
                  <tr class="table-secondary">
                    <td>
                      <div className="border-danger rounded-pill overflow-hidden" style={ { width : '50px', height : '50px' }}>
                      <img src={p.image}  class="img-fluid" alt="..."/>
                      </div>
                    
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
