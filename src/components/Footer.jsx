import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="bg-footer-american" id="tempaltemo_footer">
        <div className="container">
          <div className="row aling-items-center text-start">
            <div className="col-md-6 pt-5">
              <h2 className="h2 text-danger border-bottom pb-3 border-light logo">
                American Shop VIP
              </h2>
              <ul className="list-unstyled text-danger  footer-link-list">
                <li>
                  <i className="fas fa-map-marker-alt fa-fw"></i>
                  Cra 1 n 1 40
                </li>
                <li>
                  <i className="fa fa-phone fa-fw me-1"></i>
                  <a
                    className="text-decoration-none text-danger "
                    href="tel:010-020-0340"
                  >
                    3184612011
                  </a>
                </li>
                <li>
                  <i className="fa fa-envelope fa-fw me-1 "></i>
                  <a
                    className="text-decoration-none text-danger "
                    href="mailto:info@company.com"
                  >
                    americanshopbtura@gmail.com
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-6 pt-5 text-end">
              <h4 className="text-danger pb-3 border-light logo">
                Medio de pago
              </h4>
              <ul className="list-unstyled text-muted">
                <li>
                  {/* <i className="fas fa-map-marker-alt fa-fw"></i> */}
                  <img
                    className="me-2"
                    style={{ width: "180px" }}
                    src="/assets/img/logo-mercadopago.png"
                    alt=""
                  />
                </li>
              </ul>
              <span className="text-light">Envios a Todo Colombia</span>
            </div>
          </div>
        </div>

        <div className="w-100 bg-footer-american-b py-1">
          <div className="container">
            <div className="row ">
              <div className="col-12">
                <p className="text-center  m-0  text-dark ">
                  Copyright &copy; 2023 American Shop VIP | Desarrollado por{" "}
                  <a className="text-light" rel="sponsored" href="#">
                    MullDev
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
