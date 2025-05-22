import React, { useState } from 'react';
import { FaStar, FaTrash, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';


const ReviewSection = () => {
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [reviews, setReviews] = useState([]);

    // Handle Review Submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!reviewText.trim() || rating === 0) {
            toast.warn("Please enter a review and select a rating.");
            return;
        }

        const newReview = {
            id: Date.now(),
            text: reviewText,
            rating: rating,
            date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            }),
        };

        // Add review to the top
        setReviews([newReview, ...reviews]);
        setReviewText('');
        setRating(0);
        setHoverRating(0);
        toast.success("New Review has been added");
    };

    // Handle Deleting Review
    const handleDelete = (id) => {
        setReviews(reviews.filter(review => review.id !== id));
        toast.warn("Review has been deleted");
    };

    return (
        <div className="container mx-auto p-4 md:p-6  rounded-xl mt-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Give me Reviews</h2>
            {/* Reviews List */}
            {reviews.length > 0 ? (
                <div className="space-y-6 md:px-2">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        Customer Reviews ({reviews.length})
                    </h3>
                    {reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0 group">
                            <div className="flex justify-between items-start">
                                <div className="flex space-x-1 mb-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span key={star}>
                                            {star <= review.rating ? (
                                                <FaStar className="text-yellow-400" />
                                            ) : (
                                                <FaRegStar className="text-gray-300" />
                                            )}
                                        </span>
                                    ))}
                                </div>
                                <button
                                    onClick={() => handleDelete(review.id)}
                                    className="text-red-500 hover:animate-pulse cursor-pointer"
                                    aria-label="Delete review"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                            <p className="text-gray-800 mb-2">{review.text}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">{review.date}</span>
                                <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                                    Verified Customer
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center mb-8 text-gray-500">
                    <p>No reviews yet. Be the first to review!</p>
                </div>
            )}
            {/* Review Form */}
            <div className="bg-gray-50 p-6 rounded-lg ">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Share Your Experience</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Star Rating */}
                    <div className="flex flex-wrap items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                type="button"
                                key={star}
                                className="text-2xl focus:outline-none"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                            >
                                {star <= (hoverRating || rating) ? (
                                    <FaStar className="text-yellow-400" />
                                ) : (
                                    <FaRegStar className="text-gray-300" />
                                )}
                            </button>
                        ))}
                        <span className="ml-2 text-gray-600">
                            {rating > 0 ? `${rating} star${rating !== 1 ? 's' : ''}` : "Rate this"}
                        </span>
                    </div>

                    {/* Review Text */}
                    <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="What did you like or dislike? Share your thoughts..."
                        className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-3 h-32 resize-none text-gray-800 transition"
                    />

                    {/* Submit Button */}
                   <div className='text-center'>
                     <button type="submit" className=" hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow
          inline-block bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">  Submit Review</button>
                   </div>
                </form>
            </div>


        </div>
    );
};

export default ReviewSection;