import { Schema, model } from "mongoose";
import { TReview } from "./review.interface";

const reviewSchema = new Schema<TReview>({
    movie:{
        type: Schema.ObjectId,
        required:[true, 'Movie is required']
    },
    email: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  });
  


  export const Review = model<TReview>('Review', reviewSchema)