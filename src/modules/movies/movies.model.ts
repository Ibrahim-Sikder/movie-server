import { Schema, model } from "mongoose";
import { TMovideMethods, TMovie, TMovieModel } from "./movies.initerface";
import { format } from "date-fns";
import slugify from 'slugify'



const movieSchema = new Schema<TMovie, TMovieModel, TMovideMethods>({
  title: {
    type: String,
    required: [true, "Title is required"],
    unique:true
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  releaseDate: {
    type: String,
  },
  genre: {
    type: String,
    required: [true, "Genre is required"],
  },

  slug: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  viewCount: {
    type: Number,
    default: 0,
  },
  totalRating: {
    type: Number,
    default: 0,
  },
});


// movieSchema.pre('save', async function(next){
//   const date = format(this.releaseDate, 'dd-MM-yyyy')
//   this.slug = slugify(`${this.title}-${date}`,{
//     lower: true
//   })

//   next()

// })

movieSchema.method('createSlug', function createSlug(payload: TMovie) {
  const date = format(payload.releaseDate, 'dd-MM-yyyy')
  const slug = slugify(`${payload.title}-${date}`, {
    lower: true
  })

  return slug
})


export const Movie = model<TMovie, TMovieModel>("Movie", movieSchema);
