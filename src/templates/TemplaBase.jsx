import React from "react";
import Footer from "../components/Footer";
import Nav from "../components/Nav/Nav";
import { Switch, Route } from "react-router-dom";
import BannerCarousel from "../pages/Home/BannerCarousel";
import BannerCategoryMoth from "../pages/Home/BannerCategoryMoth";
import About from "../pages/About";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import MyCart from "../pages/MyCart/MyCart";
import OrderPlaced from "../pages/PurchaseConfirmation/OrderPlaced";
import Shop from "../pages/Shop";
import PurchaseConfirmation from "../pages/PurchaseConfirmation";
import PagoRechazadoPage from "../pages/PagoRechazado/PagoRechazadoPage";
import MyProfileComponent from "../components/Dashboard/MyProfile/MyProfile";
import MyOrderComponent from "../components/Dashboard/MyOrder";
import ProtectedRouteMiProfile from "../utils/ProtectedRouteMiProfile";

export default function TemplateBase() {
  return (
    <>
      <Nav />
      <Switch>
        <Route strict exact path={"/"}>
          <BannerCarousel />
          <BannerCategoryMoth />
        </Route>
        <Route exact path={"/nosotros"}>
          <About />
        </Route>
        <Route exact path={"/articulos"}>
          <Shop />
        </Route>
        <Route exact path={"/mi-carrito"}>
          <MyCart />
        </Route>
        <Route exact path={"/articulo/:id"}>
          <ProductDetail />
        </Route>
        <Route exact path={"/comfirmar-compra"}>
          <PurchaseConfirmation />
        </Route>
        <Route exact path={"/compra-exitosa/:idOrder"}>
          <OrderPlaced />
        </Route>
        <Route exact path={"/pago-rechazado/"}>
          <PagoRechazadoPage />
        </Route>
        <Route strict path={"/d/mis-pedidos"}>
          <ProtectedRouteMiProfile>
            <MyOrderComponent />
          </ProtectedRouteMiProfile>
        </Route>
        <Route strict path={"/d/mi-perfil"}>
          <ProtectedRouteMiProfile>
            <MyProfileComponent />
          </ProtectedRouteMiProfile>
        </Route>
      </Switch>

      <Footer />
    </>
  );
}
