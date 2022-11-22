import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function MyCart() {

    const cart = useSelector(state => state.cart.cart)
    const dispatch = useDispatch();

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

                                    {
                                        cart.length === 0 ?
                                            (
                                                <tr>
                                                    <td colSpan={6}> <p className="text-center text-success fw-semibold py-4"> You have not added products to the cart </p></td>
                                                </tr>

                                            ) :
                                            cart.map( c => (
                                                <tr>
                                                    <td className="text-center"><img src={c.image} alt="IMGE_PROD" width={"50px"} /></td>
                                                    <td>{c.name}</td>
                                                    <td>{c.price}</td>
                                                    <td>CAnt</td>
                                                    <td>Total</td>
                                                    <td>
                                                        <button type="button" className="btn btn-sm btn-danger"><i class="far fa-trash-alt"></i></button>
                                                    </td>
                                                </tr>
                                            ))
                                            
                                    }




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