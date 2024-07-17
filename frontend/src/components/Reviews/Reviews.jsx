import "./Reviews.css";
import ReviewsForm from "./ReviewsForm.jsx";
import ReviewsItem from "./ReviewsItem.jsx";
import {useEffect, useState} from "react";
import {message} from "antd";

const Reviews = ({active, singleProduct, setSingleProduct}) => {

    const [users, setUsers] = useState([]);
    const URL = import.meta.env.VITE_API_BASE_URL;
    const thisReview = [];

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch(`${URL}/api/user`);
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            } else {
                message.error("Veri Getirme Başarısız.");
            }
        }
        fetchUsers();
    }, [URL,]);

    singleProduct.reviews.forEach((review) => {
        const matchingUsers = users?.filter((user) => user._id === review.user);

        matchingUsers.forEach((matchingUser) => {
            thisReview.push({
                review: review,
                user: matchingUser,
            });
        });
    });

    return (
        <div className={`tab-panel-reviews content ${active}`}>
            {singleProduct.reviews.length > 0 ? (
                <>
                    <h3>2 reviews for Basic Colored Sweatpants With Elastic Hems</h3>
                    <div className="comments">
                        <ol className="comment-list">
                            {thisReview.map((item, index) => (
                                <ReviewsItem reviewItem={item} key={index}/>
                            ))}
                        </ol>
                    </div>
                </>) : (<h3>Hiç Yorum Yok...</h3>)
            }
            <div className="review-form-wrapper">
                <h2>Add a review</h2>
                <ReviewsForm singleProduct={singleProduct} setSingleProduct={setSingleProduct}/>
            </div>
        </div>
    );
};

export default Reviews;