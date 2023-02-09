import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductsToCart } from "../features/Car/carSlice";

import axios from "axios";

export default function MyCart() {
  const cart = useSelector((state) => state.cart);

  const [cartState, setCartState] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    getProducts();
   

  }, [cart]);

  const getProducts = async () => {
    var s = await cart.map(async (c) => {
      const resutl = await axios.get(`/products/${c.id}`);
      return Object.assign(resutl.data, c)
    });
    const result = await Promise.all(s);
    console.log(result);
    setCartState(result);
   

  };


  const HandledeleteProductsToCart = (id)=>{
    dispatch(deleteProductsToCart(id))
  }

  return (
    <>
      <div className="container py-4">
        <h4 className="text-center mb-3">My Cart</h4>
        <div className="row">
          <div className="col-md-7 ">
            <div className="card shadow mb-4 border  border-dark">
              <div className="table-responsive  rounded overflow">
                <table className="table   p-0 m-0  ">
                  <thead className="bg-dark text-white ">
                    <tr>
                      <td className="text-center fw-">Product image</td>
                      <td className="text-center fw-"> Name</td>
                      <td className="text-center fw-">Price</td>
                      <td className="text-center fw-">Cant</td>
                      <td className="text-center fw-">Total</td>
                      <td className="text-center fw-"></td>
                    </tr>
                  </thead>
                  <tbody className="rounded">
                    {cart.length === 0 && (
                      <tr>
                        <td className="text-center" colSpan={6}>
                          {" "}
                          SIN PRODUCTOS EN EL CARRITO
                        </td>
                      </tr>
                    )}

                    {cartState ? (
                      cartState.map((p) => (
                        <tr>
                          <td>
                            <img
                              src={p.image}
                              width="60px"
                              height={"60px"}
                              alt=""
                              srcset=""
                            />
                          </td>
                          <td>{p.name}</td>
                          <td>{p.price}</td>
                          <td>{p.cant}</td>
                          <td>{p.price * p.cant}</td>
                          <td>
                            <button  
                            className="btn btn-sm rounded-3  btn-danger"
                            onClick={(id) => { HandledeleteProductsToCart(p.id)}}
                            ><i class="far fa-trash-alt fa-sm"></i></button>  
                          </td>

                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td> algo </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-md-5">
            <div className="card bg-white rounded shadow border-dark">
              <div className="card-body">
                <h3 className="text-center text-success fw-normal">
                  Total to pay
                </h3>
                <p className="text-center fs-4 fw-semibold">$ 5000</p>
                <button className="btn btn-secondary w-100 py-3">
                  check purchase
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
