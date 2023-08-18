import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import MyOrderComponent from "../components/Dashboard/MyOrder";
import MyProfileComponent from "../components/Dashboard/MyProfile/MyProfile";
import DropdownProfile from "../components/Nav/DropdownProfile";

export default function DasboardTemplate() {
  return (
    <>
      
      <nav class="navbar navbar-expand-lg shadow">
        <div class="container">
          <Link
            to={"/"}
            className="d-flex align-items-center text-decoration-none"
          >
            <div className="">
              <img
                width={"50px"}
                src="/assets/img/Logo.png"
                alt="logo"
                srcset=""
              />
            </div>
            <p className="ms-3 text-uppercase text-danger fs-1">AmericanShop</p>
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
              <li class="nav-item">
              <NavLink
                    to={"/Dashboard/MyProfile"}
                    activeClassName={"text-danger fw-semibold"}
                    className="nav-link text-decoration-none"
                  >
                    <i className="far fa-user me-2"></i>
                    Mi Perfil
                  </NavLink>
              </li>
              <li class="nav-item">
              <NavLink
                    to={"/Dashboard/MyOrders"}
                    activeClassName={"text-danger fw-semibold"}
                    className="nav-link"
                    href="about.html"
                  >
                    <i className="fas fa-space-shuttle me-2"></i>
                    Mis Pedidos
                  </NavLink>
              </li>
              <li class="nav-item">
              <NavLink
                    to={"/Dashboard/MyFavorites"}
                    activeClassName={"text-danger fw-semibold"}
                    className="nav-link"
                    href="shop.html"
                  >
                    <i class="fas fa-heart me-2"></i>
                    Mis Favoritos
                  </NavLink>
              </li>
              <li class="nav-item text-center">
              <DropdownProfile />
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <div className="card rounded-3 shadow ">
          <div className="card-body">
            <Switch>
              <Route strict path={"/Dashboard/MyProfile"}>
                <MyProfileComponent />
              </Route>

              <Route strict path={"/Dashboard/MyOrders"}>
                <MyOrderComponent />
              </Route>

              <Route strict path={"/Dashboard/MyFavorites"}>
                <h2> MY Favorites</h2>
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
}
