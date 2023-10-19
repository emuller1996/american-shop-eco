import axios from "axios";
import React, { useEffect, useState } from "react";

export default function SelectPaymentMethodsComponent() {
  const [AllInsFinance, setAllInsFinance] = useState([]);

  useEffect(() => {
    getInstuticionFinancieras();
  }, []);

  const getInstuticionFinancieras = async () => {
    try {
      const r = await axios.get(
        `https://api.mercadolibre.com/v1/payment_methods/search?public_key=${process.env.REACT_APP_MERCA_PUBLIC_KEY}&id=pse`
      );
      setAllInsFinance(r.data.results[0].financial_institutions);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card border-0">
      <div className="card-body">
        <h4 className="card-title text-center">Informacion de Facturacion</h4>
        <div className="row">
          <div className="col-md-5">
            <div className="mb-3">
              <label for="inputPassword6" class="col-form-label">
                Tipo Personal
              </label>
              <select
                className="form-select"
                aria-label="size 3 select example"
              >
                <option selected>Selecionar una opcion</option>
                <option value="1">Natural.</option>
                <option value="2">Juridica</option>
              </select>
            </div>
          </div>
          <div className="col-md-7">
            <div className="mb-3 ">
              <label for="inputPassword6" class="col-form-label">
                Tipo y Numero De Documento.
              </label>
              <div className="d-flex gap-4">
                <select
                  className="form-select"
                  aria-label="size 3 select example"
                  style={{ width: "150px" }}
                >
                  <option selected>Selecionar una opcion</option>
                  <option value="1">CC : Cedual de Cuidadania.</option>
                  <option value="1">CE : Cedual de Extranjeria.</option>
                  <option value="1">PA : Pasaporte.</option>
                  <option value="2">Otro</option>
                </select>
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                ></input>
              </div>
            </div>
          </div>
          <div className="col-12">
            <label for="inputPassword6" class="col-form-label">
              Seleccione un Banco
            </label>
            <select
              size={4}
              className="form-select"
              aria-label="size 3 select example"
            >
              {AllInsFinance.map((c) => (
                <option value="1">{c.description}.</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
