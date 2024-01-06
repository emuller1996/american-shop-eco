import React from "react";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import InputText from "../../Atomos/InputText";
import { useForm } from "react-hook-form";
import { postCreateDeliveryAddressByIdUser } from "../../../services/delivery.services";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";

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
        />

        <div className="text-center mb-3">
          <Button variant="success" type="submit" /* onClick={handleClose} */>
            <i className="far fa-save me-2"></i>
            Guardar
          </Button>
        </div>
      </Form>
    </>
  );
}
