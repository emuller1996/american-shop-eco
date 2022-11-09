import React from 'react';
import { Link } from 'react-router-dom';

export default function CardProduct({ product }) {


    return (
        <div className="col-md-4">
            <Link className="card mb-4 product-wap rounded-0 text-decoration-none " to={`/ProductDetail/${product.id}`}>
                <div className="card rounded-0" style={ { height:'15em'} }>
                    <img className="card-img rounded-0 img-fluid" style={ {  maxWidth :'80%', minWidth : '90%' , maxHeight :'80%', minHeight : '90%' } } src={product.image} alt='IMG_PRODUCT' />
                    <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                        <ul className="list-unstyled">
                            <li><a className="btn btn-success text-white" href="shop-single.html"><i className="far fa-heart"></i></a></li>
                            {/* <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="far fa-eye"></i></a></li> */}
                            <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="fas fa-cart-plus"></i></a></li>
                        </ul>
                    </div>
                </div>
                <div className="card-body ">
                    <p  className="text-dark fw-semibold fs-4 text-decoration-none">{product.name}</p>
                    
                    <p className='text-center m-0 fs-6 text-danger fw-normal'>{product.brand}</p>

                    <p className='text-center m-0 fs-6 '>{product.CategoryId}</p>
                    <ul className="list-unstyled d-flex justify-content-center mb-1">
                        <li>
                            {                           
                                [1,2,3,4,5].map( (n) => {
                                    if(n <= product.rating) return <i key={n} className="text-warning fa fa-star"></i>
                                    else return <i key={n} className="text-muted fa fa-star"></i>
                                } )
                            }
                            {/* <i className="text-warning fa fa-star"></i>
                            <i className="text-warning fa fa-star"></i>
                            <i className="text-warning fa fa-star"></i>
                            <i className="text-muted fa fa-star"></i>
                            <i className="text-muted fa fa-star"></i> */}
                        </li>
                    </ul>
                    <p className="text-center mb-0 text-danger fw-normal">${`${product.price}`}.00</p>
                </div>
            </Link>
        </div>
    )
}