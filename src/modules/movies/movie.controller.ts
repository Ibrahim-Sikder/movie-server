/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { MovieServices } from "./movies.service"
import { catchAsync } from "../../utils/catchAsync";


const createMovie = catchAsync(async (req: Request, res: Response) => {

    // const {movieData} = req.body

    const result = await MovieServices.createMovie(req.body);

    res.status(200).json({
        success: true,
        message: "Movie is created successfully !",
        data: result
    })
})
const getAllMovies = async (req: Request, res: Response) => {
    const result = await MovieServices.getAllMovies(req.query);

    res.status(200).json({
        success: true,
        message: "Movie are retrive successfully !",
        data: result
    })
}
const getSingleMovies = async (req: Request, res: Response) => {
    const { movieId } = req.params
    const result = await MovieServices.getSingleMovie(movieId);

    res.status(200).json({
        success: true,
        message: "Single Movie is retrieve successfully !",
        data: result
    })
}

const getMovieBySlug = async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;
        const result = await MovieServices.getMovieBySlug(slug);

        res.status(200).json({
            success: true,
            message: "Movie fetched successfully!",
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: "Could not fetch movie!",
            error: err,
        });
    }
};

export const MovieController = {
    createMovie,
    getAllMovies,
    getSingleMovies,
    getMovieBySlug
}