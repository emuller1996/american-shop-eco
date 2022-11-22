import React from 'react';

export default function MyCart() {


    return (
        <>
            <div className="container py-4">
                {/* <div className="card rounded-0 p-3  shadow"> */}
                    <h4 className='text-center mb-3'>MyCart</h4>
                    <div className="row">
                        <div className="col-md-7">
                            <div className="table-responsive">

                                <table className="table bg-light rounded-0 border border-dark">
                                    <thead className="bg-dark text-white">
                                        <tr>
                                            <th>Product image</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Cant</th>
                                            <th>Total</th>
                                            <th></th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Img</td>
                                            <td>Name</td>
                                            <td>Price</td>
                                            <td>CAnt</td>
                                            <td>Total</td>
                                            <td>
                                                <button type="button" className="btn btn-sm btn-danger"><i class="far fa-trash-alt"></i></button>
                                            </td>
                                        </tr>
                                    </tbody>

                                </table>

                            </div>

                        </div>

                        <div className="col-md-5">
                            <div className="card bg-light rounded-0">
                                <div className="card-body">
                                    <p>Ssd</p>
                                </div>
                            </div>
                        </div>

                    </div>
                {/* </div> */}
            </div>
        </>
    )
}