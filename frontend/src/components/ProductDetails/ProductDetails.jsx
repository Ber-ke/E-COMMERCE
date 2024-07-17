import "./ProductDetails.css";
import BreadCrumb from "./BreadCrumb.jsx";
import Gallery from "./Gallery/Gallery.jsx";
import Info from "./Info/Info.jsx";
import Tabs from "./Tabs/Tabs.jsx";

const ProductDetails = ({singleProduct, setSingleProduct}) => {
    return (
        <section className="single-product">
            <div className="container">
                <div className="single-product-wrapper">
                    <BreadCrumb/>

                    <div className="single-content">
                        <main className="site-main">
                            <Gallery singleProduct={singleProduct}/>
                            <Info singleProduct={singleProduct}/>
                        </main>
                    </div>
                    <Tabs singleProduct={singleProduct} setSingleProduct={setSingleProduct}/>
                </div>
            </div>
        </section>
    );
};

export default ProductDetails;