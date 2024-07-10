/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TMovie } from "./movies.initerface";
import { Movie } from "./movies.model"
import { FilterQuery, Query } from "mongoose";
import { QueryBuilder } from "../../builder/QueryBuilder";
import { moviceSearchAbleFields } from "./movieSearchAbleFileds";
// import { format } from "date-fns";
// import slugify from 'slugify'



const createMovie = async (payload: TMovie) => {
    // const date = format(payload.releaseDate, 'dd-MM-yyyy')
    // const slug = slugify(`${payload.title}-${date}`)
    // const result = await Movie.create({ ...payload, slug });
    const result = new Movie(payload)

    const slug = result.createSlug(payload);

    if (!slug) {
        throw new AppError(httpStatus.NOT_FOUND, 'slug not found')
    }
    result.slug = slug;
    await result.save();

    return result;
}





const getAllMovies = async (payload: Record<string, unknown>) => {
    // const movie = await Movie.find({});
    // Searching - Partially Match - In..
    // let searchTerm = "";

    // if (payload?.searchTerm) {
    //     searchTerm = payload.searchTerm as string;
    // }

    // const searchAbleFields = ["title", "genre"];
    // {title: {$regex: searchTerm}}
    // {genre: {$regex: searchTerm}}

    const movieQuery = new QueryBuilder(Movie.find({}), payload).search(moviceSearchAbleFields).filter().paginate().fields().sort()

    const result = await movieQuery.modelQuery

    // const searchedMovies1 = Movie.find({
    //     $or: [
    //         { title: { $regex: searchTerm, $options: "i" } },
    //         { genre: { $regex: searchTerm, $options: "i" } },
    //     ]
    // });



    //   pagination
    //   1st skip =0
    //    2nd skip =2*10 - 1*10
    //    3rd skip =3*10 - 2*10
    //    skip = (page-1)*limit

    // let limit: number = Number(payload?.limit || 10);

    // let skip: number = 0;

    // if (payload?.page) {
    //     const page: number = Number(payload?.page || 1);
    //     skip = Number((page - 1) * limit);
    // }

    // const skipedQuery = searchedMovies.skip(skip);

    // const limitQuery = skipedQuery.limit(limit);

    //   {page:1, limit:5, sortBy: "-"}

    //   sorting

    // let sortBy = "-releaseDate";

    // if (payload?.sortBy) {
    //     sortBy = payload.sortBy as string;
    // }

    // const sortQuery = limitQuery.sort(sortBy);

    //   field filtering
    //   {fields: a,b,c}

    // let fields = " ";

    // if (payload.fields) {
    //     fields = (payload?.fields as string).split(",").join(" ");
    // }

    // const fieldQuery = sortQuery.select(fields);

    // cpoied from payload object
    //Filtering - Exact Match - title = "Inception"
    // const queryObj = { ...payload };
    // const excludeFields = ["searchTerm", "page", "limit", "sortBy", "fields"];

    // excludeFields.forEach((e) => delete queryObj[e]);

    // const result = await fieldQuery.find(queryObj);

    return result;
}
const getSingleMovie = async (id: string) => {
    const result = await Movie.findById(id);
    return result;
}
const getMovieBySlug = async (slug: string) => {
    const result = await Movie.findOne({ slug: slug });
    return result;
};


export const MovieServices = {
    createMovie,
    getAllMovies,
    getSingleMovie,
    getMovieBySlug
}