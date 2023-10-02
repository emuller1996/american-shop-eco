import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function CardProduct({ product, addProducToCart }) {
  return (
    <div className="col-md-4" data-aos="fade-up" data-aos-duration="3000">
      <Link
        className="card card-product mb-4 product-wap rounded-0 text-decoration-none h-100"
        to={`/ProductDetail/${product.id}`}
      >
        <div className="card  rounded-0 border-0">
          <Card.Img
            variant="top"
            src={
              product.Images[0] ? product.Images[0].url_image : product.image
            }
            style={{ maxWidth: "90%", minWidth: "100%", minHeight: "100%" }}
            className="img-product img-fluid w-50  mx-auto d-block p-3"
          />
          <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
            <ul className="list-unstyled">
              <li>
                <span className="btn btn-dark rounded-4 text-white">
                  <i className="fas fa-eye"></i>
                </span>
              </li>

              {/* <li onClick={(e, id) => addProducToCart(e, product.id)}>
                <span className="btn btn-dark text-white mt-2">
                  <i className="fas fa-cart-plus"></i>
                </span>
              </li> */}
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
            {product.Category.name}{" "}
          </p>
          <p className="text-center m-0 fs-6 placeholder-glow">
            {product.stock}
          </p>

          <ul className="list-unstyled d-flex justify-content-center mb-1">
            <li>
              {[1, 2, 3, 4, 5].map((n) => {
                if (n <= product.rating)
                  return <i key={n} className="text-warning fa fa-star"></i>;
                else return <i key={n} className="text-muted fa fa-star"></i>;
              })}
              {/* <i className="text-warning fa fa-star"></i>
                            <i className="text-warning fa fa-star"></i>
                            <i className="text-warning fa fa-star"></i>
                            <i className="text-muted fa fa-star"></i>
                            <i className="text-muted fa fa-star"></i> */}
            </li>
          </ul>
          <p className="text-center mb-0 text-danger fw-normal">
            $
            {`${product.price.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}`}
          </p>
        </div>
      </Link>
    </div>
  );
}
