import React from "react";
import FormProfileComponent from "./FormProfile";
import MyDeliveryAddressComponent from "./MyDeliveryAddress";


export default function MyProfileComponent() {


    return (
        <>
            
            <div className="p-4">
                <h2 clas> Mis Datos</h2>
                <FormProfileComponent />

                <MyDeliveryAddressComponent />


            </div>

        </>
    )
}