import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MostrarPesoCOP } from "../../utils";

export default function CardProduct({ product, addProducToCart }) {
  return (
    <div className="col-md-4" data-aos="fade-out" data-aos-duration="300">
      {/* <Link
        className="card card-product mb-4 product-wap rounded-0 text-decoration-none h-100"
        to={`/articulo/${product.id}`}
      >
        <div className="card  rounded-0 border-0">
          <Card.Img
            variant="top"
            src={
              product.image
                ? product.image
                : "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
            }
            className=" img-fluid mx-auto d-block"
          />
          <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
            <ul className="list-unstyled">
              <li>
                <span
                  title="Vista Rapida"
                  className="btn btn-light rounded-4 text-danger"
                >
                  <i className="fas fa-eye"></i>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="card-body ">
          <p className="text-dark fw-semibold fs-4 text-decoration-none">
            {product.name}
          </p>

          <p className="text-center m-0 fs-6 text-danger fw-normal">
            {product.brand}
          </p>

          <p className="text-center m-0 fs-6 placeholder-glow">
            {product.Category.name}
          </p>
          <p className="text-center mb-0 text-danger fw-normal">
            $
            {`${product.price.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}`}
          </p>
        </div>
      </Link> */}
      <Link to={`/articulo/${product.id}`} class="card card_pro">
        <div class="image">
          <img
            height={"400px"}
            className="img-product"
            src={
              product.image
                ? product.image
                : "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
            }
            alt=""
          />
        </div>
        <div class="text">
          <span>{product.name}</span>
          <p className="m-0">{MostrarPesoCOP(product.price)}</p>
          <div className="text_brand "> {product.Category.name}</div>
          <div className="text_brand_category "> {product.brand}</div>
        </div>
      </Link>
    </div>
  );
}
