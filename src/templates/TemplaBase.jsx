import React from 'react'
import Footer from '../components/Footer'
import Nav from '../components/Nav/Nav'
import { Switch, Route } from 'react-router-dom'
import BannerCarousel from '../components/Home/BannerCarousel'
import BannerCategoryMoth from '../components/Home/BannerCategoryMoth'
import About from '../components/About'
import Shop from '../components/Shop'
import ProductDetail from '../pages/ProductDetail'
import MyCart from '../pages/MyCart'
import PurchaseConfirmation from '../pages/PurchaseConfirmation'

export default function TemplateBase() {


    return (
        <>
            <Nav />
            <Switch>
                <Route strict exact path={'/'}>
                    <BannerCarousel />
                    <BannerCategoryMoth />

                </Route>
                <Route  path={'/About'}>
                    <About />
                </Route>
                <Route path={'/Shop'}>
                    <Shop  />
                </Route>
                <Route path={'/MyCart'}>
                    <MyCart  />
                </Route>
                <Route path={'/ProductDetail/:id'}>
                    <ProductDetail  />
                </Route>
                <Route path={'/PurchaseConfirmation'}>
                    <PurchaseConfirmation />
                </Route>
            </Switch>

            <Footer />

        </>
    )
}