import React from "react";
import { Accordion, Form } from "react-bootstrap";
import "./Filter.css";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../features/Products/ProductSlice";

export default function FilterProducts({ categories, setCategoryFilter }) {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.products.category);

  return (
    <>
      {/* <Accordion defaultActiveKey="0" className="border-0" flush alwaysOpen>
        <Accordion.Item eventKey="0"  className="border-0 rounded-3">
          <Accordion.Header  className="">Filtar por Categorias</Accordion.Header>
          <Accordion.Body>
            <Form.Check
              key={99}
              type="radio"
              checked={category===""}
              value={""}
              name={"category"}
              id={99}
              label={"All"}
              onChange={(e) => dispatch(setCategory(e.target.value))}
            />
            {categories &&
              categories.map((c) => (
                <Form.Check
                  key={c.id}
                  type="radio"
                  value={c.id}
                  checked={parseInt(category)===c.id}
                  name={"category"}
                  id={c.id}
                  label={c.name}
                  onChange={(e) => dispatch(setCategory(e.target.value))}
                />
              ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion> */}
      <div className="card-filtar p-4 rounded-4  mb-4">
        <h3 className="mb-3 h6 text-danger  text-uppercase  d-block">
          Categorias
        </h3>
        <div className="d-flex flex-column gap-1 ">
          {categories &&
            categories.map((c) => (
              <>
                <label className="label_filter_check d-flex justify-content-between ">
                  <div>
                    <input
                      value={c.id}
                      type="radio"
                      name={"category"}
                      onChange={(e) => dispatch(setCategory(e.target.value))}
                    />
                    <span>{c.name}</span>
                  </div>
                  <b>{c.productCantidad}</b>
                </label>
              </>
            ))}
        </div>
      </div>
    </>
  );
}
