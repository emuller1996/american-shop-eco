import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import InputText from "../../Atomos/InputText";
import { useForm } from "react-hook-form";

export default function FormDeliverAddressComponent({
  handleClose,
  onHandleInput,
  onHandleSubmit,
  deliveryAddress,
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  return (
    <>
      <Form
        onSubmit={handleSubmit(onHandleSubmit)}
        action=""
        className="px-4 pt-3"
      >
        <InputText
          register={register}
          rules={{
            required: "El nombre es Obligatorio",
          }}
          error={errors}
          name={"name"}
          label={"Nombre"}
          placeholder={"Mi Casa, La Oficina, La Segunda Casa"}
        />
        <InputText
          register={register}
          rules={{
            required: "El Departamento es Obligatorio",
          }}
          error={errors}
          name={"department"}
          label={"Departamento"}
          placeholder={"Valle del Cauca, Antioquia ..."}
        />
        {/* <InputText name={"department"} label={"Departamento"} /> */}

        {/* <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="name"
            name="name"
            value={deliveryAddress ? deliveryAddress.name : ""}
            onChange={onHandleInput}
          />
          <label htmlFor="name">Nombre</label>
        </div>

        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="department"
            name="department"
            value={deliveryAddress ? deliveryAddress.department : ""}
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
            value={deliveryAddress ? deliveryAddress.city : ""}
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
            value={deliveryAddress ? deliveryAddress.address : ""}
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
            value={deliveryAddress ? deliveryAddress.neighborhood : ""}
          />
          <label htmlFor="neighborhood">Barrio</label>
        </div>

        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="phone"
            name="phone"
            value={deliveryAddress ? deliveryAddress.phone : ""}
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
            value={deliveryAddress ? deliveryAddress.reference : ""}
            onChange={onHandleInput}
          />
          <label htmlFor="reference">Referencia</label>
        </div> */}
        <div class="text-center mb-3">
          <Button variant="success" type="submit" onClick={handleClose}>
            <i class="far fa-save me-2"></i>
            Guardar
          </Button>
        </div>
      </Form>
    </>
  );
}
