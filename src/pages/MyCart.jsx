import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductsToCart } from "../features/Car/carSlice";

import axios from "axios";

export default function MyCart() {
  const cart = useSelector((state) => state.cart);

  const [cartState, setCartState] = useState();
  const [total, setTotal] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    getProducts();


  }, [cart]);

  const getProducts = async () => {
    var s = await cart.map(async (c) => {
      const resutl = await axios.get(`/products/${c.id}`);
      return Object.assign(resutl.data, c)
    });
    const result = await Promise.all(s);
    console.log(result);
    setCartState(result);
    const sumWithInitial = result.reduce(
      (accumulator, currentValue) => accumulator + currentValue.price,
      0
    );
    setTotal(sumWithInitial)

  };


  const HandledeleteProductsToCart = (id) => {
    dispatch(deleteProductsToCart(id))
    getProducts();
  }

  return (
    <>
      <div className="container py-4">
        <h4 className="text-center mb-3">My Cart</h4>
        <div className="row">
          <div className="col-md-8 ">
            <div className="card shadow mb-4 border  border-dark">
              <div className="table-responsive  rounded overflow">
                <table className="table   p-0 m-0  ">
                  <thead className="bg-dark text-white ">
                    <tr>
                      <td className="text-center  fw-semibold">Imagen</td>
                      <td className="text-center fw-semibold"> Producto</td>
                      <td className="text-center fw-semibold">Precio</td>
                      <td className="text-center fw-semibold">Cantidad</td>
                      <td className="text-center fw-semibold">Total Unitario</td>
                      <td className="text-center fwsemibold-"></td>
                    </tr>
                  </thead>
                  <tbody className="rounded">
                    {cart.length === 0 && (
                      <tr>
                        <td className="text-center" colSpan={6}>
                          {" "}
                          SIN PRODUCTOS EN EL CARRITO
                        </td>
                      </tr>
                    )}

                    {cartState ? (
                      cartState.map((p) => (
                        <tr>
                          <td className="text-center">
                            <img
                            className="rounded-3"
                              src={p.image}
                              width="80px"
                              height={"80px"}
                              alt=""
                              srcset=""
                            />
                          </td>
                          <td className="text-center text-nowrap">{p.name}</td>
                          <td className="text-center text-nowrap">{p.price}</td>
                          <td className="text-center text-nowrap">{p.cant}</td>
                          <td className="text-center text-nowrap">{p.price * p.cant}</td>
                          <td className="text-cente text-nowrap">
                            <button
                              className="btn btn-sm rounded-3  btn-danger "
                              onClick={(id) => { HandledeleteProductsToCart(p.id) }}
                            ><i class="far fa-trash-alt fa-sm"></i></button>
                          </td>

                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="text-center"> <p class="placeholder-glow">
                          <span class="placeholder col-6 py-3 rounded"></span>
                        </p>
                        </td>
                        <td className="text-center"> <p class="placeholder-glow">
                          <span class="placeholder col-12 py-3 rounded"></span>
                        </p>
                        </td>

                        <td className="text-center"> <p class="placeholder-glow">
                          <span class="placeholder col-3 py-3 rounded"></span>
                        </p>
                        </td>

                        <td className="text-center"> <p class="placeholder-glow">
                          <span class="placeholder col-3 py-3 rounded"></span>
                        </p>
                        </td>
                        <td className="text-center"> <p class="placeholder-glow">
                          <span class="placeholder col-3 py-3 rounded"></span>
                        </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card bg-white rounded shadow border-dark">
              <div className="card-body">
                <h3 className="text-center text-success fw-normal">
                  Total a Pagar
                </h3>
                <p className="text-center fs-4 fw-semibold">$ {total}</p>
                <button className="btn btn-success w-100 py-3 h3 fw-bold">
                  COMFIRMAR COMPRA
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
