import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCart as setCartR, setTotalCart } from '../features/Car/carSlice'
import { useLocalStorage } from '../hooks/useLocalStorage'
import axios from "axios"

export default function MyCart() {

    /* const cartR = useSelector(state => state.cart.cart)
    const [cartState, setCartState] = useState([]);
    const dispatch = useDispatch(); */
    
    

    return (
        <>
            <div className="container py-4">
                <h4 className='text-center mb-3'>My Cart</h4>
                <div className="row">
                    <div className="col-md-7 ">
                        <div className="table-responsive   ">

                            <table className="table  border  border-secondary shadow">
                                <thead className="bg-dark text-white">
                                    <tr>
                                        <td className="text-center fw-">Product image</td>
                                        <td className="text-center fw-"> Name</td>
                                        <td className="text-center fw-">Price</td>
                                        <td className="text-center fw-">Cant</td>
                                        <td className="text-center fw-">Total</td>
                                        <td className="text-center fw-"></td>

                                    </tr>
                                </thead>
                                <tbody>

                                    




                                </tbody>

                            </table>

                        </div>

                    </div>

                    <div className="col-md-5">
                        <div className="card bg-white rounded-0 shadow">
                            <div className="card-body">
                                <h3 className="text-center text-success fw-normal">Total to pay</h3>
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
    )
}