import React, { useState, useEffect } from "react";
import CardProduct from "./CardProduct";
import axios from "axios";
import ReactPaginate from "react-paginate";
import FilterProducts from "./FilterProducts";
import "./index.css";
import { addProductToCart } from "../../features/Car/carSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import SpinnerComponent from "../../components/Spinner";
import {
  SetProducts,
  setCategory,
  setPage,
  setTotalPages,
} from "../../features/Products/ProductSlice";

export default function Shop() {
  const protuctosTodos = useSelector((state) => state.products.products);
  const page = useSelector((state) => state.products.page);
  const category = useSelector((state) => state.products.category);
  const totalPages = useSelector((state) => state.products.totalPages);

  const [productsAll, setProductsAll] = useState();
  const [categories, setCategories] = useState();
  const [size] = useState(3);
  /* const [page, setPage] = useState(); */
  /* const [total, setTotal] = useState(); */
  const [isLoading, setIsLoading] = useState(false);

  const [search, setSearch] = useState("");
  /*  const [categoryFilter, setCategoryFilter] = useState(""); */

  const { getAccessTokenSilently } = useAuth0();

  const [error, setError] = useState(undefined);

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addProducToCart = (e, id) => {
    e.preventDefault();
    dispatch(addProductToCart({ id: id, cant: 1 }));
    console.log(cart);
  };

  useEffect(() => {
    getProductAll(size, page, search, category);

    getCategoryAll();
  }, [size, page, search, totalPages, category]);

  const handlePageClick = (event) => {
    dispatch(setPage(event.selected));
  };

  const getCategoryAll = async () => {
    const result = await axios.get("/category");
    setCategories(result.data);
  };

  const getProductAll = async (size, page, search, categoryFilter) => {
    setError(undefined);
    setIsLoading(true);
    try {
      var token = await getAccessTokenSilently();
    } catch (error) {
      console.log(error);
    }

    try {
      const result = await axios.get(
        `/products/published?size=${size}&page=${page}&search=${search}&cat=${categoryFilter}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProductsAll(result.data.products);
      dispatch(SetProducts(result.data.products));
      if (result.data.totalPages < totalPages) {
        dispatch(setPage(0));
      }
      dispatch(setTotalPages(result.data.totalPages));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      console.log(error);
      setError(`${error?.code}  ::  ${error?.message}`);
    }
  };

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  return (
    <>
      {/* <!-- Start Content --> */}
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-3">
            <FilterProducts
              categories={categories}
              setCategoryFilter={dispatch(setCategory)}
            />
          </div>

          <div className="col-lg-9">
            <div className="row  justify-content-center">
              {/* <div className="col-md-6">
                <ul className="list-inline shop-top-menu pb-3 pt-1">
                  <li className="list-inline-item">
                    <a
                      className="h3 text-dark text-decoration-none mr-3"
                      href="/"
                    >
                      All
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      className="h3 text-dark text-decoration-none mr-3"
                      href="/"
                    >
                      Men's
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a className="h3 text-dark text-decoration-none" href="/">
                      Women's
                    </a>
                  </li>
                </ul>
              </div> */}
              <div className="col-md-6 py-3 align-self-center">
                <div className="d-flex">
                  <input
                    type="text"
                    className=" input-search-producto"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Buscar Producto"
                  />
                </div>
              </div>
            </div>
            <div className="row g-3 justify-content-center mb-4" style={{ minHeight:"50vh" }}>
              {error && (
                <div class="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {productsAll && !isLoading && productsAll.length === 0 && (
                <p className="text-center py-2"> No hay Productos Encontrados </p>
              )}
              {!isLoading ? (
                protuctosTodos.map((p) => (
                  <CardProduct
                    addProducToCart={addProducToCart}
                    key={p.id}
                    product={p}
                  />
                ))
              ) : (
                <SpinnerComponent />
              )}
              {/* {isLoading && <SpinnerComponent />} */}
            </div>
            <div div="row">
              <ReactPaginate
                forcePage={page}
                breakLabel="..."
                breakLinkClassName="page-link "
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={1}
                marginPagesDisplayed={2}
                pageCount={totalPages !== 0 ? totalPages : 1}
                previousLabel="<"
                /* renderOnZeroPageCount={1} */
                className="pagination  justify-content-end"
                pageClassName="page-item "
                pageLinkClassName="page-link"
                activeLinkClassName=" page-link active "
                activeClassName="page-item disabled"
                previousClassName="page-item"
                nextClassName="page-item"
                previousLinkClassName="page-link"
                nextLinkClassName="page-link"
              />
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
              <h1 className="h1">Nuestras Marcas</h1>
              {/*  <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                Lorem ipsum dolor sit amet.
                            </p> */}
            </div>
            <div className="col-lg-9 m-auto tempaltemo-carousel">
              <div className="row d-flex flex-row">
                {/* <!--Controls--> */}
                <div className="col-1 align-self-center">
                  <a
                    className="h1"
                    href="#multi-item-example"
                    role="button"
                    data-bs-slide="prev"
                  >
                    <i className="text-light fas fa-chevron-left"></i>
                  </a>
                </div>
                {/* <!--End Controls--> */}

                {/* <!--Carousel Wrapper--> */}
                <div className="col">
                  <div
                    className="carousel slide carousel-multi-item pt-2 pt-md-0"
                    id="multi-item-example"
                    data-bs-ride="carousel"
                  >
                    {/* <!--Slides--> */}
                    <div
                      className="carousel-inner product-links-wap"
                      role="listbox"
                    >
                      {/* <!--First slide--> */}
                      <div className="carousel-item active">
                        <div className="row">
                          <div className="col-3 p-md-5">
                            <a href="/">
                              <img
                                className="img-fluid brand-img"
                                src="assets/img/brand_01.png"
                                alt="Brand Logo"
                              />
                            </a>
                          </div>
                          <div className="col-3 p-md-5">
                            <a href="/">
                              <img
                                className="img-fluid brand-img"
                                src="assets/img/brand_02.png"
                                alt="Brand Logo"
                              />
                            </a>
                          </div>
                          <div className="col-3 p-md-5">
                            <a href="/">
                              <img
                                className="img-fluid brand-img"
                                src="assets/img/brand_03.png"
                                alt="Brand Logo"
                              />
                            </a>
                          </div>
                          <div className="col-3 p-md-5">
                            <a href="/">
                              <img
                                className="img-fluid brand-img"
                                src="assets/img/brand_04.png"
                                alt="Brand Logo"
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                      {/* <!--End First slide--> */}

                      {/* <!--Second slide--> */}
                      <div className="carousel-item">
                        <div className="row">
                          <div className="col-3 p-md-5">
                            <a href="/">
                              <img
                                className="img-fluid brand-img"
                                src="assets/img/brand_01.png"
                                alt="Brand Logo"
                              />
                            </a>
                          </div>
                          <div className="col-3 p-md-5">
                            <a href="/">
                              <img
                                className="img-fluid brand-img"
                                src="assets/img/brand_02.png"
                                alt="Brand Logo"
                              />
                            </a>
                          </div>
                          <div className="col-3 p-md-5">
                            <a href="/">
                              <img
                                className="img-fluid brand-img"
                                src="assets/img/brand_03.png"
                                alt="Brand Logo"
                              />
                            </a>
                          </div>
                          <div className="col-3 p-md-5">
                            <a href="/">
                              <img
                                className="img-fluid brand-img"
                                src="assets/img/brand_04.png"
                                alt="Brand Logo"
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                      {/* <!--End Second slide--> */}

                      {/* <!--Third slide--> */}
                      <div className="carousel-item">
                        <div className="row">
                          <div className="col-3 p-md-5">
                            <a href="/">
                              <img
                                className="img-fluid brand-img"
                                src="assets/img/brand_01.png"
                                alt="Brand Logo"
                              />
                            </a>
                          </div>
                          <div className="col-3 p-md-5">
                            <a href="/">
                              <img
                                className="img-fluid brand-img"
                                src="assets/img/brand_02.png"
                                alt="Brand Logo"
                              />
                            </a>
                          </div>
                          /
                          <div className="col-3 p-md-5">
                            <a href="/">
                              <img
                                className="img-fluid brand-img"
                                src="assets/img/brand_03.png"
                                alt="Brand Logo"
                              />
                            </a>
                          </div>
                          <div className="col-3 p-md-5">
                            <a href="/">
                              <img
                                className="img-fluid brand-img"
                                src="assets/img/brand_04.png"
                                alt="Brand Logo"
                              />
                            </a>
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
                  <a
                    className="h1"
                    href="#multi-item-example"
                    role="button"
                    data-bs-slide="next"
                  >
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
  );
}
