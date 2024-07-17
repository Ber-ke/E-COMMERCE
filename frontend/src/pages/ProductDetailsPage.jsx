import ProductDetails from "../components/ProductDetails/ProductDetails.jsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const ProductDetailsPage = () => {

    const [singleProduct, setSingleProduct] = useState(null);
    const {id: productId} = useParams();
    const URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchSingleProduct = async () => {
            try {
                const response = await fetch(`${URL}/api/products/${productId}`);

                if (response.ok) {
                    const data = await response.json();
                    setSingleProduct(data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleProduct();
    }, [URL, productId]);

    return (
        singleProduct ? <ProductDetails singleProduct={singleProduct} setSingleProduct={setSingleProduct}/> : <p>ürün Yükleniyor</p>
    );
};

export default ProductDetailsPage;