import {useState} from "react";
import {message} from "antd";

const ReviewsForm = ({singleProduct, setSingleProduct}) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
    const URL = import.meta.env.VITE_API_BASE_URL;

    const handleRatingChange = (e, newRating) => {
        e.preventDefault();
        setRating(newRating);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0) {
            return message.warning("Puan Seçiniz");
        }
        const formData = {
            reviews: [
                ...singleProduct.reviews,
                {
                    text: review,
                    rating: parseInt(rating),
                    user: user.id || user._id,
                }
            ]
        }


        try {
            const response = await fetch(`${URL}/api/products/${singleProduct._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                setSingleProduct(data);
                setRating(0);
                setReview("");
                message.success("Yorum Başaraıyla Eklendi.");
            }
        } catch (error) {
            console.log(error);
            message.error("Yorum Yapılamadı!");
        }
    };

    return (
        <form className="comment-form" onSubmit={handleSubmit}>
            <p className="comment-notes">
                Your email address will not be published. Required fields are marked
                <span className="required">*</span>
            </p>
            <div className="comment-form-rating">
                <label>
                    Your rating
                    <span className="required">*</span>
                </label>
                <div className="stars">
                    <a href="#" className={`star ${rating === 1 && "active"}`}
                       onClick={(e) => handleRatingChange(e, 1)}>
                        <i className="bi bi-star-fill"></i>
                    </a>
                    <a href="#" className={`star ${rating === 2 && "active"}`}
                       onClick={(e) => handleRatingChange(e, 2)}>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                    </a>
                    <a href="#" className={`star ${rating === 3 && "active"}`}
                       onClick={(e) => handleRatingChange(e, 3)}>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                    </a>
                    <a href="#" className={`star ${rating === 4 && "active"}`}
                       onClick={(e) => handleRatingChange(e, 4)}>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                    </a>
                    <a href="#" className={`star ${rating === 5 && "active"}`}
                       onClick={(e) => handleRatingChange(e, 5)}>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                    </a>
                </div>
            </div>
            <div className="comment-form-comment form-comment">
                <label htmlFor="comment">
                    Your review
                    <span className="required">*</span>
                </label>
                <textarea id="comment" reuired cols="50" rows="10" value={review}
                          onChange={(e) => setReview(e.target.value)}></textarea>
            </div>
            <div className="comment-form-cookies">
                <input id="cookies" type="checkbox"/>
                <label htmlFor="cookies">
                    Save my name, email, and website in this browser for the next time I
                    comment.
                    <span className="required">*</span>
                </label>

            </div>
            <div className="form-submit">
                <input type="submit" className="btn submit"/>
            </div>
        </form>
    );
};

export default ReviewsForm;