"use client";

import { Review } from "@/data/products";

interface ProductReviewsProps {
  reviews: Review[];
  averageRating: number;
}

export default function ProductReviews({ reviews, averageRating }: ProductReviewsProps) {
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage: Math.round((reviews.filter((r) => r.rating === rating).length / reviews.length) * 100) || 0,
  }));

  return (
    <div>
      {/* Rating Summary */}
      <div className="mb-8 pb-8 border-b border-ivory">
        <h3 className="heading-sm text-charcoal mb-6">Customer Reviews</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Overall Rating */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-5xl font-bold text-maroon mb-2">{averageRating}</div>
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-lg ${i < Math.floor(averageRating) ? "text-gold" : "text-gray-300"}`}>
                  ★
                </span>
              ))}
            </div>
            <p className="text-sm text-charcoal/60">Based on {reviews.length} reviews</p>
          </div>

          {/* Rating Breakdown */}
          <div className="md:col-span-2 space-y-3">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-3">
                <span className="text-sm font-medium text-charcoal w-12">{rating} ★</span>
                <div className="flex-1 bg-ivory rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gold h-full rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-charcoal/60 w-12 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="pb-6 border-b border-ivory last:border-b-0">
              {/* Review Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-medium text-charcoal">{review.author}</p>
                  <p className="text-xs text-charcoal/60">{review.country}</p>
                </div>
                <div className="text-right">
                  <div className="flex gap-0.5 justify-end">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-sm ${i < review.rating ? "text-gold" : "text-gray-300"}`}>
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-charcoal/60 mt-1">{review.date}</p>
                </div>
              </div>

              {/* Review Text */}
              <p className="body-sm text-charcoal/80 italic">{review.text}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-charcoal/60 py-8">No reviews yet. Be the first to review!</p>
        )}
      </div>
    </div>
  );
}
