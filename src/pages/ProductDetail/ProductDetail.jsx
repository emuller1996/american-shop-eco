import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addProductToCart } from "../../features/Car/carSlice";
import { toast } from "react-toastify";
import { MostrarPesoCOP } from "../../utils";
import { useAuth0 } from "@auth0/auth0-react";
import { getProductByIdServicio } from "../../services/productos.servicios";
import { useRef } from "react";
import img from "./img-place.gif";
import "./ProductoDetalle.css";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import ReactTimeAgo from "react-time-ago";

const ProductDetail = () => {
  let { id } = useParams();
  const [productDetail, setProductDetail] = useState(undefined);
  const [TallaProducto, setTallaProducto] = useState(undefined);
  const [CantidadTalla, setCantidadTalla] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
  const detail = useRef(null);

  const [comment, setComment] = useState("");
  const [AllComments, setAllComments] = useState(undefined);

  useEffect(() => {
    getProductDetail(id);
    console.log(detail.current);
    detail.current.scrollIntoView();
    getAllCommnet();
  }, [id]);

  const getProductDetail = async (id) => {
    setIsLoading(true);
    try {
      var token = await getAccessTokenSilently();
    } catch (error) {
      console.log(error);
    }

    try {
      const result = await getProductByIdServicio(id, token);
      console.log(result.data);
      setProductDetail(result.data);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const addProducToCart = (idProduct, Talla, CantidadTalla) => {
    console.log(Talla, CantidadTalla);
    dispatch(
      addProductToCart({ id: idProduct, cant: CantidadTalla, idSize: Talla.id })
    );
  };
  const getAllCommnet = async () => {
    try {
      const r = await axios.get(`/products/${id}/comments`);
      console.log(r);
      setAllComments(r.data);
    } catch (error) {}
  };

  return (
    <>
      <section ref={detail} class="bg-light">
        <div class="container pb-5">
          <div class="row g-4">
            <div class="col-lg-5 mt-5 align-self-center">
              {/* <div class="row align-items-center">
                {isLoading ? (
                  <div className="col-12 align-self-center text-center">
                    <img style={{ width: "250px" }} src={img} alt="s" />
                  </div>
                ) : (
                  <>
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
                    <div
                      id="multi-item-example"
                      class="col-10 carousel slide carousel-multi-item"
                      data-bs-ride="carousel"
                    >
                      <div
                        class="carousel-inner product-links-wap"
                        role="listbox"
                      >
                        <div class="carousel-item active">
                          <div class="row">
                            <div class="col-12">
                              <img
                                class="card-img img-fluid"
                                src={
                                  productDetail.Images.length !== 0 
                                    ? productDetail?.Images[0]?.url_image
                                    : "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
                                }
                                alt={"IMG PRODUCTO"}
                              />
                            </div>
                          </div>
                        </div>

                        {productDetail &&
                          Array.isArray(productDetail.Images) &&
                          productDetail.Images.map((i, index) => (
                            <div class={`carousel-item `}>
                              <div class="row">
                                <div class="col-12">
                                  <img
                                    class="card-img img-fluid"
                                    src={i && i.url_image}
                                    alt="ProductImage1"
                                  />
                                </div>
                              </div>
                            </div>
                          )).splice(1, productDetail.Images.length)}
                      </div>
                    </div>

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
                  </>
                )}
              </div> */}
              {productDetail && productDetail.Images.length === 0 && (
                <img
                  class="card-img img-fluid"
                  src={
                    "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
                  }
                  alt={"IMG PRODUCTO"}
                />
              )}
              <Carousel className=" rounded-2" interval={1500}>
                {productDetail &&
                  Array.isArray(productDetail.Images) &&
                  productDetail.Images.map((i, index) => (
                    <Carousel.Item className=" rounded-2">
                      <img
                        class="card-img img-fluid rounded-2 overflow-auto "
                        src={i && i.imageBase64}
                        alt="ProductImage1"
                      />
                      <Carousel.Caption></Carousel.Caption>
                    </Carousel.Item>
                  ))}
              </Carousel>
            </div>

            <div class="col-lg-7 mt-5">
              <div
                class="card card-producto-detalle position-relative "
                data-aos="fade-out"
                data-aos-delay="200"
              >
                {productDetail?.is_discount && (
                  <div className="position-absolute top-0 start-50 translate-middle badge bg-danger">
                    En Descuento
                  </div>
                )}
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
                  <p
                    class={`h3   placeholder-glow ${
                      productDetail?.is_discount &&
                      "text-decoration-line-through text-muted"
                    }`}
                  >
                    {productDetail ? (
                      `${MostrarPesoCOP(productDetail?.price)}`
                    ) : (
                      <span class="placeholder col-3 rounded"></span>
                    )}
                  </p>
                  {productDetail && productDetail?.is_discount && (
                    <p class="h3  ">
                      {`${MostrarPesoCOP(
                        productDetail.price -
                          productDetail.price *
                            (productDetail.discount_percentage / 100)
                      )}`}
                    </p>
                  )}
                  <ul class="list-inline">
                    <li class="list-inline-item">
                      <h6>Marca: </h6>
                    </li>
                    <li class="list-inline-item">
                      <h4 class="text-muted placeholder-glow">
                        {!isLoading ? (
                          `${productDetail.brand}`
                        ) : (
                          <span class="placeholder col-6"></span>
                        )}
                      </h4>
                    </li>
                  </ul>

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
                            <h6>Tallas :</h6>
                            <input
                              type="hidden"
                              name="product-size"
                              id="product-size"
                              value="S"
                            />
                          </li>
                          {productDetail && productDetail.stock === 0 && (
                            <p className="text-danger fw-semibold m-0">
                              {" "}
                              No tenemos este articulo en stock{" "}
                            </p>
                          )}
                          {productDetail &&
                            productDetail.Sizes.map((s) => (
                              <li
                                onClick={() => {
                                  setTallaProducto(s);
                                  setCantidadTalla(1);
                                }}
                                class={`list-inline-item  ${
                                  TallaProducto === s
                                    ? "btn-size-seleted"
                                    : "btn-size"
                                }`}
                              >
                                <span class="">{s.size}</span>
                                <span
                                  class="d-block"
                                  style={{ fontSize: "0.7em" }}
                                >
                                  {`Disponible: ${s.ProductSize.quantity}`}
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
                      {/* <div class="col d-grid">
                        <button
                          type="submit"
                          class="btn btn-danger btn-lg"
                          name="submit"
                          value="buy"
                        >
                          Buy
                        </button>
                      </div> */}
                      <div class="col d-grid">
                        <button
                          type="button"
                          class="btn btn-danger btn-lg"
                          value="addtocard"
                          disabled={
                            (productDetail && productDetail.stock === 0) ||
                            !TallaProducto ||
                            !CantidadTalla
                          }
                          onClick={() => {
                            addProducToCart(
                              productDetail.id,
                              TallaProducto,
                              CantidadTalla
                            );
                            setTallaProducto(undefined);
                            setCantidadTalla(undefined);
                            toast.success(
                              "Se ha agregado con exito el producto al carrito "
                            );
                          }}
                        >
                          <i className="fas fa-cart-plus me-2"></i>
                          Añadir al Carrito
                        </button>
                      </div>
                    </div>
                  </form>

                  <h6>Descripcion:</h6>
                  <p
                    className="placeholder-glow "
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {!isLoading ? (
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
                </div>
              </div>
            </div>

            <div className="col-12">
              <h4 className="text-center">Comentarios</h4>

              <div className="card">
                <div className="card-body">
                  <div className="row g-3 ">
                    {AllComments &&
                      AllComments.map((c) => (
                        <div className="col-12">
                          <div className="border py-1 px-3  rounded-3 ">
                            <div className="d-flex gap-3 ">
                              <div className=" align-self-center d-flex gap-2">
                                <img
                                  width={40}
                                  height={40}
                                  src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"
                                  alt=""
                                />
                                <div className="d-flex flex-column gap-0 text-muted ">
                                  <span className="text-nowrap ">
                                    {c?.User?.name}
                                  </span>
                                  <small className="text-nowrap ">
                                    <ReactTimeAgo
                                      date={c?.createdAt}
                                      locale="en-CO"
                                    />
                                  </small>
                                </div>
                              </div>
                              <div className="align-self-center ">
                                <p
                                  className="m-0 text-start "
                                  style={{ whiteSpace: "balance" }}
                                >
                                  {c?.comment}
                                </p>
                              </div>
                            </div>
                          </div>
                          {c.SubComments.map((s) => (
                            <div className="ms-3 d-flex gap-3 mt-2">
                              <div className="align-self-center ">
                                <svg
                                  fill="none"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  width="30"
                                  style={{ rotate: "-90deg" }}
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M16.4012 3.37802C16.1957 3.01839 15.7375 2.89344 15.3779 3.09895C13.109 4.39542 11.9867 6.05212 11.4569 7.80854C10.9888 9.36083 10.9943 10.9741 10.9991 12.3513C10.9995 12.4866 11 12.6196 11 12.7501V18.4394L7.28033 14.7197C6.98744 14.4268 6.51256 14.4268 6.21967 14.7197C5.92678 15.0126 5.92678 15.4875 6.21967 15.7804L11.2197 20.7803C11.5126 21.0732 11.9874 21.0732 12.2803 20.7803L17.2803 15.7804C17.5732 15.4875 17.5732 15.0126 17.2803 14.7197C16.9874 14.4268 16.5126 14.4268 16.2197 14.7197L12.5 18.4394V12.7501C12.5 12.6234 12.4997 12.4968 12.4994 12.3704C12.4962 10.9589 12.493 9.56807 12.8931 8.24165C13.3133 6.84808 14.191 5.50481 16.1221 4.4013C16.4817 4.19579 16.6067 3.73766 16.4012 3.37802Z"
                                    fill="#b1b1b1"
                                  />
                                </svg>
                              </div>
                              <div className="card p-2 w-100 ">
                                <div className="d-flex gap-3 ">
                                  <div className=" align-self-center d-flex gap-2">
                                    <img
                                      width={40}
                                      height={40}
                                      src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"
                                      alt=""
                                    />
                                    <div className="d-flex flex-column gap-0 text-muted ">
                                      <span className="text-nowrap ">
                                        {s?.write_by}
                                      </span>
                                      <small className="text-nowrap ">
                                        <ReactTimeAgo
                                          date={s?.createdAt}
                                          locale="en-CO"
                                        />
                                      </small>
                                    </div>
                                  </div>
                                  <div className="align-self-center ">
                                    <p
                                      className="m-0 text-start "
                                      style={{ whiteSpace: "balance" }}
                                    >
                                      {s?.comment}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}

                    <div className="col-12">
                      {isAuthenticated ? (
                        <div className="d-flex gap-3">
                          <textarea
                            className="form-control "
                            name="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></textarea>
                          <button
                            onClick={async () => {
                              console.log(comment);
                              const token = await getAccessTokenSilently();
                              const r = await axios.post(
                                `/products/${id}/comments`,
                                {
                                  comment,
                                  email: user.email,
                                  ProductId: id,
                                },
                                {
                                  headers: {
                                    Authorization: `Bearer ${token}`,
                                  },
                                }
                              );
                              console.log(r);
                              toast.success(r.data.message);
                              await getAllCommnet();
                              setComment("");
                            }}
                            className="btn btn-secondary"
                          >
                            Enviar
                          </button>
                        </div>
                      ) : (
                        <p>Debes inicar seccion para comentar </p>
                      )}
                    </div>
                  </div>
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
