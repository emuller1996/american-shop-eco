import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductsToCart, resetCart } from "../../features/Car/carSlice";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getProductByIdServicio } from "../../services/productos.servicios";
import "./MyCart.css";
import SpinnerComponent from "../../components/Spinner";
import { MostrarPesoCOP } from "../../utils";

export default function MyCart() {
  const cart = useSelector((state) => state.cart);

  const [cartState, setCartState] = useState([]);
  const [total, setTotal] = useState();
  const [isLoading, setisLoading] = useState(true);
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    getProducts();
  }, [cart]);

  const getProducts = async () => {
    setCartState([]);

    try {
      setisLoading(true);
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
      const results = await Promise.all(s);

      setCartState(results);
      const sumWithInitial = results.reduce((accumulator, currentValue) => {
        if (currentValue.is_discount) {
          return (
            accumulator +
            (currentValue.price -
              currentValue.price * (currentValue.discount_percentage / 100)) *
              currentValue.cant
          );
        } else {
          return accumulator + currentValue.price * currentValue.cant;
        }
      }, 0);
      setTotal(sumWithInitial);
      setisLoading(false);
    } catch (error) {
      dispatch(resetCart());
    }
  };

  const HandledeleteProductsToCart = (id) => {
    dispatch(deleteProductsToCart(id));
  };

  return (
    <>
      <div className="container " style={{ minHeight: "66vh" }}>
        <h4 className="text-center mb-3 mt-4">Mi Carrito</h4>
        <div className="">
          <div className="row g-3 align-items-start pb-4">
            <div className="col-md-8 ">
              <div className="p-3 contenedor-carrito-items">
                {!isLoading && cart.length === 0 && (
                  <div className="w-100 tex-center py-4">
                    SIN PRODUCTOS EN EL CARRITO
                  </div>
                )}
                {isLoading ? (
                  <div>
                    <SpinnerComponent />
                  </div>
                ) : (
                  cartState.map((p) => (
                    <>
                      <div className="card card-carrito-producto mb-2 position-relative ">
                        {p?.is_discount && (
                          <div className="position-absolute top-0 start-50 translate-middle badge bg-danger">
                            En Descuento
                          </div>
                        )}
                        <div className="card-body">
                          <div className="row align-items-start">
                            <div className="col-4 col-md-3">
                              <img
                                className="rounded-3 img-fluid"
                                src={
                                  p.image
                                    ? p.image
                                    : "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
                                }
                                width="60px"
                                height={"50px"}
                                alt=""
                                srcset=""
                              />
                            </div>
                            <div className="col-8 col-md-9 align-self-center">
                              <div className="row align-items-start">
                                <div className="col-8 col-md-8 col-lg-9">
                                  <span>{p.name}</span>
                                </div>
                                <div className="col-4 col-md-3 col-lg-2  text-start">
                                  <span className="text-nowrap">
                                    <b
                                      className="me-2"
                                      style={{ fontSize: "0.8em" }}
                                    >
                                      Talla :{" "}
                                    </b>
                                    {p.talla_Strin}
                                  </span>
                                </div>
                                <div className="col-12">
                                  <div className="d-flex justify-content-between flex-wrap ">
                                    <div  className="d-flex justify-content-between flex-wrap gap-1  ">
                                      <span
                                        className={`${
                                          !p.is_discount
                                            ? ""
                                            : "text-decoration-line-through text-muted"
                                        } `}
                                      >
                                        {`${MostrarPesoCOP(p.price)}`}
                                      </span>
                                      {p.is_discount && (
                                        <span className="">
                                          {`${MostrarPesoCOP(
                                            p.price -
                                              p.price *
                                                (p.discount_percentage / 100)
                                          )}`}
                                        </span>
                                      )}
                                      <span>
                                        {`
                                        x ${p.cant}
                                        `}
                                      </span>
                                    </div>

                                    <span className="fw-semibold">{`${MostrarPesoCOP(
                                      (!p.is_discount
                                        ? p.price
                                        : p.price -
                                          p.price *
                                            (p.discount_percentage / 100)) *
                                        p.cant
                                    )}`}</span>
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
                  ))
                )}
              </div>
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
              <div className="card card-carrito-producto bg-white ">
                <div className="card-body">
                  <h3 className="text-center text-success fw-normal">
                    Total a Pagar
                  </h3>
                  <p className="text-center fs-4 fw-semibold">
                    {"$ "}
                    {total && MostrarPesoCOP(total)}
                  </p>

                  {isAuthenticated && cart.length !== 0 ? (
                    <Link
                      to={"/comfirmar-compra"}
                      disabled={!isAuthenticated}
                      className="btn btn-success-carrito w-100 py-3 h3 fw-bold "
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

            <div className="col-md-6">
              <p>
                En AMERICANSHOPVIP, nos complace informarte que ofrecemos
                servicios de envío a nivel nacional. Sea cual sea tu ubicación
                dentro del país, ¡podemos enviarte nuestros productos
                directamente a tu puerta!
              </p>
              <p>
                Si tienes alguna pregunta adicional sobre nuestros servicios de
                envío o necesitas asistencia con tu pedido, no dudes en
                contactarnos. Estamos aquí para ayudarte.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
