import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function FormDeliverAddressComponent({
  handleClose,
  onHandleInput,
  onHandleSubmit,
}) {
  return (
    <>
      <form onSubmit={onHandleSubmit} action="">
        <Modal.Body>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="name"
              name="name"
              onChange={onHandleInput}
            />
            <label htmlFor="name">Nombre</label>
          </div>

          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="departament"
              name="departament"
              onChange={onHandleInput}
            />
            <label htmlFor="departament">Departamento</label>
          </div>

          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="city"
              name="city"
              onChange={onHandleInput}
            />
            <label htmlFor="city">Ciudad</label>
          </div>

          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="address"
              name="address"
              onChange={onHandleInput}
            />
            <label htmlFor="address">Dirrecion</label>
          </div>

          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="neighborhood"
              name="neighborhood"
              onChange={onHandleInput}
            />
            <label htmlFor="neighborhood">Barrio</label>
          </div>

          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="phone"
              name="phone"
              onChange={onHandleInput}
            />
            <label htmlFor="phone">Telefono</label>
          </div>

          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="reference"
              name="reference"
              onChange={onHandleInput}
            />
            <label htmlFor="reference">Referencia</label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" type="submit" onClick={handleClose}>
            Guardar
          </Button>
        </Modal.Footer>
      </form>
    </>
  );
}
