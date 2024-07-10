/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Review } from "./review.model";
import { TReview } from "./review.interface";
import { Movie } from "../movies/movies.model";

const addReview = async (slug: string, reviewData: Partial<TReview>) => {



    const movie = await Movie.findOne({ slug });
    if (!movie) {
        throw new Error('Movie not found!');
    }

    const review = await Review.create({
        movie: movie._id,
        ...reviewData
    },);

    const reviewCount = await Review.countDocuments({ movie: movie._id });
    await Movie.updateOne(
        { slug },
        { totalRating: reviewCount },
        { new: true },

    );

    return review

};

const getAllReviews = async () => {
    const result = Review.find()
    return result;

};

const updateReview = async () => {

};

const deleteReview = async () => {

};

export const ReviewServices = {
    addReview,
    getAllReviews,
    updateReview,
    deleteReview,
};
