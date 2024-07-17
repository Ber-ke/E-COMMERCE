import {Fragment} from "react";
import Categories from "../components/Categories/Categories.jsx";
import Products from "../components/Products/Products.jsx";
import CampaignSingle from "../components/CampaignSingle/CampaignSingle.jsx";

const ShopPage = () => {
    return (
        <Fragment>
            <Categories/>
            <Products/>
            <CampaignSingle/>
            <Products/>
        </Fragment>
    );
};

export default ShopPage;