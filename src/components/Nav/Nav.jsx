import React, { useEffect, useState } from 'react'
import { Dropdown, DropdownButton, Fade } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { setTotalCart } from '../../features/Car/carSlice'

export default function Nav() {

    const cartCount = useSelector(state => state.cart.totalCart);
    const [cart,setCart] = useLocalStorage("cart",[]);
    const dispatch = useDispatch();

    useEffect( ()=> {

        try {
            console.log(cart.length);
        dispatch(setTotalCart(cart.length))
        } catch (error) {
            console.log(error.message);
     
        }
        
    },[cart,dispatch])

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark navbar-light d-none d-lg-block" id="templatemo_nav_top">
                <div className="container text-light">
                    <div className="w-100 d-flex justify-content-between">
                        <div>
                            <i className="fa fa-envelope mx-2"></i>
                            <a className="navbar-sm-brand text-light text-decoration-none" href="mailto:info@company.com">americanshopbtura@gmail.com</a>
                            <i className="fa fa-phone mx-2"></i>
                            <a className="navbar-sm-brand text-light text-decoration-none" href="tel:010-020-0340">+57 3184612011</a>
                        </div>
                        <div>
                            <span className="text-light" target="_blank" rel="sponsored"><i className="fab fa-facebook-f fa-sm fa-fw me-2"></i></span>
                            <span className="text-light" target="_blank"><i className="fab fa-instagram fa-sm fa-fw me-2"></i></span>
                            <span className="text-light" target="_blank"><i className="fab fa-twitter fa-sm fa-fw me-2"></i></span>
                            <span className="text-light" ><i className="fab fa-linkedin fa-sm fa-fw"></i></span>
                        </div>
                    </div>
                </div>
            </nav>
            <nav className="navbar navbar-expand-lg navbar-light shadow">
                <div className="container d-flex justify-content-between align-items-center">

                    <Link className="navbar-brand text-success logo h1 align-self-center" to="/">
                        AmericanShop
                    </Link>

                    <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#templatemo_main_nav" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="align-self-center collapse navbar-collapse flex-fill  d-lg-flex justify-content-lg-between" id="templatemo_main_nav">
                        <div className="flex-fill">
                            <ul className="nav navbar-nav d-flex justify-content-between mx-lg-auto">
                                <li className="nav-item ">
                                    <NavLink to={'/'} activeClassName={'text-danger fw-semibold'} className="nav-link text-decoration-none" >Inicio</NavLink>
                                </li>
                                <li className="nav-item text-decoration-none">
                                    <NavLink to={'/About'} activeClassName={'text-danger fw-semibold'} className="nav-link" href="about.html">Sobre Nosotros</NavLink>
                                </li>
                                <li className="nav-item text-decoration-none">
                                    <NavLink to={'/Shop'} activeClassName={'text-danger fw-semibold'} className="nav-link" href="shop.html">Articulos</NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className="navbar align-self-center d-flex">
                            <div className="d-lg-none flex-sm-fill mt-3 mb-4 col-7 col-sm-auto pr-3">
                                <div className="input-group">
                                    <input type="text" className="form-control" id="inputMobileSearch" placeholder="Search ..." />
                                    <div className="input-group-text">
                                        <i className="fa fa-fw fa-search"></i>
                                    </div>
                                </div>
                            </div>
                            {/* <a className="nav-icon d-none d-lg-inline" href='/'  data-bs-toggle="modal" data-bs-target="#templatemo_search" >
                                <i className="fa fa-fw fa-search text-dark mr-2"></i>
                            </a> */}
                            <Link className="nav-icon position-relative text-decoration-none" to={'/MyCart'}>
                                <i className="fa fa-fw fa-cart-arrow-down text-dark mr-1"></i>
                                <span className="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">{cartCount}</span>
                            </Link>


                            <Dropdown>
                                <Dropdown.Toggle variant="white" id="dropdown-basic" 
                                >
                                    <i className="fa fa-fw fa-user text-dark mr-3" ></i>
                                </Dropdown.Toggle>                           
                                    <Dropdown.Menu id="example-fade-text">
                                        <Dropdown.Item href="#/action-1">Mi Perfil</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2"><Link to={"/Dashboard"}>Dasboard</Link></Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">cs</Dropdown.Item>
                                    </Dropdown.Menu>                              
                            </Dropdown>


                        </div>
                    </div>

                </div>
            </nav>
        </>
    )
}