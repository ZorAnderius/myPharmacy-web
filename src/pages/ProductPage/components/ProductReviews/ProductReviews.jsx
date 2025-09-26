import styles from "./ProductReviews.module.css";

const ProductReviews = ({ reviews, isLoading }) => {
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <p>Loading reviews...</p>
      </div>
    );
  }

  // Check if reviews exists and is an array before mapping
  const reviewsArray = Array.isArray(reviews) ? reviews : [];
  
  if (reviewsArray.length === 0) {
    return (
      <div className={styles.noReviews}>
        <p>No comments yet</p>
      </div>
    );
  }

  return (
    <div className={styles.reviews}>
      <div className={styles.reviewsList}>
        {reviewsArray.map((review, index) => (
          <div key={review.id || index} className={styles.reviewItem}>
            <div className={styles.reviewHeader}>
              <h4 className={styles.reviewAuthor}>
                {review.user?.name || "Anonymous"}
              </h4>
              <div className={styles.reviewRating}>
                {"★".repeat(review.rating || 5)}
              </div>
            </div>
            <p className={styles.reviewText}>{review.comment}</p>
            <div className={styles.reviewDate}>
              {new Date(review.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
