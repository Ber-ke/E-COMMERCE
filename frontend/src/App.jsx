import React from "react";
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ShopPage from "./pages/ShopPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import BlogsDetaislPage from "./pages/BlogsDetaislPage.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
import UserPage from "./pages/Admin/UserPage.jsx";
import CategoryPage from "./pages/Admin/Categories/CategoryPage.jsx";
import UpdateCategoryPage from "./pages/Admin/Categories/UpdateCategoryPage.jsx";
import CreateCategoryPage from "./pages/Admin/Categories/CreateCategoryPage.jsx";
import CreateProductPage from "./pages/Admin/Products/CreateProductPage.jsx";
import ProductPage from "./pages/Admin/Products/ProductPage.jsx";
import UpdateProductPage from "./pages/Admin/Products/UpdateProductPage.jsx";
import CouponPage from "./pages/Admin/Coupon/CouponPage.jsx";
import CreateCouponPage from "./pages/Admin/Coupon/CreateCouponPage.jsx";
import UpdateCouponPage from "./pages/Admin/Coupon/UpdateCouponPage.jsx";
import Success from "./pages/Success.jsx";
import OrderPage from "./pages/Admin/OrderPage.jsx";
import DashboardPage from "./pages/Admin/DashboardPage.jsx";
import './App.css'

function App() {

    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/shop" element={<ShopPage/>}/>
            <Route path="/auth" element={<AuthPage/>}/>
            <Route path="/cart" element={<CartPage/>}/>
            <Route path="/blog" element={<BlogPage/>}/>
            <Route path="/blog/:id" element={<BlogsDetaislPage/>}/>
            <Route path="/product/:id" element={<ProductDetailsPage/>}/>
            <Route path="/contact" element={<ContactPage/>}/>
            <Route path="/success" element={<Success/>}/>
            <Route path="/admin/*">
                <Route index element={<DashboardPage/>}/>
                <Route path="users" element={<UserPage/>}/>
                <Route path="categories" element={<CategoryPage/>}/>
                <Route path="categories/create" element={<CreateCategoryPage/>}/>
                <Route path="categories/update/:id" element={<UpdateCategoryPage/>}/>
                <Route path="products" element={<ProductPage/>}/>
                <Route path="products/create" element={<CreateProductPage/>}/>
                <Route path="products/update/:id" element={<UpdateProductPage/>}/>
                <Route path="coupons" element={<CouponPage/>}/>
                <Route path="coupons/create" element={<CreateCouponPage/>}/>
                <Route path="coupons/update/:id" element={<UpdateCouponPage/>}/>
                <Route path="orders" element={<OrderPage/>}/>
            </Route>
        </Routes>
    )
}

export default App
