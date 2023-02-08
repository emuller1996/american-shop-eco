import React from 'react';
import { Form } from 'react-bootstrap';
import "./Filter.css"

export default function FilterProducts({ categories,setCategoryFilter }) {


 

    return (

        <div className="accordion list-unstyled templatemo-accordion  " id="accordionExample">
            <div className="accordion-item pb-3 border-0">
                <h2 className="accordion-header" id="headingOne">
                    <div className="d-flex justify-content-between h3 text-decoration-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Categories
                        <i className="fa fa-fw fa-chevron-circle-down mt-1"></i>
                    </div>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                    <Form.Check
                                    key={99}
                                    type="radio"
                                    value={""}
                                    name={'category'}
                                    id={99}
                                    label={"All"}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                />
                        {
                            categories && categories.map(c =>
                                <Form.Check
                                    key={c.id}
                                    type="radio"
                                    value={c.id}
                                    name={'category'}
                                    id={c.id}
                                    label={c.name}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                />
                            )
                        }


                        {/* <Form.Check
                            disabled
                            type={'checkbox'}
                            label={`disabled ${type}`}
                            id={`disabled-default-${type}`}
                        /> */}
                    </div>
                </div>
            </div>

        </div>
    )
}