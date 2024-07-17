import CategoriesItem from "./CategoriesItem.jsx";
import {useEffect, useState} from "react";
import {message} from "antd";
import './Categories.css';

const Categories = () => {

    const [categories, setCategories] = useState([]);
    const URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${URL}/api/categories`);
                if (response.ok) {
                    const data = await response.json();
                    setCategories(data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchCategories();
    }, [URL]);

    return (
        <section className="categories">
            <div className="container">
                <div className="section-title">
                    <h2>All Categories</h2>
                    <p>Summer Collection New Morden Design</p>
                </div>
                <ul className="category-list">
                    {categories.map((category) => (
                        <CategoriesItem category={category} key={category._id}/>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Categories;