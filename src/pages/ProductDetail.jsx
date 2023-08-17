import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addProductToCart } from "../features/Car/carSlice";
import { toast } from "react-toastify";
import { MostrarPesoCOP } from "../utils";

const ProductDetail = () => {
  let { id } = useParams();
  const [productDetail, setProductDetail] = useState(undefined);
  const [TallaProducto, setTallaProducto] = useState(undefined);
  const [CantidadTalla, setCantidadTalla] = useState(undefined);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    getProductDetail(id);
  }, [id]);


  const getProductDetail = async (id) => {
    console.log(id);

    const result = await axios.get(`/Products/${id}`);
    console.log(result.data);
    setProductDetail(result.data);
  };

  const addProducToCart = (idProduct) => {
    console.log(idProduct);
    dispatch(addProductToCart({ id: idProduct, cant: 1 }));
  };

  return (
    <>
      <section class="bg-light">
        <div class="container pb-5">
          <div class="row">
            <div class="col-lg-5 mt-5">
              <div class="row">
                {/*Start Controls*/}
                <div class="col-1 align-self-center">
                  <a
                    href="#multi-item-example"
                    role="button"
                    data-bs-slide="prev"
                  >
                    <i class="text-dark fas fa-chevron-left"></i>
                    <span class="sr-only">Previous</span>
                  </a>
                </div>
                {/*End Controls*/}
                {/*Start Carousel Wrapper*/}
                <div
                  id="multi-item-example"
                  class="col-10 carousel slide carousel-multi-item"
                  data-bs-ride="carousel"
                >
                  {/*Start Slides*/}
                  <div class="carousel-inner product-links-wap" role="listbox">
                    {/*First slide*/}
                    <div class="carousel-item active">
                      <div class="row">
                        <div class="col-12">
                          <img
                            class="card-img img-fluid"
                            src={productDetail && productDetail.image}
                            alt="ProductImage1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*End Slides*/}
                </div>
                {/*End Carousel Wrapper*/}
                {/*Start Controls*/}
                <div class="col-1 align-self-center">
                  <a
                    href="#multi-item-example"
                    role="button"
                    data-bs-slide="next"
                  >
                    <i class="text-dark fas fa-chevron-right"></i>
                    <span class="sr-only">Next</span>
                  </a>
                </div>
                {/*End Controls*/}
              </div>
            </div>
            {/* col end */}
            <div class="col-lg-7 mt-5">
              <div class="card" data-aos="fade-out" data-aos-delay="200">
                <div class="card-body">
                  <button
                    type="button"
                    onClick={() => {
                      history.goBack();
                    }}
                    class="btn btn-danger btn-lg float-end"
                  >
                    <i class="fas fa-chevron-left"></i>
                  </button>
                  <h1 class="h2">
                    {productDetail ? (
                      productDetail.name
                    ) : (
                      <span className="placeholder col-8 rounded"></span>
                    )}
                  </h1>
                  <p class="h3 py-2  placeholder-glow">
                    {productDetail ? (
                      `${MostrarPesoCOP(productDetail.price)}`
                    ) : (
                      <span class="placeholder col-3 rounded"></span>
                    )}
                  </p>
                  <p class="py-2">
                    <i class="fa fa-star text-warning"></i>
                    <i class="fa fa-star text-warning"></i>
                    <i class="fa fa-star text-warning"></i>
                    <i class="fa fa-star text-warning"></i>
                    <i class="fa fa-star text-secondary"></i>
                    <span class="list-inline-item text-dark">
                      Rating 4.8 | 36 Comments
                    </span>
                  </p>
                  <ul class="list-inline">
                    <li class="list-inline-item">
                      <h6>Marca: </h6>
                    </li>
                    <li class="list-inline-item">
                      <h4 class="text-muted placeholder-glow">
                        {productDetail ? (
                          `${productDetail.brand}`
                        ) : (
                          <span class="placeholder col-6"></span>
                        )}
                      </h4>
                    </li>
                  </ul>

                  <h6>Descripcion:</h6>
                  <p className="placeholder-glow ">
                    {productDetail ? (
                      `${productDetail.description}`
                    ) : (
                      <>
                        <span class="placeholder col-5 rounded"></span>
                        <span class="placeholder col-7 rounded"></span>
                        <span class="placeholder col-4 rounded"></span>
                        <span class="placeholder col-6 rounded"></span>
                        <span class="placeholder col-8 rounded"></span>
                        <span class="placeholder col-4 rounded"></span>
                      </>
                    )}
                  </p>

                  <form action="" method="GET">
                    <input
                      type="hidden"
                      name="product-title"
                      value="Activewear"
                    />
                    <div class="row">
                      <div class="col-auto">
                        <ul class="list-inline pb-3">
                          <li class="list-inline-item">
                            Size :
                            <input
                              type="hidden"
                              name="product-size"
                              id="product-size"
                              value="S"
                            />
                          </li>
                          {productDetail &&
                            productDetail.Sizes.map((s) => (
                              <li
                                onClick={() => {
                                  setTallaProducto(s);
                                  setCantidadTalla(1);
                                }}
                                class="list-inline-item"
                              >
                                <span class="btn btn-danger btn-size">
                                  {s.size}
                                  <span
                                    class="d-block"
                                    style={{ fontSize: "0.7em" }}
                                  >
                                    {`Cantidad : ${s.ProductSize.quantity}`}
                                  </span>
                                </span>
                              </li>
                            ))}
                          {/* <li class="list-inline-item">
                            <span class="btn btn-danger btn-size">S</span>
                          </li>
                          <li class="list-inline-item">
                            <span class="btn btn-danger btn-size">M</span>
                          </li>
                          <li class="list-inline-item">
                            <span class="btn btn-danger btn-size">L</span>
                          </li>
                          <li class="list-inline-item">
                            <span class="btn btn-danger btn-size">XL</span>
                          </li> */}
                        </ul>
                      </div>
                      {TallaProducto && (
                        <div class="col-auto">
                          <ul class="list-inline pb-3">
                            <li class="list-inline-item text-right">
                              Cantidad
                              <input
                                type="hidden"
                                name="product-quanity"
                                id="product-quanity"
                              />
                            </li>
                            <li
                              onClick={() => {
                                if (CantidadTalla > 1) {
                                  setCantidadTalla(CantidadTalla - 1);
                                } else {
                                  toast.error(
                                    "Error!, La cantidad no puede ser menor a uno."
                                  );
                                }
                              }}
                              class="list-inline-item"
                            >
                              <span class="btn btn-danger" id="btn-minus">
                                -
                              </span>
                            </li>
                            <li class="list-inline-item">
                              <span class="badge bg-secondary" id="var-value">
                                {CantidadTalla && CantidadTalla}
                              </span>
                            </li>
                            <li
                              onClick={() => {
                                if (
                                  CantidadTalla <
                                  TallaProducto.ProductSize.quantity
                                ) {
                                  setCantidadTalla(CantidadTalla + 1);
                                } else {
                                  toast.error(
                                    "Lo sentimos no tenemos disponible esa cantidad."
                                  );
                                }
                              }}
                              class="list-inline-item"
                            >
                              <span class="btn btn-danger" id="btn-plus">
                                +
                              </span>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                    <div class="row pb-3">
                      <div class="col d-grid">
                        <button
                          type="submit"
                          class="btn btn-danger btn-lg"
                          name="submit"
                          value="buy"
                        >
                          Buy
                        </button>
                      </div>
                      <div class="col d-grid">
                        <button
                          type="button"
                          class="btn btn-danger btn-lg"
                          value="addtocard"
                          onClick={() => {
                            addProducToCart(productDetail.id);
                          }}
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default ProductDetail;
