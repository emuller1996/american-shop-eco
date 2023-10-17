import React from 'react'

export default function BannerCategoryMoth() {



    return (
        <>
            <section className=" bg-nuevos-productos">
                <div className="container py-5">
                    <div className="row text-center py-3">
                        <div className="col-lg-6 m-auto">
                            <h1 className="h1">Producto Nuevos</h1>
                            <p>
                                Mira nuestro ultimos catalogo de los nuevos modelos de jordan, nike, adidas y brooklyn que hemos han llegado a nuestas tiendas.
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-4 mb-4">
                            <div className="card card-nuevos-american h-100">
                                <a href="shop-single.html">
                                    <img src="./assets/img/feature_prod_01.jpg" className="card-img-top" alt="..."/>
                                </a>
                                <div className="card-body card-body-nuevos-american">
                                    <ul className="list-unstyled d-flex justify-content-between">
                                        {/* <li>
                                            <i className="text-warning fa fa-star"></i>
                                            <i className="text-warning fa fa-star"></i>
                                            <i className="text-warning fa fa-star"></i>
                                            <i className="text-muted fa fa-star"></i>
                                            <i className="text-muted fa fa-star"></i>
                                        </li> */}
                                        <li className="text-dark fs-4 m-0 p-0 text-right">$240.00</li>
                                    </ul>
                                    <a href="shop-single.html" className="h2 text-decoration-none text-dark">Gym Weight</a>
                                    <p className="card-text">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt in culpa qui officia deserunt.
                                    </p>
                                    <p className="text-dark">2 Dias</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4 mb-4">
                            <div className="card card-nuevos-american h-100">
                                <a href="shop-single.html">
                                    <img src="./assets/img/feature_prod_02.jpg" className="card-img-top" alt="..."/>
                                </a>
                                <div className="card-body card-body-nuevos-american">
                                    <ul className="list-unstyled d-flex justify-content-between">
                                        {/* <li>
                                            <i className="text-warning fa fa-star"></i>
                                            <i className="text-warning fa fa-star"></i>
                                            <i className="text-warning fa fa-star"></i>
                                            <i className="text-muted fa fa-star"></i>
                                            <i className="text-muted fa fa-star"></i>
                                        </li> */}
                                        <li className="text-dark fs-4 m-0 p-0 text-right">$240.00</li>
                                    </ul>
                                    <a href="shop-single.html" className="h2 text-decoration-none text-dark">Gym Weight</a>
                                    <p className="card-text">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt in culpa qui officia deserunt.
                                    </p>
                                    <p className="text-dark">2 Dias</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4 mb-4">
                            <div className="card card-nuevos-american h-100">
                                <a href="shop-single.html">
                                    <img src="./assets/img/feature_prod_03.jpg" className="card-img-top" alt="..."/>
                                </a>
                                <div className="card-body card-body-nuevos-american">
                                    <ul className="list-unstyled d-flex justify-content-between">
                                        {/* <li>
                                            <i className="text-warning fa fa-star"></i>
                                            <i className="text-warning fa fa-star"></i>
                                            <i className="text-warning fa fa-star"></i>
                                            <i className="text-muted fa fa-star"></i>
                                            <i className="text-muted fa fa-star"></i>
                                        </li> */}
                                        <li className="text-dark fs-4 m-0 p-0 text-right">$240.00</li>
                                    </ul>
                                    <a href="shop-single.html" className="h2 text-decoration-none text-dark">Gym Weight</a>
                                    <p className="card-text">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt in culpa qui officia deserunt.
                                    </p>
                                    <p className="text-dark">2 Dias</p>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>

        </>
    )
}