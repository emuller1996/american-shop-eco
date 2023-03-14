import React from "react";

export default function SelectPaymentMethodsComponent() {
  return (
    <div class="card ">
      <div class="card-body">
        <h4 class="card-title">Selecionar de Forma de Pago</h4>
        <p class="card-text">
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
            />
            <label class="form-check-label" for="flexRadioDefault1">
              Efectivo .(en Sede Fisica)
            </label>
          </div>


          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
            />
            <label class="form-check-label" for="flexRadioDefault1">
              Nequi 
            </label>
          </div>

          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
            />
            <label class="form-check-label" for="flexRadioDefault1">
              PSE 
            </label>
          </div>

        </p>
      </div>
    </div>
  );
}
