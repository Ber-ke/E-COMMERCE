import ProductsItem from "./ProductsItem.jsx";
import {useEffect, useState} from "react";
import Slider from "react-slick";
import './Products.css';
import PropTypes from "prop-types";

function NextBtn({onClick}) {
    return (
        <button className="glide__arrow glide__arrow--right" data-glide-dir=">" onClick={onClick}>
            <i className="bi bi-chevron-right"></i>
        </button>
    )
}

NextBtn.propTypes = {
    onClick: PropTypes.func
};

function PrevBtn({onClick}) {
    return (
        <button className="glide__arrow glide__arrow--left" data-glide-dir="<" onClick={onClick}>
            <i className="bi bi-chevron-left"></i>
        </button>
    )
}

PrevBtn.propTypes = {
    onClick: PropTypes.func
};

const Products = () => {

    const URL = import.meta.env.VITE_API_BASE_URL;

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${URL}/api/products`);
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchProducts();
    }, [URL]);

    const sliderSettings = {
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <NextBtn/>,
        prevArrow: <PrevBtn/>,

        responsive: [
            {
                breakpoints: 992,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoints: 520,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <section className="products">
            <div className="container">
                <div className="section-title">
                    <h2>Featured Products</h2>
                    <p>Summer Collection New Morden Design</p>
                </div>
                <div className="product-wrapper product-carousel">
                    <div className="glide__track" data-glide-el="track">
                        <Slider {...sliderSettings}>
                            {products.map((product) => (
                                <ProductsItem productItem={product} key={product._id}/>
                            ))}
                        </Slider>
                    </div>
                    <div className="glide__arrows" data-glide-el="controls">


                    </div>
                </div>
            </div>
        </section>
    );
};

export default Products;