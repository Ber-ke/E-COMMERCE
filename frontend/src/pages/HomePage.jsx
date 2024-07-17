import React from "react";
import Slider from "../components/Slider/Slider.jsx";
import Categories from "../components/Categories/Categories.jsx";
import Products from "../components/Products/Products.jsx";
import Campaigns from "../components/Campaigns/Campaigns.jsx";
import Blogs from "../components/Blogs/Blogs.jsx";
import Brands from "../components/Brands/Brands.jsx";
import CampaignSingle from "../components/CampaignSingle/CampaignSingle.jsx";

const HomePage = () => {
    return (
        <React.Fragment>
            <Slider/>
            <Categories/>
            <Products/>
            <Campaigns/>
            <Blogs/>
            <Brands/>
            <CampaignSingle/>
        </React.Fragment>
    );
};

export default HomePage;