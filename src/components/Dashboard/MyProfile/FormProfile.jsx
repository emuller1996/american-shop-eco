import React from "react";

export default function FormProfileComponent() {


    return (
        <>
            <form action="">
                <div class="form-floating mb-3">
                    <input type="email"
                        name="name"
                        class="form-control"
                        id="floatingInput" />
                    <label for="floatingInput">Nombre</label>
                </div>
                <div class="form-floating  mb-3">
                    <input type="password"
                        class="form-control"
                        id="floatingPassword" />
                    <label for="floatingPassword">Correo</label>
                </div>

                <div className="row">
                    <div className="col-3">
                        <div class="form-floating">
                            <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
                                <option selected>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                            <label for="floatingSelect">Works with selects</label>
                        </div>
                    </div>
                    <div className="col-5">
                        <div class="form-floating mb-3">
                            <input type="email"
                                name="name"
                                class="form-control"
                                id="floatingInput" />
                            <label for="floatingInput">Nombre</label>
                        </div>

                    </div>


                </div>



            </form>
        </>
    )
}