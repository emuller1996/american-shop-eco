import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

import Login from "./Login";
import { useAuth0 } from "@auth0/auth0-react";
import DropdownProfile from "./DropdownProfile";
import { getCardProductToCard } from "../../features/Car/carSlice";

export default function Nav() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    dispatch(getCardProductToCard());
  }, []);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-dark navbar-light d-none d-lg-block"
        id="templatemo_nav_top"
      >
        <div className="container text-light">
          <div className="w-100 d-flex justify-content-between">
            <div>
              <i className="fa fa-envelope mx-2"></i>
              <a
                className="navbar-sm-brand text-light text-decoration-none m-0"
                href="mailto:info@company.com"
              >
                americanshopbtura@gmail.com
              </a>
              <i className="fa fa-phone mx-2"></i>
              <a
                className="navbar-sm-brand text-light text-decoration-none"
                href="tel:010-020-0340"
              >
                +57 3184612011
              </a>
            </div>
            <div>
              <span className="text-light" target="_blank" rel="sponsored">
                <i className="fab fa-facebook-f fa-sm fa-fw me-2"></i>
              </span>
              <span className="text-light" target="_blank">
                <i className="fab fa-instagram fa-sm fa-fw me-2"></i>
              </span>
              <span className="text-light" target="_blank">
                <i className="fab fa-twitter fa-sm fa-fw me-2"></i>
              </span>
              <span className="text-light">
                <i className="fab fa-linkedin fa-sm fa-fw"></i>
              </span>
            </div>
          </div>
        </div>
      </nav>

      <nav class="navbar navbar-expand-lg  nav-bar-american">
        <div class="container">
          <Link
            className="navbar-brand text-success logo h1 align-self-center m-0"
            to="/"
          >
            <div className="d-flex align-items-center">
              <div className="">
                <img
                  width={"50px"}
                  src="/assets/img/Logo.png"
                  alt="logo"
                  srcset=""
                />
              </div>
              <span className="ms-3 h4 text-uppercase m-0 ">AmericanShop</span>
            </div>
          </Link>

          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav   ms-auto ">
              <li class="nav-item">
                <NavLink
                  exact
                  to={"/"}
                  activeClassName={"text-danger fw-semibold"}
                  className="nav-link text-decoration-none"
                >
                  Inicio
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink
                  to={"/nosotros"}
                  activeClassName={"text-danger fw-semibold"}
                  className="nav-link"
                  href="about.html"
                >
                  Nosotros
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink
                  to={"/articulos"}
                  activeClassName={"text-danger fw-semibold"}
                  className="nav-link"
                  href="shop.html"
                >
                  Articulos
                </NavLink>
              </li>
              <li class="nav-item text-center ms-3 py-2">
                <Link
                  className="nav-icon position-relative text-decoration-none"
                  to={"/mi-carrito"}
                >
                  <i className="fa fa-fw fa-cart-arrow-down text-dark mr-1"></i>
                  <span className="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">
                    {cart.length}
                  </span>
                </Link>
              </li>
              <li class="nav-item text-center ms-3 ">
                {isAuthenticated ? <DropdownProfile /> : <Login />}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
