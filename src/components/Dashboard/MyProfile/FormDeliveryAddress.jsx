import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import InputText from "../../Atomos/InputText";
import { useForm } from "react-hook-form";
import { postCreateDeliveryAddressByIdUser } from "../../../services/delivery.services";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";

export default function FormDeliverAddressComponent({
  handleClose,
  getDeliverAddress,
  deliveryAddress,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { getAccessTokenSilently, user } = useAuth0();
  const [AllDepartaments, setAllDepartaments] = useState([]);
  const [DepartamentIdSelected, setDepartamentIdSelected] = useState(undefined);
  const [AllCities, setAllCities] = useState([]);

  const onHandleSubmit = async (data) => {
    console.log(data);

    try {
      const token = await getAccessTokenSilently();
      const r = await postCreateDeliveryAddressByIdUser(
        { data, email: user?.email },
        token
      );
      console.log(r);
      toast.success(r.data.response);
      getDeliverAddress();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllDepartaments();
  }, []);

  const getAllDepartaments = async () => {
    try {
      const r = await axios.get("https://api-colombia.com/api/v1/Department");
      setAllDepartaments(
        r.data.map((i) => {
          return {
            value: i?.name,
            label: i?.name,
            id: i?.id,
          };
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (DepartamentIdSelected) {
      getAllCities(DepartamentIdSelected?.id);
    }
  }, [DepartamentIdSelected]);

  const getAllCities = async (idDepartament) => {
    try {
      const r = await axios.get(
        `https://api-colombia.com/api/v1/Department/${idDepartament}/cities`
      );
      console.log(r.data);

      setAllCities(
        r.data.map((i) => {
          return {
            value: i?.name,
            label: i?.name,
            id: i?.id,
          };
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Form
        onSubmit={handleSubmit(onHandleSubmit)}
        action=""
        className="px-4 pt-3"
        autoComplete="off"
      >
        <div className="d-flex flex-column mb-2">
          <span
            className="text-center m-0 text-muted "
            style={{ fontSize: "0.8em", fontWeight: "300" }}
          >
            Datos de Contacto
          </span>
          <hr
            style={{ borderColor: "#757575" }}
            className="my-1 w-50 mx-auto "
          />
        </div>

        <div className="d-flex flex-column gap-3 ">
          <TextField
            variant="outlined"
            color="primary"
            fullWidth
            defaultValue={user?.name}
            id="name"
            {...register("name", { required: true })}
            /* onChange={(e) => {
            setValue("name", e.target.value);
          }} */
            error={errors?.name?.message}
            label={"Nombre de Contacto *"}
            placeholder={"Ej. Juan Perez"}
          />
          <TextField
            variant="outlined"
            color="primary"
            fullWidth
            {...register("phone", {
              required: true,
            })}
            className=""
            label={"Telefono *"}
            placeholder={"Ej. 318461..."}
          />
        </div>

        <div className="d-flex flex-column mt-3 mb-2">
          <span
            className="text-center m-0 text-muted "
            style={{ fontSize: "0.8em", fontWeight: "300" }}
          >
            Datos de Envio
          </span>
          <hr
            style={{ borderColor: "#757575" }}
            className="my-1 w-50 mx-auto "
          />
        </div>

        <div className="d-flex flex-column gap-3 ">
          <Autocomplete
            autoComplete="off"
            disablePortal
            id="Departamento"
            fullWidth
            onChange={(e) => {
              console.log(e.currentTarget.innerHTML);
              console.log(
                AllDepartaments.find(
                  (i) => i.value === e.currentTarget.innerHTML
                )
              );

              console.log(e.currentTarget.id.split("-")[2]);
              console.log(AllDepartaments[e.currentTarget.id.split("-")[2]]);

              setDepartamentIdSelected(
                AllDepartaments.find(
                  (i) => i.value === e.currentTarget.innerHTML
                )
              );
            }}
            options={AllDepartaments && AllDepartaments}
            renderInput={(params) => (
              <TextField
                autoComplete="off"
                {...params}
                {...register("department", { required: true })}
                label="Departamento *"
              />
            )}
          />
          <Autocomplete
            disablePortal
            id="Ciudad"
            fullWidth
            disabled={!DepartamentIdSelected ? true : false}
            onChange={(e) => {}}
            options={AllCities}
            renderInput={(params) => (
              <TextField
                {...params}
                {...register("city", { required: true })}
                label="Ciudad *"
              />
            )}
          />

          <TextField
            variant="outlined"
            color="primary"
            fullWidth
            {...register("address", {
              required: true,
            })}
            className=""
            label={"Dirrecion de Calle *"}
            placeholder={"Ej. Cra 46..."}
          />
          <TextField
            variant="outlined"
            color="primary"
            fullWidth
            {...register("neighborhood")}
            label={"Barrio "}
            placeholder={"Ej. Bellavista"}
          />
          <TextField
            variant="outlined"
            color="primary"
            fullWidth
            {...register("reference")}
            className=""
            label={"Referencia "}
            placeholder={"Ej. Hotel F##, AP 1## ..."}
          />
          <div className="text-center mb-3">
            <Button
              size="lg"
              variant="success"
              className="rounded-1"
              type="submit" /* onClick={handleClose} */
            >
              <i className="far fa-save me-2"></i>
              Guardar
            </Button>
          </div>
        </div>

        {/* <InputText
          register={register}
          rules={{
            required: "El nombre es Obligatorio",
          }}
          error={errors}
          name={"name"}
          label={"Nombre"}
          placeholder={"Mi Casa, La Oficina, La Segunda Casa"}
        /> */}
        {/* <InputText
          register={register}
          rules={{
            required: "El Departamento es Obligatorio",
          }}
          error={errors}
          name={"department"}
          label={"Departamento"}
          placeholder={"Valle del Cauca, Antioquia ..."}
        />
        <InputText
          register={register}
          rules={{
            required: "La Cuidad es Obligatoria",
          }}
          error={errors}
          name={"city"}
          label={"Cuidad"}
          placeholder={"Cali, Bogota ..."}
        />
        <InputText
          register={register}
          rules={{
            required: "La Dirrecion es Obligatoria",
          }}
          error={errors}
          name={"address"}
          label={"Dirrecion"}
          placeholder={"Cll 13, Cra 123 # 231..."}
        />
        <InputText
          register={register}
          error={errors}
          name={"neighborhood"}
          label={"Barrio"}
          placeholder={"Cll 13, Cra 123 # 231..."}
        />
        <InputText
          register={register}
          error={errors}
          name={"phone"}
          label={"Telefono"}
          placeholder={"318 825 ..."}
        />
        <InputText
          register={register}
          error={errors}
          name={"reference"}
          label={"Referencia"}
          placeholder={"AP 2##, LOC 3##"}
        /> */}
      </Form>
    </>
  );
}
