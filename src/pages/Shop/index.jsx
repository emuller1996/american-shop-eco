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

export default function Shop() {
  const [productsAll, setProductsAll] = useState();
  const [categories, setCategories] = useState();
  const [size] = useState(6);
  const [page, setPage] = useState();
  const [total, setTotal] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

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
    getProductAll(size, page, search, categoryFilter);

    getCategoryAll();
  }, [size, page, search, total, categoryFilter]);

  const handlePageClick = (event) => {
    setPage(event.selected);
  };

  const getCategoryAll = async () => {
    const result = await axios.get("/category");
    setCategories(result.data);
  };

  const getProductAll = async (size, page, search, categoryFilter) => {
    setError(undefined);
    setIsLoading(true)
    try {
      
      var token = await getAccessTokenSilently();
    } catch (error) {
      console.log(error);
    }

    try {

      console.log(token);
      const result = await axios.get(
        `/products/published?size=${size}&page=${page}&search=${search}&cat=${categoryFilter}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProductsAll(result.data.products);
      setIsLoading(false)

      setTotal(result.data.totalPages);
      console.log(result.data);
    } catch (error) {
      setIsLoading(false)

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
              setCategoryFilter={setCategoryFilter}
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
            <div className="row g-3 mb-4">
              {error && (
                <div class="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {productsAll && productsAll.length === 0 && (
                <p> No products found</p>
              )}
              {productsAll &&
                productsAll.map((p) => (
                  <CardProduct
                    addProducToCart={addProducToCart}
                    key={p.id}
                    product={p}
                  />
                ))}
              {isLoading && <SpinnerComponent />}
            </div>
            <div div="row">
              <ReactPaginate
                initialPage={0}
                breakLabel="..."
                breakLinkClassName="page-link rounded-3 mr-3 shadow-sm border-top-0 border-left-0 text-dark fw-semibold"
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={total !== 0 ? total : 1}
                previousLabel="<"
                renderOnZeroPageCount={1}
                className="pagination pagination-lg justify-content-end"
                pageClassName="page-item "
                pageLinkClassName="page-link page-link rounded-3 mr-3 shadow-sm border-top-0 border-left-0 text-dark fw-semibold"
                activeLinkClassName="active rounded mr-3 shadow-sm border-top-0 border-left-0"
                activeClassName="page-item disabled"
                previousClassName="page-item"
                nextClassName="page-item"
                previousLinkClassName="page-link rounded-3 mr-3 shadow-sm border-top-0 border-left-0 text-dark fw-semibold"
                nextLinkClassName="page-link rounded-3 mr-3 shadow-sm border-top-0 border-left-0 text-dark fw-semibold"
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
