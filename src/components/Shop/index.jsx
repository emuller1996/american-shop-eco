import React, { useState, useEffect } from 'react';
import CardProduct from './CardProduct';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import FilterProducts from './FilterProducts';
import './index.css'
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { setCart as setCartR } from '../../features/Car/carSlice'
import { useDispatch } from 'react-redux';

export default function Shop() {

    const [productsAll, setProductsAll] = useState([]);
    const [categories, setCategories] = useState();
    const [size] = useState(6);
    const [page, setPage] = useState();
    const [total, setTotal] = useState();
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [cart,setCart] = useLocalStorage("cart",[]);

    const dispatch = useDispatch();
   

   
    const addProducToCart = (e, id) => {
        e.preventDefault();
        /* console.log(cartGlobal); */
               
        const exist = cart.find(i => i === id)
        console.log(exist)
        if (!exist) {
            setCart([...cart, id])
            //dispatch(setCartR(cart))
        } else {
            alert('Cart already exists')
        }

        console.log(cart); 
        

    }


    useEffect(() => {
        getProductAll(size, page, search, categoryFilter)

        getCategoryAll();
    }, [size, page, search, total, categoryFilter])

    const handlePageClick = (event) => {
            setPage(event.selected)            
    };

    const getCategoryAll = async () => {
        const result = await axios.get('http://192.168.0.25:3001/category');
        setCategories(result.data)
    }

    const getProductAll = async (size, page, search, categoryFilter) => {
        try {
            const result = await axios.get(`http://192.168.0.25:3001/products?size=${size}&page=${page}&search=${search}&cat=${categoryFilter}`);
            setProductsAll(result.data.products);
            
            setTotal(result.data.totalPages)
            console.log(result.data);

        } catch (error) {
            console.error(error);

        }

    }


    function handleSearch(e) {

        setSearch(e.target.value)
    }

    return (
        <>
            {/* <!-- Start Content --> */}
            <div className="container py-5">
                <div className="row">

                    <div className="col-lg-3">





                        <FilterProducts categories={categories} setCategoryFilter={setCategoryFilter} />

                        {/* <ul className="list-unstyled templatemo-accordion accordion">
                            <li className="pb-3">
                                <a className="collapsed d-flex justify-content-between h3 text-decoration-none" href="/">
                                    Gender
                                    <i className="fa fa-fw fa-chevron-circle-down mt-1"></i>
                                </a>
                                <ul className="collapse show list-unstyled pl-3">
                                    <li><a className="text-decoration-none" href="/">Men</a></li>
                                    <li><a className="text-decoration-none" href="/">Women</a></li>
                                </ul>
                            </li>
                            <li className="pb-3">
                                <a className="collapsed d-flex justify-content-between h3 text-decoration-none" href="/">
                                    Sale
                                    <i className="pull-right fa fa-fw fa-chevron-circle-down mt-1"></i>
                                </a>
                                <ul id="collapseTwo" className="collapse list-unstyled pl-3">
                                    <li><a className="text-decoration-none" href="/">Sport</a></li>
                                    <li><a className="text-decoration-none" href="/">Luxury</a></li>
                                </ul>
                            </li>
                            <li className="pb-3">
                                <a className="collapsed d-flex justify-content-between h3 text-decoration-none" href="/">
                                    Product
                                    <i className="pull-right fa fa-fw fa-chevron-circle-down mt-1"></i>
                                </a>
                                <ul id="collapseThree" className="collapse list-unstyled pl-3">
                                    <li><a className="text-decoration-none" href="/">Bag</a></li>
                                    <li><a className="text-decoration-none" href="/">Sweather</a></li>
                                    <li><a className="text-decoration-none" href="/">Sunglass</a></li>
                                </ul>
                            </li>
                        </ul> */}
                    </div>

                    <div className="col-lg-9">
                        <div className="row">
                            <div className="col-md-6">
                                <ul className="list-inline shop-top-menu pb-3 pt-1">
                                    <li className="list-inline-item">
                                        <a className="h3 text-dark text-decoration-none mr-3" href="/">All</a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a className="h3 text-dark text-decoration-none mr-3" href="/">Men's</a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a className="h3 text-dark text-decoration-none" href="/">Women's</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-6 pb-4">
                                <div className="d-flex">
                                    <input type="text" className="form-control input-search-producto" value={search} onChange={handleSearch} placeholder='Search a product' />
                                </div>
                            </div>
                        </div>
                        <div className="row g-3 mb-4">

                            {productsAll && productsAll.length === 0 && <p> No products found</p>}
                            {
                                productsAll || productsAll.length !== 0 ? productsAll.map(p => <CardProduct addProducToCart={addProducToCart} key={p.id} product={p} />) : (<p>sada</p>)
                            }


                        </div>
                        <div div="row">

                            <ReactPaginate
                                initialPage={0}
                                breakLabel="..."
                                breakLinkClassName='page-link rounded-0 mr-3 shadow-sm border-top-0 border-left-0 text-dark fw-semibold'
                                nextLabel=">"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={2}
                                pageCount={total !== 0 ? total : 1}
                                previousLabel="<"
                                renderOnZeroPageCount={1}
                                className="pagination pagination-lg justify-content-end"
                                pageClassName="page-item "
                                pageLinkClassName="page-link page-link rounded-0 mr-3 shadow-sm border-top-0 border-left-0 text-dark fw-semibold"
                                activeLinkClassName="active rounded-0 mr-3 shadow-sm border-top-0 border-left-0"
                                activeClassName="page-item disabled"
                                previousClassName="page-item"
                                nextClassName="page-item"
                                previousLinkClassName="page-link rounded-0 mr-3 shadow-sm border-top-0 border-left-0 text-dark fw-semibold"
                                nextLinkClassName="page-link rounded-0 mr-3 shadow-sm border-top-0 border-left-0 text-dark fw-semibold"
                            />
                            {/* <ul className="pagination pagination-lg justify-content-end">
                                <li className="page-item disabled">
                                    <a className="page-link active rounded-0 mr-3 shadow-sm border-top-0 border-left-0" href="/" tabIndex="-1">1</a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link rounded-0 mr-3 shadow-sm border-top-0 border-left-0 text-dark" href="/">2</a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link rounded-0 shadow-sm border-top-0 border-left-0 text-dark" href="/">3</a>
                                </li>
                            </ul> */}
                        </div>
                    </div>

                </div>
            </div>
            {/* <!-- End Content --> */}

            {/*  <!-- Start Brands --> */}
            <section className="bg-light py-5">
                <div className="container my-4">
                    <div className="row text-center py-3">
                        <div className="col-lg-6 m-auto">
                            <h1 className="h1">Our Brands</h1>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                Lorem ipsum dolor sit amet.
                            </p>
                        </div>
                        <div className="col-lg-9 m-auto tempaltemo-carousel">
                            <div className="row d-flex flex-row">
                                {/* <!--Controls--> */}
                                <div className="col-1 align-self-center">
                                    <a className="h1" href="#multi-item-example" role="button" data-bs-slide="prev">
                                        <i className="text-light fas fa-chevron-left"></i>
                                    </a>
                                </div>
                                {/* <!--End Controls--> */}

                                {/* <!--Carousel Wrapper--> */}
                                <div className="col">
                                    <div className="carousel slide carousel-multi-item pt-2 pt-md-0" id="multi-item-example" data-bs-ride="carousel">
                                        {/* <!--Slides--> */}
                                        <div className="carousel-inner product-links-wap" role="listbox">

                                            {/* <!--First slide--> */}
                                            <div className="carousel-item active">
                                                <div className="row">
                                                    <div className="col-3 p-md-5">
                                                        <a href="/"><img className="img-fluid brand-img" src="assets/img/brand_01.png" alt="Brand Logo" /></a>
                                                    </div>
                                                    <div className="col-3 p-md-5">
                                                        <a href="/"><img className="img-fluid brand-img" src="assets/img/brand_02.png" alt="Brand Logo" /></a>
                                                    </div>
                                                    <div className="col-3 p-md-5">
                                                        <a href="/"><img className="img-fluid brand-img" src="assets/img/brand_03.png" alt="Brand Logo" /></a>
                                                    </div>
                                                    <div className="col-3 p-md-5">
                                                        <a href="/"><img className="img-fluid brand-img" src="assets/img/brand_04.png" alt="Brand Logo" /></a>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!--End First slide--> */}

                                            {/* <!--Second slide--> */}
                                            <div className="carousel-item">
                                                <div className="row">
                                                    <div className="col-3 p-md-5">
                                                        <a href="/"><img className="img-fluid brand-img" src="assets/img/brand_01.png" alt="Brand Logo" /></a>
                                                    </div>
                                                    <div className="col-3 p-md-5">
                                                        <a href="/"><img className="img-fluid brand-img" src="assets/img/brand_02.png" alt="Brand Logo" /></a>
                                                    </div>
                                                    <div className="col-3 p-md-5">
                                                        <a href="/"><img className="img-fluid brand-img" src="assets/img/brand_03.png" alt="Brand Logo" /></a>
                                                    </div>
                                                    <div className="col-3 p-md-5">
                                                        <a href="/"><img className="img-fluid brand-img" src="assets/img/brand_04.png" alt="Brand Logo" /></a>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!--End Second slide--> */}

                                            {/* <!--Third slide--> */}
                                            <div className="carousel-item">
                                                <div className="row">
                                                    <div className="col-3 p-md-5">
                                                        <a href="/"><img className="img-fluid brand-img" src="assets/img/brand_01.png" alt="Brand Logo" /></a>
                                                    </div>
                                                    <div className="col-3 p-md-5">
                                                        <a href="/"><img className="img-fluid brand-img" src="assets/img/brand_02.png" alt="Brand Logo" /></a>
                                                    </div>/
                                                    <div className="col-3 p-md-5">
                                                        <a href="/"><img className="img-fluid brand-img" src="assets/img/brand_03.png" alt="Brand Logo" /></a>
                                                    </div>
                                                    <div className="col-3 p-md-5">
                                                        <a href="/"><img className="img-fluid brand-img" src="assets/img/brand_04.png" alt="Brand Logo" /></a>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!--End Third slide--> */}

                                        </div>
                                        {/*  <!--End Slides--> */}
                                    </div>
                                </div>
                                {/* <!--End Carousel Wrapper--> */}

                                {/* <!--Controls--> */}
                                <div className="col-1 align-self-center">
                                    <a className="h1" href="#multi-item-example" role="button" data-bs-slide="next">
                                        <i className="text-light fas fa-chevron-right"></i>
                                    </a>
                                </div>
                                {/* <!--End Controls--> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!--End Brands--> */}
        </>
    )
}