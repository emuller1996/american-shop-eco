import React from "react";
import { Form } from "react-bootstrap";
import "./Filter.css";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../features/Products/ProductSlice";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
export default function FilterProducts({ categories, setCategoryFilter }) {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.products.category);

  return (
    <>
      <Accordion defaultExpanded className="border border-secondary-subtle">
        <AccordionSummary
          expandIcon={<i className="fas fa-chevron-down  text-danger"></i>}
          aria-controls="panel1-content"
          id="panel1-header"
          className="text-danger"
        >
          Categorias
        </AccordionSummary>
        <AccordionDetails>
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
                      <span >{c.name}</span>
                    </div>
                    <b>{c.productCantidad}</b>
                  </label>
                </>
              ))}
          </div>
        </AccordionDetails>
      </Accordion>
      {/* <div className="card-filtar p-4 rounded-4  mb-4">
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
      </div> */}
    </>
  );
}
