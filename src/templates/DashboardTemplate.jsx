import React from 'react';
import { Link, NavLink } from "react-router-dom";
import { Switch, Route } from 'react-router-dom';
import MyProfileComponent from '../components/Dashboard/MyProfile/MyProfile';
import DropdownProfile from '../components/Nav/DropdownProfile'

export default function DasboardTemplate() {



    return (
        <>
        <nav
        className="navbar navbar-expand-lg bg-dark navbar-light d-none d-lg-block"
        id="templatemo_nav_top"
      >
        
        <div className="container text-light">
        <div className="d-flex align-items-center">
              <Link 
              to={'/'}
              className="d-flex align-items-center text-decoration-none"  >
              <div className="">
                <img
                  width={"50px"}
                  src="/assets/img/Logo.png"
                  alt="logo"
                  srcset=""
                />
              </div>
              <p className="ms-3 text-uppercase text-white fs-1">AmericanShop</p>
              </Link>
            </div>  
          <div className="w-100 d-flex justify-content-center">
            
            <div>
              {/* <DropdownProfile/> */}
            </div>


          </div>
        </div>
      </nav>

      <nav className="navbar navbar-expand-lg navbar-light shadow">
        <div className="container d-flex justify-content-between align-items-center">
          <Link
            className="navbar-brand text-success logo h1 align-self-center"
            to="/"
          >
            
          </Link>

          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#templatemo_main_nav"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="align-self-center collapse navbar-collapse flex-fill  d-lg-flex justify-content-lg-between"
            id="templatemo_main_nav"
          >
            <div className="flex-fill">
              <ul className="nav navbar-nav d-flex justify-content-between mx-lg-auto">
                <li className="nav-item ">
                  <NavLink
                    to={"/Dashboard/MyProfile"}
                    activeClassName={"text-danger fw-semibold"}
                    className="nav-link text-decoration-none"
                  >
                    Mi Perfil   
                  </NavLink>
                </li>
                <li className="nav-item text-decoration-none">
                  <NavLink
                    to={"/Dashboard/MyOrders"}
                    activeClassName={"text-danger fw-semibold"}
                    className="nav-link"
                    href="about.html"
                  >
                    Mis Pedidos
                  </NavLink>
                </li>
                <li className="nav-item text-decoration-none">
                  <NavLink
                    to={"/Dashboard/MyFavorites"}
                    activeClassName={"text-danger fw-semibold"}
                    className="nav-link"
                    href="shop.html"
                  >
                    Mis Favoritos
                  </NavLink>
                </li>
              </ul>
            </div>

            <DropdownProfile/>
            <div className="navbar align-self-center d-flex">
              <div className="d-lg-none flex-sm-fill mt-3 mb-4 col-7 col-sm-auto pr-3">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    id="inputMobileSearch"
                    placeholder="Search ..."
                  />
                  <div className="input-group-text">
                    <i className="fa fa-fw fa-search"></i>
                  </div>
                </div>
              </div>
              

              

              
            </div>
          </div>
        </div>
      </nav>




      <div className='container mt-4'>

        <div className="card rounded-3 shadow ">
            <div className="card-body">
            <Switch>

                <Route strict  path={'/Dashboard/MyProfile'}>
                    <MyProfileComponent />
                </Route>

                <Route strict  path={'/Dashboard/MyOrders'}>
                    <h2> MY Orders</h2>
                </Route>

                <Route strict  path={'/Dashboard/MyFavorites'}>
                    <h2> MY Favorites</h2>
                </Route>

            </Switch>
                

            </div>
        </div>

      </div>
        
        </>
    )
}