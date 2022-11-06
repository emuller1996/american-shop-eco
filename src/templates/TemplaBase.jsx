import React from 'react'
import Footer from '../components/Footer'
import Nav from '../components/Nav/Nav'
import { Switch, Route } from 'react-router-dom'
import BannerCarousel from '../components/Home/BannerCarousel'
import BannerCategoryMoth from '../components/Home/BannerCategoryMoth'
import About from '../components/About'
import Shop from '../components/Shop'

export default function TemplateBase() {


    return (
        <>
            <Nav />
            <Switch>
                <Route path={'/Home'}>
                    <BannerCarousel />
                    <BannerCategoryMoth />

                </Route>
                <Route path={'/About'}>
                    <About />
                </Route>
                <Route path={'/Shop'}>
                    <Shop  />
                </Route>
            </Switch>

            <Footer />

        </>
    )
}