import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductsToCart, resetCart } from "../../features/Car/carSlice";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getProductByIdServicio } from "../../services/productos.servicios";

export default function MyCart() {
  const cart = useSelector((state) => state.cart);

  const [cartState, setCartState] = useState([]);
  const [total, setTotal] = useState();
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    getProducts();
  }, [cart]);

  const getProducts = async () => {
    setCartState([]);

    try {
      var s = await cart.map(async (c) => {
        try {
          const resutl = await getProductByIdServicio(c.id, "s");
          return Object.assign(resutl.data, c, {
            talla_Strin: resutl.data.Sizes.find((s) => s.id === c.idSize).size,
          });
        } catch (error) {
          console.log("aca rompo");
          dispatch(resetCart());
        }
      });
    } catch (error) {
      dispatch(resetCart());
    }
    const result = await Promise.all(s);

    console.log(
      result.filter((c) => {
        /* console.log(c);
      console.log((c.Sizes.find(s => s.id === c.idSize)).ProductSize.quantity >= c.cant); */
        if (
          c.Sizes.find((s) => s.id === c.idSize).ProductSize.quantity >= c.cant
        ) {
          return true;
        } else {
          toast.error(
            `Error el Producto ${c.name} ya no tiene esas cantidad en stock`
          );
          return false;
        }
        /* console.log((result.Sizes.find(s => s.id === c.idSize)).ProductSize.quantity < c.cant); */
      })
    );
    result.map((c) => {
      /* console.log(c);
      console.log((c.Sizes.find(s => s.id === c.idSize)).ProductSize.quantity >= c.cant); */
      if (
        c.Sizes.find((s) => s.id === c.idSize).ProductSize.quantity >= c.cant
      ) {
        return true;
      } else {
        return false;
      }

      /* console.log((result.Sizes.find(s => s.id === c.idSize)).ProductSize.quantity < c.cant); */
    });

    setCartState(result);
    const sumWithInitial = result.reduce(
      (accumulator, currentValue) => accumulator + currentValue.price,
      0
    );
    setTotal(sumWithInitial);
  };

  const HandledeleteProductsToCart = (id) => {
    dispatch(deleteProductsToCart(id));
  };

  return (
    <>
      <div className="container py-4">
        <h4 className="text-center mb-3">Mi Carrito</h4>
        <div className="row">
          {cart.length === 0 && (
            <div className="col-12">SIN PRODUCTOS EN EL CARRITO</div>
          )}
          <div className="col-md-8 ">
            {cartState &&
              cartState.map((p) => (
                <>
                  <div className="card mb-2">
                    <div className="card-body">
                      <div className="row align-items-start">
                        <div className="col-4 col-md-3">
                          <img
                            className="rounded-3 img-fluid"
                            src={
                              p?.Images[0]?.url_image
                                ? p?.Images[0]?.url_image
                                : p.image
                            }
                            width="60px"
                            height={"50px"}
                            alt=""
                            srcset=""
                          />
                        </div>
                        <div className="col-8 col-md-9 align-self-center">
                          <div className="row align-items-start">
                            <div className="col-8 col-md-9 col-lg-10">
                              <span>{p.name}</span>
                            </div>
                            <div className="col-4 col-md-3 col-lg-2 align-self-end text-end">
                              <span className="text-nowrap">
                                {p.talla_Strin}
                              </span>
                            </div>
                            <div className="col-12">
                              <div className="d-flex justify-content-between">
                                <span>{`${p.price.toLocaleString(undefined, {
                                  maximumFractionDigits: 2,
                                })} x ${p.cant}`}</span>
                                <span className="fw-semibold">{`${(
                                  p.price * p.cant
                                ).toLocaleString(undefined, {
                                  maximumFractionDigits: 2,
                                })}`}</span>
                                <button
                                  className="btn btn-sm rounded-3  btn-danger "
                                  onClick={(id) => {
                                    HandledeleteProductsToCart(p.id);
                                  }}
                                >
                                  <i class="far fa-trash-alt fa-sm"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            {/* <div className="card shadow mb-4 border  border-dark">
              <div className="table-responsive  rounded overflow">
                <table className="table   p-0 m-0  ">
                  <thead className="bg-dark text-white ">
                    <tr>
                      <td className="text-center  fw-semibold">Imagen</td>
                      <td className="text-center fw-semibold"> Producto</td>
                      <td className="text-center fw-semibold">Precio</td>
                      <td className="text-center fw-semibold">Cantidad</td>
                      <td className="text-center fw-semibold">Talla</td>
                      <td className="text-center fw-semibold">
                        Total Unitario
                      </td>
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
                          <td className="text-center text-nowrap">
                            {p.price.toLocaleString(undefined, {
                              maximumFractionDigits: 2,
                            })}
                          </td>
                          <td className="text-center text-nowrap">{p.cant}</td>
                          <td className="text-center text-nowrap">
                            {p.talla_Strin}
                          </td>

                          <td className="text-center text-nowrap">
                            ${" "}
                            {(p.price * p.cant).toLocaleString(undefined, {
                              maximumFractionDigits: 2,
                            })}
                          </td>
                          <td className="text-cente text-nowrap">
                            <button
                              className="btn btn-sm rounded-3  btn-danger "
                              onClick={(id) => {
                                HandledeleteProductsToCart(p.id);
                              }}
                            >
                              <i class="far fa-trash-alt fa-sm"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="text-center">
                          {" "}
                          <p class="placeholder-glow">
                            <span class="placeholder col-6 py-3 rounded"></span>
                          </p>
                        </td>
                        <td className="text-center">
                          {" "}
                          <p class="placeholder-glow">
                            <span class="placeholder col-12 py-3 rounded"></span>
                          </p>
                        </td>

                        <td className="text-center">
                          {" "}
                          <p class="placeholder-glow">
                            <span class="placeholder col-3 py-3 rounded"></span>
                          </p>
                        </td>

                        <td className="text-center">
                          {" "}
                          <p class="placeholder-glow">
                            <span class="placeholder col-3 py-3 rounded"></span>
                          </p>
                        </td>
                        <td className="text-center">
                          {" "}
                          <p class="placeholder-glow">
                            <span class="placeholder col-3 py-3 rounded"></span>
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div> */}
          </div>

          <div className="col-md-4">
            <div className="card bg-white rounded shadow border-dark">
              <div className="card-body">
                <h3 className="text-center text-success fw-normal">
                  Total a Pagar
                </h3>
                <p className="text-center fs-4 fw-semibold">
                  {"$ "}
                  {total &&
                    total.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                </p>

                {isAuthenticated && cart.length !== 0 ? (
                  <Link
                    to={"/comfirmar-compra"}
                    disabled={!isAuthenticated}
                    className="btn btn-success w-100 py-3 h3 fw-bold "
                  >
                    COMFIRMAR COMPRA
                  </Link>
                ) : (
                  <button
                    disabled
                    className="btn btn-success w-100 py-3 h3 fw-bold "
                  >
                    COMFIRMAR COMPRA
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
