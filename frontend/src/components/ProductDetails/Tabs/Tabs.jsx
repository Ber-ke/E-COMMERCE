import Reviews from "../../Reviews/Reviews.jsx";
import {useState} from "react";
import "./Tabs.css";

const Tabs = ({singleProduct, setSingleProduct}) => {

    const [activeTabs, setActiveTabs] = useState("desc");

    const handleTabClick = (e, tab) => {
        e.preventDefault();
        setActiveTabs(tab);
    };

    return (
        <div className="single-tabs">
            <ul className="tab-list">
                <li>
                    <a href="#" className={`tab-button ${activeTabs === "desc" ? "active" : ""}`}
                       onClick={(e) => handleTabClick(e, "desc")}>Description</a>
                </li>
                <li>
                    <a href="#" className={`tab-button ${activeTabs === "info" ? "active" : ""}`}
                       onClick={(e) => handleTabClick(e, "info")}>
                        Additional information
                    </a>
                </li>
                <li>
                    <a href="#" className={`tab-button ${activeTabs === "reviews" ? "active" : ""}`}
                       onClick={(e) => handleTabClick(e, "reviews")}>
                        Reviews
                    </a>
                </li>
            </ul>
            <div className="tab-panel">
                <div className={`tab-panel-descriptions content ${activeTabs === "desc" ? "active" : ""}`} id="desc">
                    <div className="product-description" dangerouslySetInnerHTML={{__html: singleProduct.description}}/>
                </div>
                <div className={`tab-panel-information content ${activeTabs === "info" ? "active" : ""}`} id="info">
                    <h3>Additional information</h3>
                    <table>
                        <tbody>
                        <tr>
                            <th>Color</th>
                            <td>
                                <p>
                                    Apple Red, Bio Blue, Sweet Orange, Blue, Green, Pink, Black, White</p>
                            </td>
                        </tr>
                        <tr>
                            <th>Size</th>
                            <td>
                                <p>{singleProduct.sizes.join(",").toUpperCase()}</p>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <Reviews singleProduct={singleProduct} setSingleProduct={setSingleProduct} active={activeTabs === "reviews" ? "active" : ""}/>
            </div>
        </div>
    );
};

export default Tabs;