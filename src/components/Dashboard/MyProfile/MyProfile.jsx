import React from "react";
import FormProfileComponent from "./FormProfile";
import MyDeliveryAddressComponent from "./MyDeliveryAddress";


export default function MyProfileComponent() {


    return (
        <>
            
            <div className="container  p-4" style={{minHeight:"65vh"}}>
                <h2 clas> Mis Datos</h2>
                <FormProfileComponent />

                <MyDeliveryAddressComponent />


            </div>

        </>
    )
}