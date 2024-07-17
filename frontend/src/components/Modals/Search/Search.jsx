import "./Search.css";
import proptypes from "prop-types";
import {useState} from "react";
import {message, Spin} from "antd";
import {Link} from "react-router-dom";

const Search = (props) => {
    const [searchData, setSearchData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const {isSearchShow, setIsSearchShow} = props;
    const URL = import.meta.env.VITE_API_BASE_URL;


    const handleSearch = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        const productName = e.target[0].value;

        if (productName.trim().length === 0) {
            message.warning("Boş karakter Arayamazsınız!");
            return;
        }

        try {
            const res = await fetch(`${URL}/api/products/search/${productName.trim()}`);

            if (!res.ok) {
                message.error("Ürün Getirme Hatası!");
                return;
            }

            const data = await res.json();
            setSearchData(data);
            setIsLoading(false)

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`modal-search ${isSearchShow ? "show" : ""}`}>
            <div className="modal-wrapper">
                <h3 className="modal-title">Search for products</h3>
                <p className="modal-text">Start typing to see products you are looking for.</p>
                <form className="search-form" onSubmit={handleSearch}>
                    <input type="text" placeholder="Search a product"/>
                    <button>
                        <i className="bi bi-search"></i>
                    </button>
                </form>
                <div className="search-results">
                    <div className="search-heading">
                        <h3>RESULTS FROM PRODUCT</h3>
                    </div>
                    <div className="results" style={{display: "flex"}}>
                        {searchData?.length === 0 && (
                            <b
                                className="result-item"
                                style={{
                                    justifyContent: "center",
                                    width: "100%",
                                }}
                            >
                                Ürün Ara...
                            </b>
                        )}
                        <Spin spinning={isLoading}>
                            <div style={{display: "flex", width: "100%"}}>
                                {searchData?.map((product) => (
                                    <Link to={`product/${product._id}`} className="result-item" key={product._id}>
                                        <img src={product.img[0]} className="search-thumb" alt=""/>
                                        <div className="search-info">
                                            <h4>{product.name}</h4>
                                            <span className="search-sku">SKU: PD0016</span>
                                            <span className="search-price">${product.price.current.toFixed(2)}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </Spin>
                    </div>
                </div>
                <i className="bi bi-x-circle" id="close-search" onClick={() => setIsSearchShow(false)}></i>
            </div>
            <div className="modal-overlay" onClick={() => setIsSearchShow(false)}></div>
        </div>
    );
};

export default Search;

Search.propTypes = {
    isSearchShow: proptypes.bool,
    setIsSearchShow: proptypes.func,
}